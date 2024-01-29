"use client";

import { LogOut, Settings, User } from "lucide-react";
import { WidgetLink } from "./widget-link";
import { logout } from "@/functions/auth";
import { getUserProfile } from "@/functions/user";
import { Widget } from "./widget";
import { useEffect, useState } from "react";
import { Tables } from "@/schemas/database";

export function UserWidget() {
  const [profile, setProfile] = useState<Tables<"profiles">>();

  useEffect(() => {
    getUserProfile().then(setProfile);
  }, []);

  if (!profile) return <></>;

  return (
    <Widget title={profile.name} icon={User}>
      <WidgetLink
        href="/dashboard/settings/user"
        title="Account settings"
        icon={Settings}
      />

      <div className="border-b my-2"></div>

      <button
        onClick={logout}
        className={`hover:bg-orange-100 w-full rounded-md px-3 py-1 flex items-center gap-2 min-w-max`}
      >
        <LogOut className="w-3" />
        <span>Logout</span>
      </button>
    </Widget>
  );
}
