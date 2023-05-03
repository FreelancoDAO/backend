require("dotenv").config();
const express = require("express");
const initMongo = require("./config/mongo");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { printRequestData, errorHandler } = require("./middleware/api");
const Moralis = require("moralis").default;
const nodemailer = require("nodemailer");
const path = require("path");
const axios = require("axios");

const { createProposal } = require("./controllers/proposal");
const { updateGig } = require("./controllers/gig");
const Proposal = require("./models/proposal");
const Freelancer = require("./models/freelancer");
const Dao = require("./models/dao");
const OneToOneMessage = require("./models/oneToOneMessage");
const User = require("./models/user");
const { newMessage } = require("./utils/email");


app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

// Init all other stuff
app.use(
  cors({
    origin: "*",
    //     credentials: true,
  })
);

 initMongo();


// eslint-disable-next-line
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// For setting Set ‘Last-Modified’ to now to avoid 304 Not Modified
// eslint-disable-next-line
app.use(function (req, res, next) {
  res.setHeader("Last-Modified", new Date().toUTCString());
  next();
});
app.use(printRequestData);


app.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Length", "12345");
  res.sendFile(__dirname + `/uploads/${filename}`);
});

app.use(require("./routes"));

app.use(errorHandler);

app.use("/images", express.static(__dirname + "/uploads"));

// Setup express server port from ENV, default: 3000
const port = process.env.PORT || 4080;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io"); // Add this

// const IPFS = require("ipfs");
// let ipfs;

// const getIPFS = async () => {
//   ipfs = await IPFS.create();
// };

// app.get("/ipfs/:hash", async (req, res) => {
//   const hash = req.params.hash;
//   const file = await ipfs.cat(hash);
//   res.send(file);
// });

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


// app.use("/user", userRouter);


// Add this
// Listen for when the client connects via socket.io-client
io.on("connection", async (socket) => {
  // console.log(JSON.stringify(socket.handshake.query));
  const address = socket.handshake.query["address"];

  console.log(`User connected ${socket.id}`);

  if (address) {
    await User.findOneAndUpdate(
      { wallet_address: address },
      {
        socket_id: socket.id,
      }
    );
  }

  socket.on("get_direct_conversations", async ({ user_id }, callback) => {
    const existing_conversations = await OneToOneMessage.find({
      participants: { $all: [user_id] },
    });

    console.log("EXISTING:", existing_conversations);

    const returnData = [];

    // existing_conversations.map(async (convo) => {
    //   const other_party = convo.participants.filter((p) => p != user_id);
    //   const freelancer = await Freelancer.find({
    //     wallet_address: other_party[0],
    //   });
    //   console.log(freelancer);

    //   console.log("Other party: ", other_party);
    //   convo = { ...convo, freelancer };
    //   returnData.push(convo);
    // });

    await Promise.all(
      existing_conversations.map(async (convo) => {
        const other_party = convo.participants.filter((p) => p != user_id);
        const freelancer = await Freelancer.find({
          wallet_address: other_party[0],
        });
        console.log(freelancer);

        console.log("Other party: ", other_party);
        convo = { ...convo._doc, freelancer };
        returnData.push(convo);
      })
    );

    console.log("EXisting2: ", returnData);

    callback(returnData);
  });

  socket.on("start_conversation", async (data, callback) => {
    // data: {to: from:}

    const { to, from, gig_token_id } = data;
    console.log(data);
    const gigId = Number(gig_token_id);

    // check if there is any existing conversation

    const existing_conversations = await OneToOneMessage.find({
      participants: { $size: 2, $all: [to, from] },
    }).populate("participants", "firstName lastName _id email status");

    console.log(existing_conversations[0], "Existing Conversation");
    let updated_conversations = [...existing_conversations];

    // if no => create a new OneToOneMessage doc & emit event "start_chat" & send conversation details as payload
    if (existing_conversations.length === 0) {
      let new_chat = await OneToOneMessage.create({
        participants: [to, from],
        gig_token_id: gigId,
      });
      updated_conversations.push(new_chat);

      console.log("up", updated_conversations);
      callback(updated_conversations);

      // new_chat = await OneToOneMessage.findById(new_chat).populate(
      //   "participants",
      //   "firstName lastName _id email status"
      // );

      // socket.emit("start_chat", new_chat);
    }
    // if yes => just emit event "start_chat" & send conversation details as payload
    else {
      socket.emit("start_chat", existing_conversations[0]);
    }
  });

  socket.on("get_messages_by_gig_id", async (data, callback) => {
    console.log("DATA: ", data);
    const messages = await OneToOneMessage.find({
      gig_token_id: data.gig_token_id,
    });
    callback(messages);
  });

  socket.on("get_messages", async (data, callback) => {
    const messages = await OneToOneMessage.findById(
      data.conversation_id
    ).select("messages");
    callback(messages);
  });

  // Handle incoming text/link messages
  socket.on("text_message", async (data, callback) => {
    console.log("Received message:", data);

    // data: {to, from, text}

    const { message, conversation_id, from, to, type } = data;

    console.log("TO1:", to);

    const to_user = await User.find({ wallet_address: to });
    const from_user = await User.find({ wallet_address: from });

    console.log("TO: ", to, "FROM: ", from);

    // message => {to, from, type, created_at, text, file}

    const new_message = {
      to: to,
      from: from,
      type: type,
      created_at: Date.now(),
      text: message,
    };

    // fetch OneToOneMessage Doc & push a new message to existing conversation
    const chat = await OneToOneMessage.findById(conversation_id);
    if (!chat?.messages?.length) {
      const [freelancer] = await Freelancer.find({ wallet_address: to });
      const user = {
        email: freelancer.email,
        name: freelancer.name,
        client: from,
        message: message
      }
      newMessage(user);
    }

    if (!to) {
   

      const instance = await Dao.find({ wallet_address: from });
      console.log("IN", instance.length > 0);
      if (instance.length > 0) {
        console.log("pushing");
        chat.dao_messages.push(new_message);
      } else {
        callback(null);
      }
    } else {
      chat.messages.push(new_message);
    }

    // save to db`
    await chat.save({ new: true, validateModifiedOnly: true });

    // emit incoming_message -> to user

    console.log(to_user[0]?.socket_id == from_user[0]?.socket_id);

    io.to(to_user[0]?.socket_id).emit("new_message", {
      conversation_id,
      message: new_message,
    });

    console.log(from_user[0]?.socket_id, to_user[0]?.socket_id);

    // emit outgoing_message -> from user
    io.to(from_user[0]?.socket_id).emit("new_message", {
      conversation_id,
      message: new_message,
    });
    if (callback) {
      callback("not null");
    }
  });

  // // handle Media/Document Message
  // socket.on("file_message", (data) => {
  //   console.log("Received message:", data);

  //   // data: {to, from, text, file}

  //   // Get the file extension
  //   const fileExtension = path.extname(data.file.name);

  //   // Generate a unique filename
  //   const filename = `${Date.now()}_${Math.floor(
  //     Math.random() * 10000
  //   )}${fileExtension}`;

  // upload file to AWS s3

  // create a new conversation if its dosent exists yet or add a new message to existing conversation

  // save to db

  // emit incoming_message -> to user

  // emit outgoing_message -> from user
  // });
});

