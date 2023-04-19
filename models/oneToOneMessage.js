const mongoose = require("mongoose");

const oneToOneMessageSchema = new mongoose.Schema({
  participants: [
    {
      type: String,
    },
  ],
  gig_token_id: {
    type: Number,
  },
  messages: [
    {
      to: {
        type: String,
      },
      from: {
        type: String,
      },
      type: {
        type: String,
        enum: ["Text", "Media", "Document", "Link"],
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
      text: {
        type: String,
      },
      file: {
        type: String,
      },
    },
  ],
  dao_messages: [
    {
      to: {
        type: String,
      },
      from: {
        type: String,
      },
      type: {
        type: String,
        enum: ["Text", "Media", "Document", "Link"],
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
      text: {
        type: String,
      },
      file: {
        type: String,
      },
    },
  ],
});

const OneToOneMessage = new mongoose.model(
  "OneToOneMessage",
  oneToOneMessageSchema
);
module.exports = OneToOneMessage;
