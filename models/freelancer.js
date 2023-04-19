const mongoose = require("mongoose");

const freelancerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
    },
    occupation: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    wallet_address: {
      type: String,
    },
    category: {
      type: String,
    },
    title: {
      type: String,
    },
    about: {
      type: String,
    },
    ipfsImageHash: {
      type: String,
    },
    user_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
    },
    employment: {
      type: String,
      enum: ["part-time", "full-time"],
    },
    projects: [
      {
        "title": String,
        "description": String,
        "startDate": Date,
        "endDate": Date,
        "githubURL": String,
        "liveURL": String
      }
    ],
    education: [
      {
        "degree": String,
        "major": String,
        "collegeName": String,
        "startDate": Date,
        "endDate": Date
      }
    ],
    workExperience: [
      {
        "role": String,
        "company": String,
        "description": String,
        "startDate": Date,
        "endDate": Date
      }
    ],
    skill: [
      {
        type: String,
      },
    ],
    jobs: [
      {
        type: String,
      },
    ],
    profile_status: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    total_earned: {
      type: Number,
      default: 0,
    },
    success_rate: {
      type: Number,
      default: 0,
    },
    avg_response: {
      type: Number,
      default: 0,
    },
    last_delivery: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isTopRated: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("freelancer", freelancerSchema);
