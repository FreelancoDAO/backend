const Proposal = require("../../models/proposal");
const User = require("../../models/user");
const mongoose = require("mongoose");
const Freelancer = require("../../models/freelancer");
const Gig = require("../../models/gig");

const getOrders = async (req, res) => {
  try {
    if (req.user != null) {
      console.log(req.user);
      console.log(req.user.freelancer_ref);
      const proposals = await Proposal.find({
        $or: [
          { freelancer_address: req.user.wallet_address },
          { client_address: req.user.wallet_address },
        ],
        status: {
          $in: [
            "Successful",
            "Over_By_Freelancer",
            "Over_By_Client",
            "Dispute_Over",
          ],
        },
      });
      console.log(proposals);
      res.status(200).json(proposals);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { getOrders };
