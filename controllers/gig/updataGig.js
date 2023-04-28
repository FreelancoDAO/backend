const Gig = require("../../models/gig");
const User = require("../../models/user");
const axios = require("axios");

const updateGig = async (freelancerAddress, tokenUri, tokenId) => {

  // let json = await axios.get("https://ipfs.io/ipfs/" + tokenUri);
  // json = json.data;
  // console.log("GOT DATA:");

  // const user = await User.find({ wallet_address: freelancerAddress });

  // const gigSearch = await Gig.find({ tokenId: tokenId });

  // if (gigSearch.length == 0) {
  //   const gig = new Gig({
  //     title: json.title,
  //     category: json.metadata.category,
  //     sub_category: json.metadata.sub_category,
  //     description: json.description,
  //     duration: json.metadata.duration,
  //     skill: json.metadata.skill,
  //     plans: json.metadata.plans,
  //     status: "active",
  //     user_ref: user[0]._id,
  //     freelancer_ref: user[0].freelancer_ref,
  //     tokenId,
  //     tokenUri,
  //   });


  try {
    console.log("GETING DATA FROM IPFS: ");
    const update_gig = await Gig.findOneAndUpdate(tokenUri, { tokenId });
    if (update_gig) {
      console.log("Gig saved successfully");
    }
  }
  catch (err) {
    console.log(err);
  }
};

module.exports = { updateGig };
