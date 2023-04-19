const Gig = require("../../models/gig");
const User = require("../../models/user");
const Freelancer = require("../../models/freelancer");
const Proposal = require("../../models/proposal");
const mongoose = require("mongoose");

const getGigByCategory = async (req, res) => {
  try {
    const gigs = await Gig.find(req.body);

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

          const freelancerC = await Freelancer.findOne({
            _id: mongoose.Types.ObjectId(gig.freelancer_ref),
            isDeleted: false,
            isActive: true,
          });

          const proposals = await Proposal.find({
            freelancer_address: freelancerC.wallet_address,
            status: {
              $in: ["Successful"],
            },
          });

          const freelancer = { ...freelancerC._doc, workSamples: proposals };

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

module.exports = { getGigByCategory };
