const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  proposals_count: {
    type: Number,
  },
  flag: {
    type: String,
  },
  last_viewed_by_client: {
    type: Date,
  },
  flags: [
    {
      type: String,
    },
  ],
  likes: {
    type: Number,
  },
  dislikes: {
    type: Number,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  interviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{
    versionKey: false,
    timestamps: true,
  });

module.exports = mongoose.model("Activity", activitySchema);
