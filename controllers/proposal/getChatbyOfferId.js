const Proposal = require("../../models/proposal");
const OneToOneMessage = require("../../models/oneToOneMessage");
const { gptVoting } = require("./gptVoting");

const getChatbyOfferId = async (offerId, reason) => {
  let prompt = "";
  const proposal = await Proposal.findOne({ offerId });
  const chat = await OneToOneMessage.findOne({ offer_id: offerId });
  // const disputing = proposal?.status === 'Over_By_Client' ? proposal?.client_address : proposal?.freelancer_address;

  prompt += `Reason: ${reason}\n`;
  for (let i = 0; i < chat?.messages?.length; i++) {
    const message = chat?.messages[i];
    const sender =
      message.from === proposal?.freelancer_address ? "Freelancer" : "Client";
    const text = message?.text;

    prompt += `${sender}: ${text}\n`;
  }
  prompt += `\n\n###\n\n\nVote:`;
  console.log("PROMPT", prompt);
  const gpt_response = await gptVoting(prompt);
  await Proposal.findOneAndUpdate(
    { _id: proposal._id },
    { gpt_vote: gpt_response }
  );
};

module.exports = { getChatbyOfferId };
