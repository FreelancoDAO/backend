const { createItem } = require("../../middleware/db");
const Proposal = require("../../models/proposal");
const { newProposal } = require("../../utils/email");
const Freelancer = require("../../models/freelancer");
const createProposal = async (data) => {
  try {
    console.log(data);
    const proposal = await Proposal.findOne({
      offerId: data?.offerId,
    });
    if (!proposal) {
      await createItem(data, Proposal);
      const freelancer = await Freelancer.findOne({ wallet_address: data?.freelancer_address });
      const subject = 'New Proposal from Client';
      const message = `<p>We are pleased to inform you that you have received a new proposal from ${data.client_address}. They are interested in working with you on their project and have sent you the details of the project along with the proposal.</p>
      <p>Please take the time to carefully review the proposal and project details to see if it aligns with your skills and interests. If you are interested in working with client, please accept the proposal.</p>`
      const user = {
        name: freelancer.name,
        email: freelancer.email,
      }
      newProposal(user, subject, message);
    } else {
      console.log("proposal already exists");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createProposal };
