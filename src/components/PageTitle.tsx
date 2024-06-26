import { useLocation } from "react-router-dom";
import { paths } from "../utils/consts";

export const PageTitle = () => {
  const location = useLocation();

  return (
    <h2 className="text-lg font-semibold">
      {paths.find((path) => location.pathname.includes(path.url))?.text}
    </h2>
  );
};
