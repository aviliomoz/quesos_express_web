import { Logo } from "./logo";
import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation";
import { SearchBar } from "./search-bar";
import { RestaurantWidget } from "./restaurant-widget";
import { UserWidget } from "./user-widget";
import { NotificationsWidget } from "./notifications-widget";

export const AppLayout = () => {
  return (
    <>
      <aside className="fixed top-0 left-0 w-60 border-r h-screen">
        <div className="border-b h-16 px-6 flex items-center">
          <Logo />
        </div>
        <div className="px-6 py-2">
          <Navigation />
        </div>
      </aside>
      <header className="fixed top-0 ml-60 w-[calc(100%-240px)] border-b h-16 flex items-center justify-between px-6">
        <SearchBar />
        <div className="flex items-center gap-4">
          <RestaurantWidget />
          <UserWidget />
          <NotificationsWidget />
        </div>
      </header>
      <main className="ml-60 mt-16 w-[calc(100%-240px)] p-6">
        <Outlet />
      </main>
    </>
  );
};