server.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
const startServer = async () => {
  await Moralis.start({
    apiKey: "67SOYN6KCquIzgxMK6XqyFm28Chbd4zPzccfATvlsQNy5MZ4S3iY3k9irfWaTv1L",
  });
};
startServer();

const { ethers } = require("ethers");

const url =
  "https://polygon-mumbai.g.alchemy.com/v2/eoMxzdLZ8G4vTVe6h4gZPNRcUEntfQ7t";

const Freelanco_abi = require("./constants/Freelanco.json");
const addresses = require("./constants/addresses.json");
const Freelanco_address = addresses["Freelanco"][80001]?.[0];
const provider = new ethers.providers.JsonRpcProvider(url);
const Freelanco_contract = new ethers.Contract(
  Freelanco_address,
  Freelanco_abi,
  provider
);

const Gig_abi = require("./constants/Gig.json");
const Gig_address = addresses["Gig"][80001]?.[0];
const Gig_contract = new ethers.Contract(Gig_address, Gig_abi, provider);

const DAoNFT_abi = require("./constants/DaoNFT.json");
const DAoNFT_address = addresses["DaoNFT"][80001]?.[0];
const DAoNFT_contract = new ethers.Contract(
  DAoNFT_address,
  DAoNFT_abi,
  provider
);

const GovernorContract_abi = require("./constants/GovernorContract.json");
const freelancer = require("./models/freelancer");
const GovernorContract_address = addresses["GovernorContract"][80001]?.[0];
const GovernorContract_contract = new ethers.Contract(
  GovernorContract_address,
  GovernorContract_abi,
  provider
);

console.log("GOVERNOR:", GovernorContract_address);
console.log("Frelanco:", Freelanco_address);
console.log("Gig:", Gig_address);
console.log("DAONFT:", DAoNFT_address);

