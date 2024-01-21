import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "./libs/supabase/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createSupabaseMiddlewareClient(request, response);

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session)
    return NextResponse.redirect(new URL("/", request.url));

  if (request.nextUrl.pathname === "/dashboard")
    return NextResponse.redirect(
      new URL("/dashboard/restaurants", request.url)
    );

  return response;
}

export const config = {
  matcher: "/dashboard/:path*",
};
