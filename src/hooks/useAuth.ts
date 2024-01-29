import { createSupabaseBrowserClient } from "@/libs/supabase/browser";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    createSupabaseBrowserClient()
      .auth.getSession()
      .then(({ data: { session } }) => setSession(session))
      .finally(() => setLoading(false));
  }, []);

  return { session, user: session?.user, loading };
}
