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

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    sub_category: {
      type: String,
    },
    description: {
      type: String,
    },
    tokenUri: {
      type: String,
    },
    awsImageLink: {
      type: String,
    },
    tokenId: {
      type: Number,
    },
    duration: {
      type: String,
      enum: ["short", "long"],
      default: "short",
    },
    skill: {
      type: Array,
    },
    plans: {
      type: Array,
    },
    user_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    freelancer_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Freelancer",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
    },
    reviews: {
      type: [reviewSchema],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0.0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Gig", gigSchema);
