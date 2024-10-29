import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  const c = await cookies();
  const token = c.get("token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const payload = jwt.decode(token || "", { complete: true })?.payload as {
    id: number;
  };

  if (!payload) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
    });
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("user-id", payload.id.toString());

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/api/shifts", "/api/users/me"],
};
