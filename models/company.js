const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    total_earned: {
      type: Number,
    },
    success_rate: {
      type: Number,
    },
    wallet_address: {
      type: String,
    },
    payment_verified: {
      type: Boolean,
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

module.exports = mongoose.model("Company", companySchema);
