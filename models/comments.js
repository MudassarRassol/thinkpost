import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true, // index for fast comment queries by post
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    replies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Reply",
      default: [],
    },
  },
  { timestamps: true }
);

commentSchema.index({ createdAt: -1 });

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;
