import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // index for faster user post queries
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      maxLength: 500,
    },
    img: {
      type: [String],
      default: [],
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
    },
  },
  { timestamps: true }
);

postSchema.index({ userId: 1, createdAt: -1 });

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
