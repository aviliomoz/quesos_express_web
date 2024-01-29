import { Logo } from "@/components/logo";
import { Navigation } from "@/components/navigation";
import { NotificationsWidget } from "@/components/notifications-widget";
import { RestaurantWidget } from "@/components/restaurant-widget";
import { SearchBar } from "@/components/search-bar";
import { UserWidget } from "@/components/user-widget";
import { ProfileStoreProvider } from "@/providers/profile-store-provider";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <ProfileStoreProvider>
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
      <main className="ml-60 mt-16 w-[calc(100%-240px)] p-6">{children}</main>
    </ProfileStoreProvider>
  );
}
