import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
      index: true, // index added for faster lookup of replies by comment
    },
    reply: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Reply = mongoose.models.Reply || mongoose.model("Reply", replySchema);
export default Reply;
