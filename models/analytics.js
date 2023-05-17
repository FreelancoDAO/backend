const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    wallet_address: {
      type: String,
      required: true,
    },
    Sent: {
      type: Number,
    },
    Approved: {
      type: Number,
    },
    Rejected: {
      type: Number,
    },
    Completed: {
      type: Number,
    },
    Successful: {
      type: Number,
    },
    Over_By_Freelancer: {
      type: Number,
    },
    Over_By_Client: {
      type: Number
    },
    dispute_win: {
      type: Number
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Analytics", analyticsSchema);
