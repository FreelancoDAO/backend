const Gig = require("../../models/gig");
const getAllGigs = async (req, res) => {
  try {
    const allg_gigs = await Gig.find();
    res.status(200).json(allg_gigs);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { getAllGigs };
