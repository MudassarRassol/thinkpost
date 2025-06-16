import User from "@/models/User.js";
import { NextResponse } from "next/server";
import connectdb from "@/lib/connectdb.js";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(req,res) {
  await connectdb(); // connect to MongoDB

  try {
    const { email, password } = await req.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const newUser = await User.create({ email, password: hashedPassword });

    // Set cookie (for example, saving userId)
    cookies.set("userId", newUser._id.toString())
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
