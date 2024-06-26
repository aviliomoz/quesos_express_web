import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "/logo.png";

export function Logo() {
  const { user } = useAuth();

  return (
    <Link
      to={user ? "/products" : "/"}
      className="flex items-center gap-2 w-full justify-center"
    >
      <img src={logo} width={110} height={110} />
    </Link>
  );
}
