const mongoose = require("mongoose");

const reelsSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // For comment, there will be a separate schema
    caption: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Reels = mongoose.model("Reels", reelsSchema);

module.exports = { Reels };
