const Proposal = require("../../models/proposal");

const gptResponse = async (req, res) => {
  let result;
  const proposal = await Proposal.findOne({ proposalId: req.body.proposalId });
  if (
    (proposal?.status === "Over_By_Client" &&
      proposal?.gpt_vote === "Client") ||
    (proposal?.status === "Over_By_Freelancer" &&
      proposal?.gpt_vote === "Freelancer")
  ) {
    result = 1;
  } else {
    result = 0;
  }
  res.status(200).json({result});
};

module.exports = { gptResponse };
