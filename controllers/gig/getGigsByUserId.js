const Gig = require("../../models/gig");
const User = require("../../models/user");
const Freelancer = require("../../models/freelancer");
const mongoose = require("mongoose");

const getGigsByUserId = async (req, res) => {
  try {
    const gigs = await Gig.find({
      user_ref: mongoose.Types.ObjectId(req.user?._id),
    });

    const gigsWithUserData = await Promise.all(
      gigs.map(async (gig) => {
        let gigData = { ...gig._doc };

        if (gig.user_ref) {
          const user = await User.findOne({
            _id: mongoose.Types.ObjectId(gig.user_ref),
            isDeleted: false,
            isActive: true,
          });

          if (user) {
            gigData = { ...gigData, user };
          }

          const freelancer = await Freelancer.findOne({
            _id: mongoose.Types.ObjectId(gig.freelancer_ref),
            isDeleted: false,
            isActive: true,
          });

          if (freelancer) {
            gigData = { ...gigData, freelancer };
          }
        }

        return gigData;
      })
    );

    res.status(200).json(gigsWithUserData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { getGigsByUserId };
