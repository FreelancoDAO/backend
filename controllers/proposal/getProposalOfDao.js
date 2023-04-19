const Proposal = require("../../models/proposal");
const User = require("../../models/user");
const mongoose = require("mongoose");
const Freelancer = require("../../models/freelancer");
const Gig = require("../../models/gig");

const getProposalOfDao = async (req, res) => {
  try {
    Proposal.find({
      status: { $in: ["Over_By_Freelancer", "Over_By_Client", "Dispute_Over"] },
    })
      .then((proposals) => {
        // Handle the array of proposals returned by the query
        res
          .status(200)
          .json(proposals.filter((proposal) => proposal.proposalId != null));
      })
      .catch((error) => {
        // Handle any errors that occur while querying the database
        console.error(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { getProposalOfDao };
