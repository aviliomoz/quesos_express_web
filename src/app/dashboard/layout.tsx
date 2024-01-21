import { Logo } from "@/components/logo";
import { Navigation } from "@/components/navigation";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <>
      <aside className="fixed top-0 left-0 w-60 border-r h-screen py-6 pl-8 pr-6">
        <Logo />
        <Navigation />
      </aside>
      <header className="fixed top-0 ml-60 w-[calc(100%-240px)] border-b h-16">
        {/* SearchBar (Inteligente)*/}
        {/* Widgets */}
      </header>
      <main className="ml-60 mt-16 w-[calc(100%-240px)] p-4">{children}</main>
    </>
  );
}
