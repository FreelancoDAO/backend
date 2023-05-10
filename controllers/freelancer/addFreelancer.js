const Freelancer = require("../../models/freelancer");
const User = require("../../models/user");
const Notification = require("../../models/notification");
const { createItem } = require("../../middleware/db");
const mongoose = require("mongoose");
const { findUserById, generateToken } = require("../auth/helpers");
const { sendJoiningStatus } = require("../../utils/email");
const { addNotification } = require("../notification");




const addFreelancer = async (req, res) => {
  try {
    const user_id = req.user._id;
    const data = { ...req.body, user_ref: user_id };
    const freelancer = await createItem(data, Freelancer);
    const user = await User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(user_id),
      },
      { $set: { freelancer_ref: mongoose.Types.ObjectId(freelancer._id) } },
      { new: true }
    );
    const updated_user = { ...user._doc, freelancer: freelancer }
    sendJoiningStatus({ name: freelancer.name, email: freelancer.email });
    await addNotification({
      wallet_address: user?.wallet_address,
      message: "congrats for becoming a freelancer with us!",
      link: '/messages/123',
    })
    const token = generateToken(updated_user);
    res.status(200).send({ freelancer: updated_user, token: token });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = { addFreelancer };
