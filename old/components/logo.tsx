import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import logo from '/logo.png';

export function Logo() {
  const { session, loading } = useAuth();

  if (loading) return <></>;

  return (
    <div className="flex items-center gap-2">
      <img src={logo} width={23} height={23}/>
      <Link
        to={session ? "/home" : "/"}
        className="text-lg font-bold"
      >
        Datagrill
      </Link>
    </div>
  );
}
