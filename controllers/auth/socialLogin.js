const { generateToken } = require("./helpers");
const User = require("../../models/user");
const { createItem } = require("../../middleware/db");
const { findUserById } = require("./helpers/findUserById");

const socialLogin = async (req, res) => {
  try {

    let user_exist = await User.findOne({
      wallet_address: req.body.wallet_address,
    });

    let user;
    if (!user_exist) {
      user = await createItem(req.body, User);
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

module.exports = { socialLogin };