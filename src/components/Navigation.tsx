import { NavigationLink } from "./NavigationLink";
import { paths } from "../utils/consts";

export const Navigation = () => {
  return (
    <ul className="mt-4 flex flex-col gap-1 h-full">
      {paths.map((path) => (
        <NavigationLink key={path.url} path={path} />
      ))}
    </ul>
  );
};
