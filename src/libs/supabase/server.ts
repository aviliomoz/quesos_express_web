"use server"

import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { getCookie, setCookie } from "cookies-next";
import { createServerClient } from "@supabase/ssr";
import { Database } from "@/schemas/database";

const supabase_url: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabase_anon_key: string =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const createSupabaseServerClient = () => {
  return createServerClient<Database>(supabase_url, supabase_anon_key, {
    cookies: {
      get(name) {
        return cookies().get(name)?.value;
      },
    },
  });
};

export const createSupabaseMiddlewareClient = (
  req: NextRequest,
  res: NextResponse
) => {
  return createServerClient<Database>(supabase_url, supabase_anon_key, {
    cookies: {
      get(name) {
        return getCookie(name, { req, res });
      },
      set(name, value, options) {
        setCookie(name, value, { req, res, ...options });
      },
      remove(name, options) {
        setCookie(name, "", { req, res, ...options });
      },
    },
  });
};
