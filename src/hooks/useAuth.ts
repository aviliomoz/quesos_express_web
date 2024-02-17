import { useEffect, useState } from "react";

export function useAuth() {
  const [session, setSession] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setSession(localStorage.getItem("session"));
    setLoading(false);
  }, []);

  return { session, loading };
}
