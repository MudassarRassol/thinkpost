import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true, // explicit index for faster queries
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    gender:{
      type: String,
      enum: ["male", "female"],
      default: "male"
    },
    bio: {
      type: String,
      default: "",
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    friendRequestsReceived: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.index({ createdAt: -1 });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
