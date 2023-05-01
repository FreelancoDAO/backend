const Gig = require("../../models/gig");
const User = require("../../models/user");
const Freelancer = require("../../models/freelancer");
const mongoose = require("mongoose");

const findGigById = async (req, res) => {
  try {
    const [gig] = await Gig.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: "users",
          localField: "user_ref",
          foreignField: "_id",
          as: "user"
        }
      },
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
          user: { $arrayElemAt: ["$user", 0] },
          freelancer: { $arrayElemAt: ["$freelancer", 0] }
        }
      },
    ]);

    res.status(200).json(gig);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

};

module.exports = { findGigById };

