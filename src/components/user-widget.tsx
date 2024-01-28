"use client";

import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { WidgetLink } from "./widget-link";
import { logout } from "@/functions/auth";
import { getUserProfile } from "@/functions/user";
import { Tables } from "@/schemas/database";
import { usePathname } from "next/navigation";

export function UserWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<Tables<"profiles"> | undefined>();

  useEffect(() => {
    getUserProfile().then(setProfile);
  }, []);

  if (!profile) return <></>;

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="border rounded-md px-2 py-1 shadow-sm flex items-center gap-2 justify-between text-sm relative cursor-pointer min-w-max"
    >
      <div className="w-6 h-6 flex justify-center items-center rounded-md bg-zinc-100">
        <UserRound className="w-3 stroke-zinc-700" />
      </div>
      <span>{profile.name}</span>
      <ChevronDown
        className={`w-4 ml-2 ease-in-out transition-all ${
          isOpen && "rotate-180 "
        }`}
      />
      <div
        className={`absolute border rounded-md p-2 top-full mt-2 right-0 bg-white min-w-max transition-all ease-in-out invisible -translate-y-2 opacity-0 duration-200 ${
          isOpen && "!visible !translate-y-0 !opacity-100"
        }`}
      >
        <WidgetLink href="/dashboard/settings/user">
          <Settings className="w-3" />
          <span>Account settings</span>
        </WidgetLink>
        <div className="border-b my-2"></div>

        <button
          onClick={logout}
          className={`hover:bg-orange-100 w-full rounded-md px-3 py-1 flex items-center gap-2 min-w-max`}
        >
          <LogOut className="w-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
