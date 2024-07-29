import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  icon: LucideIcon;
  children: string;
  url: string;
};

export const TableOptionsLink = ({ icon: Icon, children, url }: Props) => {
  return (
    <Link
      to={url}
      className="flex items-center gap-2 min-w-max hover:bg-gray-100 px-2 py-1 rounded-md"
    >
      <Icon className="w-4" />
      {children}
    </Link>
  );
};
