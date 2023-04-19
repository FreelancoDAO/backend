const { createItem } = require("../../middleware/db");
const Proposal = require("../../models/proposal");
const mongoose = require("mongoose");
const updateStatus = async (req, res) => {
  const proposalId = req.params.proposalId;
  try {
    const result = await Proposal.findByIdAndUpdate(
      mongoose.Types.ObjectId(proposalId),
      { status: req.params.status }
    );
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { updateStatus };
