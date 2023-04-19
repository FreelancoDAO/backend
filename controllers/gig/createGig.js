const Gig = require("../../models/gig");
const Freelancer = require("../../models/freelancer");
const { ObjectId } = require("mongodb");
const { createItem } = require("../../middleware/db");

const createGig = async (req, res) => {
  try {
    const p = {
      ...req.body,
      freelancer_ref: req.user.freelancer_ref,
      user_ref: req.user._id,
    };
    const gig = await createItem(p, Gig);
    res.status(200).json(gig);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = { createGig };
