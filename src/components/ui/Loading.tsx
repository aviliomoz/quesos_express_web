import { dotPulse } from "ldrs";

export const Loading = () => {
  dotPulse.register();

  return <l-dot-pulse color={"#d1d5db"}></l-dot-pulse>;
};
