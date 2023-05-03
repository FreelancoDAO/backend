const Freelancer = require("../../models/freelancer");
const User = require("../../models/user");
const { createItem } = require("../../middleware/db");
const mongoose = require("mongoose");
const { findUserById, generateToken } = require("../auth/helpers");
const { sendJoiningStatus } = require("../../utils/email");

const addFreelancer = async (req, res) => {
  // try {
  const user_id = req.user._id;
  const data = { ...req.body, user_ref: user_id };
  const freelancer = await createItem(data, Freelancer);
  const user = await User.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(user_id),
    },
    { $set: { freelancer_ref: mongoose.Types.ObjectId(freelancer._id) } }
  );
  const data2 = await findUserById(user_id);
  console.log(data2);
  const token = generateToken(data2);
  sendJoiningStatus({ name: freelancer.name, email: freelancer.email });
  res.status(200).send({ token });
  // } catch (err) {
  //   console.log(err);
  //   res.status(400).json(err);
  // }
};

module.exports = { addFreelancer };
