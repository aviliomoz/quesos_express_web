import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  text: string;
  icon?: LucideIcon;
  url: string;
};

export const GradientLink = ({ text, icon: Icon, url }: Props) => {
  return (
    <Link
      to={url}
      className="bg-dark-gradient text-white text-sm px-3 py-1 rounded-md flex items-center gap-3"
    >
      {Icon && <Icon className="w-4 stroke-white" />}
      <p>{text}</p>
    </Link>
  );
};
