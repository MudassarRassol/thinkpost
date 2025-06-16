import { NextResponse } from "next/server";

export function middleware(request) {
  const userId = request.cookies.get("userId")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Forward request with user ID in headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", userId); // You can read this in your API route

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

export const config = {
  matcher: ["/api/userdetails/:path*"], // Apply only to protected routes
};
