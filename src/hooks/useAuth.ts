import { useEffect, useState } from "react";

export function useAuth() {
  const [session, setSession] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return { session, loading };
}