DAoNFT_contract.on("NftRequested", (id, member) => {
  console.log("MEMBER DAO: ", member, id);
  const addData = async () => {
    await Dao.create({
      request_id: String(id._hex),
      wallet_address: String(member),
    });
  };

  addData();
});

GovernorContract_contract.on(
  "VoteCast",
  (account, proposalId, support, weight, params) => {
    console.log("Voted for: ", account, proposalId, support, weight, params);

    const updateProposal = async (data) => {
      try {
        console.log("DATA: ", data.proposalId);
        let proposals = Proposal.find({
          proposalId: data.proposalId,
        });
        proposals.exec(async function (err, results) {
          if (err) {
            console.log(err);
            return;
          }

          if (results.length > 0) {
            const proposal = results[0];
            proposal.votes.push(data.newVote);
            const resp = await proposal.save();
            console.log("ADDED SUCCESSFULLY ", resp);
          } else {
            console.log("No proposals found with proposalId", data.proposalId);
          }
        });

        // if (proposals.length > 0) {
        //   const proposal = proposals[0];
        //   console.log("PROPOSAL VOTES:", proposal.votes);
        //   proposal.votes.push(data.newVote);
        //   // Save the updated gig to the database
        //   const resp = await proposal.save();
        //   console.log("ADDED SUCCESFULLY ", resp);
        // } else {
        //   console.log("NO PROPOSAL FOUND");
        // }
      } catch (e) {
        console.log("FAILED: ", e);
      }
    };

    const data = {
      proposalId: String(proposalId._hex),
      newVote: {
        voteSupport: support,
        wallet_address: String(account),
      },
    };

    updateProposal(data);
  }
);

Freelanco_contract.on(
  "OfferSent",
  (
    _offerId,
    _gigId,
    _freelancer,
    _client,
    _amount,
    _daoFees,
    _deadline,
    terms
  ) => {
    console.log(
      "events------------>",
      _offerId._hex,
      Number(_gigId._hex),
      _freelancer,
      _client,
      Number(_amount._hex),
      Number(_daoFees._hex),
      Number(_deadline._hex),
      terms
    );
    const data = {
      offerId: String(_offerId._hex),
      gig_token_id: Number(_gigId._hex),
      freelancer_address: _freelancer.toString(),
      client_address: _client.toString(),
      total_charges: Number(_amount._hex) / Math.pow(10, 18),
      dao_fees: Number(_daoFees._hex) / Math.pow(10, 18),
      deadline: Number(_deadline._hex),
      terms: terms,
    };
    createProposal(data);
  }
);

Freelanco_contract.on("OfferStatusUpdated", (_offerId, _status) => {
  console.log("events------------>", _offerId._hex, _status);
  const data = {
    offerId: String(_offerId._hex),
    status: _status,
  };

  const updateProposal = async (data) => {
    const updateStatusMappig = {
      0: "Sent",
      1: "Approved",
      2: "Rejected",
      3: "Completed",
      4: "Successful",
      5: "Over_By_Freelancer",
      6: "Over_By_Client",
      7: "Dispute_Over",
    };
    try {
      const result = await Proposal.updateOne(
        { offerId: data.offerId },
        { $set: { status: updateStatusMappig[_status] } }
      ).then((result) => {
        console.log(`${result.modifiedCount} document(s) updated`);
      });
      console.log(result);
    } catch (e) {
      console.log("E", e);
    }
  };

  updateProposal(data);
});

Freelanco_contract.on("ContractDisputed", (offerId, proposalId, reason) => {
  console.log("Contract Disputed: ", offerId, proposalId);
  const updateProposal = async (data) => {
    try {
      const result = await Proposal.updateOne(
        { offerId: data.offerId },
        { $set: { proposalId: data.proposalId, reason: data.reason } }
      ).then((result) => {
        console.log(`${result.modifiedCount} document(s) updated`);
      });
      console.log(result);
    } catch (e) {
      console.log("E", e);
    }
  };

  const data = {
    offerId: String(offerId._hex),
    proposalId: String(proposalId._hex),
    reason: String(reason),
  };

  updateProposal(data);
});

Gig_contract.on("GigMinted", (freelancerAddress, tokenUri, tokenId) => {
  console.log("GIG EVENT: ", freelancerAddress, tokenUri, Number(tokenId._hex));
  updateGig(freelancerAddress, tokenUri, Number(tokenId._hex));
});

function hitApi() {
  axios
    .get("http://127.0.0.1:10000/")
    .then((response) => {
      console.log("API response:", response.data);
    })
    .catch((error) => {
      console.error("Error hitting API:", error);
    });
}
hitApi();
setInterval(hitApi, 2 * 60 * 1000);
