import { cookies } from "next/headers";
import User from "@/models/User";
export async function getuser() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // fetch user
  const user = await User.findById(userId);
  return NextResponse.json({ user });
}
