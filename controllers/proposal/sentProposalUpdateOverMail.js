const Freelancer = require("../../models/freelancer");
const { proposalMail } = require("../../utils/email");
const { addNotification } = require("../../controllers/notification");
const Gig = require("../../models/gig");
const Proposal = require("../../models/proposal");
const OneToOneMessage = require("../../models/oneToOneMessage");
const Analytics = require("../../models/analytics");

const sentProposalUpdateOverMail = async (data) => {
  try {

    const updateStatusMappig = {
      0: "Sent",
      1: "Approved",
      2: "Rejected",
      3: "Completed",
      4: "Successful",
      5: "Over_By_Freelancer",
      6: "Over_By_Client",
      7: "Dispute_Over",
      // 0: "Sent to freelancer",
      // 1: "Accepted by freelancer",
      // 2: "Rejected by freelancer",
      // 3: "Completed by freelancer",
      // 4: "Successfully approved by client ",
      // 5: "Disputed by Freelancer",
      // 6: "Disputed by Client",
      // 7: "Dispute Over",
    };
    // const proposal = await Proposal.updateOne(
    //   { offerId: data.offerId },
    //   { $set: { status: updateStatusMappig[data.status] } },
    //   { new: true }
    // )

    const proposal_status = await Proposal.findOne({ offerId: data.offerId });

    if (proposal_status?.status != updateStatusMappig[data.status]) {

      const proposal = await Proposal.findOneAndUpdate(
        { offerId: data.offerId },
        { $set: { status: updateStatusMappig[data.status] } },
        { new: true }
      );
      const status = updateStatusMappig[data.status];
      const updateObject = { $inc: { [status]: 1 } };

      await Analytics.updateOne(
        { wallet_address: proposal.freelancer_address },
        updateObject,
        { upsert: true }
      );

      const new_message = {
        to: proposal.freelancer_address,
        from: proposal.client_address,
        type: 'Offer',
        created_at: Date.now(),
        text: `The status of your proposal has been updated to "${proposal.status}"`,
      };

      await OneToOneMessage.findOneAndUpdate({
        participants: { $size: 2, $all: [proposal?.freelancer_address, proposal?.client_address] },
        offer_id: data.offerId
      }, {
        $push: { messages: new_message }
      })


      const freelancer = await Freelancer.findOne({ wallet_address: proposal?.freelancer_address });
      console.log("free", freelancer);
      const gig = await Gig.findOne({ tokenId: proposal?.gig_token_id });
      await addNotification({
        wallet_address: proposal?.freelancer_address,
        message: `The status of your proposal for project "${gig?.title}" has been updated to "${proposal.status}"`,
        link: '/messages/123',
      });
      await addNotification({
        wallet_address: proposal?.client_address,
        message: `The status of your proposal for project "${gig?.title}" has been updated to "${proposal.status}"`,
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
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = { sentProposalUpdateOverMail }