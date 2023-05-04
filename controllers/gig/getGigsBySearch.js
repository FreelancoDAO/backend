const Gig = require("../../models/gig");
const User = require("../../models/user");
const Freelancer = require("../../models/freelancer");
const mongoose = require("mongoose");

const getGigsBySearch = async (req, res) => {
  console.log(req.params.text);
  const searchData = req.params.text;
 
  try {
    const gig = await Gig.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: "\\b" + searchData + "\\b", $options: "i" } },
            {
              description: {
                $regex: "\\b" + searchData + "\\b",
                $options: "i",
              },
            },
          ],
        },
      },

      {
        $lookup: {
          from: "freelancers",
          localField: "freelancer_ref",
          foreignField: "_id",
          as: "freelancer",
        },
      },
      {
        $addFields: {
          freelancer: { $arrayElemAt: ["$freelancer", 0] },
        },
      },
      {
        $project: {
          _id: 1,
          tokenUri: 1,
          title: 1,
          rating: 1,
          plans: 1,
          tokenId: 1,
          awsImageLink: 1,
          freelancer: {
            _id: "$freelancer._id",
            name: "$freelancer.name",
            ipfsImageHash: "$freelancer.ipfsImageHash",
            isTopRated: "$freelancer.isTopRated",
            awsImageLink: "$freelancer.awsImageLink",
          },
        },
      },
    ]);
    res.status(200).json(gig);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
  }

 


module.exports = { getGigsBySearch };
