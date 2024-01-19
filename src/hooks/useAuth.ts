import { useEffect, useState } from "react";

export function useAuth() {
  const [session, setSession] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setSession(false);
    setLoading(false);
  }, []);

  return { session, loading };
}
