import { Database } from "@/schemas/database";
import { createBrowserClient } from "@supabase/ssr";

const supabase_url: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabase_anon_key: string =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const createSupabaseBrowserClient = () => {
  return createBrowserClient<Database>(supabase_url, supabase_anon_key);
};
