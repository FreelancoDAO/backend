const moralis = require("moralis").default;
const { generateToken } = require("./helpers");
const User = require("../../models/user");
const { createItem } = require("../../middleware/db");
const { findUserById } = require("./helpers/findUserById");

const moralisVerify = async (req, res) => {
  try {
    const { message, signature } = req.body;
    const { address, profileId } = (
      await moralis.Auth.verify({
        message,
        signature,
        networkType: "evm",
      })
    ).raw;

    const data = {
      wallet_address: address,
      profileId: profileId,
      metamask_verified: true,
    };

    let user_exist = await User.findOne({
      wallet_address: data.wallet_address,
    });

    let user;
    if (!user_exist) {
      user = await createItem(data, User);
    } else {
      user = await findUserById(user_exist?._id);
    }
    const token = generateToken(user);
    res.status(200).send({ token, user });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

module.exports = { moralisVerify };
