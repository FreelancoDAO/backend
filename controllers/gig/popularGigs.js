const Gig = require("../../models/gig");
const User = require("../../models/user");
const Freelancer = require("../../models/freelancer");
const Proposal = require("../../models/proposal");
const mongoose = require("mongoose");

const popularGigs = async (req, res) => {
  try {
    const allg_gigs = await Gig.find();

    const gigsWithUserData = await Promise.all(
      allg_gigs.map(async (gig) => {
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

          const freelancerc = await Freelancer.findOne({
            _id: mongoose.Types.ObjectId(gig.freelancer_ref),
            isDeleted: false,
            isActive: true,
          });

          // const proposals = await Proposal.find({
          //   freelancer_address: freelancerC.wallet_address,
          //   status: {
          //     $in: ["Successful"],
          //   },
          // });

          // const freelancer = { ...freelancerC._doc, workSamples: proposals };

          if (freelancerc) {
            gigData = { ...gigData, freelancer: freelancerc };
          }
        }

        return gigData;
      })
    );

    res.status(200).json(gigsWithUserData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = { popularGigs };
