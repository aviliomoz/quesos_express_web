import { AuthButtons } from "./auth-buttons";
import { Logo } from "./logo";

export const LandingHeader = () => {
  return (
    <header className="h-16 flex items-center justify-between px-32 border-b relative">
      <Logo />
      <AuthButtons />
    </header>
  );
}
