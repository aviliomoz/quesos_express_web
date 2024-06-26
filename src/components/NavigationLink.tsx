import { Link, useLocation } from "react-router-dom";
import { NavigationPath } from "../types";

type Props = {
  path: NavigationPath;
};

export const NavigationLink = ({ path }: Props) => {
  const location = useLocation();

  return (
    <Link
      to={path.url}
      className={`flex items-center gap-3 px-3 py-1.5 rounded-md ${
        location.pathname.includes(path.url)
          ? "bg-dark-gradient text-white"
          : "hover:bg-gray-100"
      }`}
    >
      <path.icon className="w-4" />
      <p className="text-sm">{path.text}</p>
    </Link>
  );
};
