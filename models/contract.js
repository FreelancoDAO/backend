const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema(
  {
    smart_contract_id: {
      type: String,
      required: true,
      unique: true,
    },
    company_address: {
      type: String,
      required: true,
    },
    freelancer_address: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    job_ref: {
      type: String,
    },
    proposal_ref: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
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

module.exports = mongoose.model("Contract", contractSchema);
