import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // Remove the cookie
  cookies().delete("userId");

  return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
}
