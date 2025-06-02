import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // index added to speed up queries by user
    },
    img: {
      type: [String],
      default: [],
      required: true,
    },
    musicUrl: {
      type: String,
      required: false,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

storySchema.index({ createdAt: -1 });

const Story = mongoose.models.Story || mongoose.model("Story", storySchema);
export default Story;
