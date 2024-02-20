import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export function Logo() {
  const { session, loading } = useAuth();

  if (loading) return <></>;

  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-md border border-orange-200 bg-orange-500"></div>
      <Link
        to={session ? "/home" : "/"}
        className="text-lg font-bold"
      >
        Datagrill
      </Link>
    </div>
  );
}
