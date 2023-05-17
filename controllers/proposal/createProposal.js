const { createItem } = require("../../middleware/db");
const Proposal = require("../../models/proposal");
const { proposalMail } = require("../../utils/email");
const Freelancer = require("../../models/freelancer");
const { addNotification } = require("../../controllers/notification");
const Analytics=require("../../models/analytics");
const OneToOneMessage = require("../../models/oneToOneMessage");


const createProposal = async (data) => {
  try {
    console.log(data);
    const proposal = await Proposal.findOne({
      offerId: data?.offerId,
    });
    if (!proposal) {
      await createItem(data, Proposal);
      await Analytics.updateOne(
        { wallet_address: data?.freelancer_address },
        { $inc: { Sent: 1 } },
        { upsert: true }
      );


      const existing_conversations = await OneToOneMessage.find({
        participants: { $size: 2, $all: [data?.freelancer_address, data?.client_address] },
        gig_token_id: data.gig_token_id
      });

      const existing_conversations_with_offerId = existing_conversations.filter(convo => {
        if (convo.offer_id) {
          return true;
        }
      });
      console.log("count",existing_conversations_with_offerId.length);
      const new_message = {
        to: data.freelancer_address,
        from: data.client_address,
        type: 'Offer',
        created_at: Date.now(),
        // text: `proposal created with  and amount ${data?.total_charges}`,
        text: `Hi ${data.freelancer_address} , After reviewing your profile, I am pleased to offer you the opportunity to work on this project.
        The project deadline is ${data.deadline} and my budget for this project is ${data.total_charges} Matic. Please confirm by Accepting that you are available to work on this project within these terms. Additionally, I would like to highlight the following terms and conditions that will apply to our work: ${data.terms}`
      };
      console.log("existi", existing_conversations);

      let updates_convo;
      if (existing_conversations.length === 0 || existing_conversations_with_offerId.length != 0) {
        updates_convo = await OneToOneMessage.create({
          participants: [data.client_address, data.freelancer_address],
          gig_token_id: data.gig_token_id,
          offer_id: data?.offerId,
          messages: [new_message]
        });
      }
      else {
        updates_convo = await OneToOneMessage.findOneAndUpdate({
          participants: { $size: 2, $all: [data?.freelancer_address, data?.client_address] },
        }, {
          gig_token_id: data.gig_token_id,
          offer_id: data?.offerId,
          $push: { messages: new_message }
        })
      }
      console.log("updates", updates_convo);


      const freelancer = await Freelancer.findOne({ wallet_address: data?.freelancer_address });
      const subject = 'New Proposal from Client';
      const message = `<p>We are pleased to inform you that you have received a new proposal from ${data.client_address}. They are interested in working with you on their project and have sent you the details of the project along with the proposal.</p>
      <p>Please take the time to carefully review the proposal and project details to see if it aligns with your skills and interests. If you are interested in working with client, please accept the proposal.</p>`
      const user = {
        name: freelancer.name,
        email: freelancer.email,
      }
      await addNotification({
        wallet_address: data?.freelancer_address,
        message: `congrats ! you have received a new proposal from ${data.client_address}`,
        link: '/messages/123',
      });
      await addNotification({
        wallet_address: data?.client_address,
        message: `congrats ! you have created a new proposal with ${data.freelancer_address}`,
        link: '/messages/123',
      });
      proposalMail(user, subject, message);
    } else {
      console.log("proposal already exists");
    }
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = { createProposal };
