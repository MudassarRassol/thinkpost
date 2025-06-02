import connectdb from "@/lib/connectdb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectdb();

  try {
    const userId = req.headers.get("x-user-id"); // Get userId from middleware header

    const { username, gender } = await req.json();

    if (!username || !gender) {
      return NextResponse.json({ error: "Username and gender are required." }, { status: 400 });
    }

    const existingUser = await User.findOne({ username, _id: { $ne: userId } });
    if (existingUser) {
      return NextResponse.json({ error: "Username already exists." }, { status: 409 });
    }

    const number = Math.floor(Math.random() * 100) + 1;
    const profilePic =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy${number}.png`
        : `https://avatar.iran.liara.run/public/girl${number}.png`;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, gender, profilePic },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated", user: updatedUser }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
