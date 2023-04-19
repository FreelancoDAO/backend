const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
  },
  comment: {
    type: String,
  },
  wallet_address: {
    type: String,
  },
});

const votesSchema = new mongoose.Schema({
  voteSupport: {
    type: Number,
  },
  wallet_address: {
    type: String,
  },
});

const proposalSchema = new mongoose.Schema(
  {
    terms: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "Sent",
        "Approved",
        "Rejected",
        "Completed",
        "Successful",
        "Over_By_Freelancer",
        "Over_By_Client",
        "Dispute_Over",
      ],
      default: "Sent",
    },
    deadline: {
      type: Number,
    },
    total_charges: {
      type: Number,
      required: true,
    },
    dao_fees: {
      type: Number,
    },
    gig_token_id: {
      type: Number,
    },
    offerId: {
      type: String,
    },
    reason: {
      type: String,
    },
    proposalId: {
      type: String,
    },
    client_address: {
      type: String,
    },
    votes: {
      type: [votesSchema],
      default: [],
    },
    freelancer_address: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    reviews: {
      type: [reviewSchema],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Proposal", proposalSchema);
