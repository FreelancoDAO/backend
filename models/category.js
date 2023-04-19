const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: Array,
      required: true,
    },
    image: {
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

module.exports = mongoose.model("Category", categorySchema);
