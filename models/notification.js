const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    wallet_address: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    },
    link:
    {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
