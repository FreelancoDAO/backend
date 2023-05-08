const Freelancer = require("../../models/freelancer");
const { proposalMail } = require("../../utils/email");
const { addNotification } = require("../../controllers/notification");
const Gig = require("../../models/gig");

const sentProposalUpdateOverMail = async (proposal) => {
  try {
    const freelancer = await Freelancer.findOne({ wallet_address: proposal?.freelancer_address });
    const gig = await Gig.findOne({ tokenId: proposal?.gig_token_id });
    await addNotification({
      wallet_address: proposal?.freelancer_address,
      message: `The status of your proposal for project <strong>${gig?.title}</strong> has been updated to <strong>${proposal.status}`,
      link: '/messages/123',
    });
    const subject = 'Project Update';
    const message = `<p>The status of your proposal for project <strong>${gig?.title}</strong> has been updated to <strong>${proposal.status}</strong>.</p>
<p>Please log in to your account to view the updated status and any messages or comments from the client or freelancer.</p>
`
    const user = {
      name: freelancer.name,
      email: freelancer.email,
    }
    console.log("mail sending is progress............");
    proposalMail(user, subject, message);
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = { sentProposalUpdateOverMail }