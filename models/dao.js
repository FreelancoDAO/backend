const mongoose = require("mongoose");

const daoSchema = new mongoose.Schema(
  {
    wallet_address: {
      type: String,
      // unique: true,
      // required: true,
    },
    request_id: {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Dao", daoSchema);
