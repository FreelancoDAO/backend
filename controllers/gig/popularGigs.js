const Gig = require("../../models/gig");
const User = require("../../models/user");
const Freelancer = require("../../models/freelancer");
const Proposal = require("../../models/proposal");
const mongoose = require("mongoose");

const popularGigs = async (req, res) => {
  try {
    const gigs = await Gig.aggregate([
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
          freelancer: {
            _id: "$freelancer._id",
            name: "$freelancer.name",
            ipfsImageHash: "$freelancer.ipfsImageHash",
            isTopRated: "$freelancer.isTopRated"
          }
        }
      }
    ]);

    res.status(200).json(gigs);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

};

module.exports = { popularGigs };
