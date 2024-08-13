import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Logo } from "../components/Logo";
import { Navigation } from "../components/Navigation";
import { LogoutButton } from "../components/auth/LogoutButton";
import { Loading } from "../components/ui/Loading";
import { UserWidget } from "../components/auth/UserWidget";
import { PageTitle } from "../components/PageTitle";

export const AppLayout = () => {
  const { user, validating } = useAuth();

  if (validating)
    return (
      <main className="w-full h-screen flex justify-center items-center">
        <Loading />
      </main>
    );

  if (!user) return <Navigate to={"/"} />;

  return (
    <>
      <aside className="fixed top-0 left-0 w-60 border-r h-screen py-4 flex flex-col justify-between px-6">
        <div>
          <Logo />
          <Navigation />
        </div>
        <LogoutButton />
      </aside>
      <header className="fixed top-0 ml-60 w-[calc(100%-240px)] border-b h-16 flex items-center justify-between px-6 bg-white z-20">
        <PageTitle />
        <UserWidget />
      </header>
      <main className="ml-60 mt-16 w-[calc(100%-240px)] p-6">
        <Outlet />
      </main>
    </>
  );
};
