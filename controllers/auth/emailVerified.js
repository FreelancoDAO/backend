const { updateItem } = require("../../middleware/db");
const User = require("../../models/user");
const { getUserIdFromToken } = require("./helpers");


const emailVerified = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });
    const user_id_from_token =await getUserIdFromToken(req.params.token);
    console.log(user_id_from_token);
    if (req.params.id != user_id_from_token)
      return res.status(400).send({ message: "Invalid link" });

    await User.updateOne({ _id: user._id, is_email_verified: true });
    res.render("thanks");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { emailVerified };
