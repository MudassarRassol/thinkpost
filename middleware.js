// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import mongoose from "mongoose";
// import User from "@/models/User";
// import connectdb from "@/lib/connectdb";

// export async function middleware(req) {
//   await connectdb();

//   const userId = req.cookies.get("userId")?.value;

//   if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 401 });
//     }

//     // Add user to the request object (via request headers or URL cloning)
//     const requestHeaders = new Headers(req.headers);
//     requestHeaders.set("x-user-id", userId); // You can access this in your route later

//     const res = NextResponse.next();
//     res.headers = requestHeaders;
//     return res;

//   } catch (err) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
