const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
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

const Posts = mongoose.model("Posts", postsSchema);

module.exports = { Posts };
