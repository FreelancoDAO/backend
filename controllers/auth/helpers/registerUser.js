const User = require("../../../models/user");
const { generateToken } = require("./generateToken");
const { createItem } = require("../../../middleware/db");

const registerUser = async (data) => {
  try {
    let walletAddress = await User.findOne({
      $or: [{ wallet_address: data.wallet_address }, { email: data.email }],
    });
    // let email = await User.findOne({ email: req.body.email });
    if (!walletAddress) {
      const user = await createItem(data, User);
      res.status(201).send({ message: "user created !" });
    } else {
      res.status(403).send({
        error:
          "User already exists ! please sign up with different wallet or email",
      });
    }
  } catch (err) {
    res.send({ error: err });
  }
};
module.exports = { registerUser };
