import { Logo } from "./Logo";
import { AuthButtons } from "./auth/AuthButtons";

export const LandingHeader = () => {
  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-16 md:px-32 border-b w-full">
      <Logo />
      <AuthButtons />
    </header>
  );
};
