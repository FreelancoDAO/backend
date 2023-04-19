const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["open", "in_progress", "closed", "revoked"],
      default: "open",
    },
    freelancer_hired: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Freelancer",
    },
    company_posted: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    skills: {
      type: Array,
    },
    proposals: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposals",
    },
    budget: {
      type: Number,
    },
    job_length: {
      type: String,
      enum: ["short", "long"],
      default: "long",
    },
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
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

module.exports = mongoose.model("Job", jobSchema);
