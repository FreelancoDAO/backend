const Gig = require("../../models/gig");
const User = require("../../models/user");
const Freelancer = require("../../models/freelancer");
const mongoose = require("mongoose");

const getGigsByUserId = async (req, res) => {
  console.log("eeeeee", req.user?._id);
  try {
    const gig = await Gig.aggregate([
      { $match: { user_ref: mongoose.Types.ObjectId(req.user?._id) } },
      {
        $lookup: {
          from: "freelancers",
          localField: "freelancer_ref",
          foreignField: "_id",
          as: "freelancer"
        }
      },
      {
        $addFields: {
          freelancer: { $arrayElemAt: ["$freelancer", 0] }
        }
      },
      {
        $project: {
          _id: 1,
          tokenUri: 1,
          title: 1,
          rating: 1,
          plans: 1,
          tokenId: 1,
          freelancer: {
            _id: "$freelancer._id",
            name: "$freelancer.name",
            ipfsImageHash: "$freelancer.ipfsImageHash",
            isTopRated: "$freelancer.isTopRated"
          }
        }
      }
    ]);
    console.log("lll", gig);
    res.status(200).json(gig);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }





  // try {
  //   console.log("usergig", req.user._id);
  //   const gigs = await Gig.find({
  //     user_ref: mongoose.Types.ObjectId(req.user?._id),
  //   });

  //   const gigsWithUserData = await Promise.all(
  //     gigs.map(async (gig) => {
  //       let gigData = { ...gig._doc };

  //       if (gig.user_ref) {
  //         const user = await User.findOne({
  //           _id: mongoose.Types.ObjectId(gig.user_ref),
  //           isDeleted: false,
  //           isActive: true,
  //         });

  //         if (user) {
  //           gigData = { ...gigData, user };
  //         }

  //         const freelancer = await Freelancer.findOne({
  //           _id: mongoose.Types.ObjectId(gig.freelancer_ref),
  //           isDeleted: false,
  //           isActive: true,
  //         });

  //         if (freelancer) {
  //           gigData = { ...gigData, freelancer };
  //         }
  //       }

  //       return gigData;
  //     })
  //   );

  //   res.status(200).json(gigsWithUserData);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ message: "Something went wrong" });
  // }
};

module.exports = { getGigsByUserId };
