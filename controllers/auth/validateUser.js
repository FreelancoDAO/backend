const User = require("../../models/user");
const ethUtil = require("ethereumjs-util");
const sigUtil = require("eth-sig-util");
const jwt = require("jsonwebtoken");
// const { access } = require("fs");
const { generateToken } = require("./helpers");

const validateUser = async (req, res) => {
  try {
    const { signature, publicAddress } = req.body;
    if (!signature || !publicAddress)
      return res
        .status(400)
        .send({ error: "Request should have signature and publicAddress" });
    console.log(publicAddress);
    const user = await User.findOne({ wallet_address: publicAddress });
    console.log(user);
    ////////////////////////////////////////////////////
    // Step 1: Get the user with the given publicAddress
    ////////////////////////////////////////////////////
    if (!user)
      return res.status(401).send({
        error: `User with publicAddress ${publicAddress} is not found in database`,
      });

    ////////////////////////////////////////////////////
    // Step 2: Verify digital signature
    ////////////////////////////////////////////////////
    if (!(user instanceof User)) {
      // Should not happen, we should have already sent the response
      throw new Error('User is not defined in "Verify digital signature".');
    }

    const msg = `I am signing my one-time nonce`;

    // We now are in possession of msg, publicAddress and signature. We
    // will use a helper from eth-sig-util to extract the address from the signature
    const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, "utf8"));
    const address = sigUtil.recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });
    // The signature verification is successful if the address found with
    // sigUtil.recoverPersonalSignature matches the initial publicAddress
    if (address.toLowerCase() != publicAddress.toLowerCase()) {
      return res.status(401).send({ error: "Signature verification failed" });
    }
    ////////////////////////////////////////////////////
    // Step 3: Generate a new nonce for the user
    ////////////////////////////////////////////////////

    if (!(user instanceof User)) {
      // Should not happen, we should have already sent the response

      throw new Error(
        'User is not defined in "Generate a new nonce for the user".'
      );
    }

    user.nonce = Math.floor(Math.random() * 10000);
    await user.save();

    ////////////////////////////////////////////////////
    // Step 4: Create JWT
    ////////////////////////////////////////////////////

    // https://github.com/auth0/node-jsonwebtoken
    const token = generateToken(user._id);
    res.status(200).send({ token: token });
  } catch (err) {
    res.status(403).send({ error: err });
  }
};

module.exports = { validateUser };
