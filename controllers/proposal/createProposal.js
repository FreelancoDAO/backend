const { createItem } = require("../../middleware/db");
const Proposal = require("../../models/proposal");
const createProposal = async (data) => {
  try {
    console.log(data);
    const proposal = await Proposal.findOne({
      offerId: data?.offerId,
    });
    if (!proposal) {
      await createItem(data, Proposal);
    } else {
      console.log("proposal already exists");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createProposal };
