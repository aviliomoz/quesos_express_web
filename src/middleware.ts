import { NextResponse, NextRequest } from "next/server";
import { refreshToken } from "./functions/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();

  const token = await refreshToken(session.value);

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  response.cookies.set("session", token, {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
  });

  if (request.nextUrl.pathname === "/dashboard")
    return NextResponse.redirect(
      new URL("/dashboard/restaurants", request.url)
    );

  return response;
}

export const config = {
  matcher: "/dashboard/:path*",
};
