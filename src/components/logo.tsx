import { Link } from "react-router-dom";
import logo from "/logo.png";
import { useAuth } from "../contexts/AuthContext";

export function Logo() {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-2 w-full">
      <img src={logo} width={23} height={23} />
      <Link to={user ? "/home" : "/"} className="text-lg font-bold">
        Quesos Express
      </Link>
    </div>
  );
}
