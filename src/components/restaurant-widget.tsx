"use client";

import { getRestaurantById } from "@/functions/restaurants";
import {
  ArrowLeftRight,
  ChevronDown,
  Settings,
  Squircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  id: string;
};

export function RestaurantWidget({ id }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [restaurant, setRestaurant] = useState<{ id: string; name: string }>();

  useEffect(() => {
    getRestaurantById(id).then(setRestaurant);
  }, []);

  if (!restaurant) return <></>;

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="border rounded-md px-3 py-1.5 mt-4 mb-4 text-sm w-full flex justify-between items-center relative"
    >
      <div className="flex items-center gap-2">
        <Squircle className="w-3 stroke-orange-500" />
        <span>Mezqal</span>
      </div>
      <ChevronDown
        className={`w-4 transition-all ease-in-out ${isOpen && "rotate-180"}`}
      />
      {isOpen && (
        <div className="absolute z-40 border rounded-md bg-white p-2 top-full mt-2 left-0 w-full flex min-w-max flex-col">
          <WidgetLink href={`/dashboard/restaurants/${id}/settings/restaurant`}>
            <Settings className="w-3" />
            <span>Restaurant settings</span>
          </WidgetLink>
          <WidgetLink href={`/dashboard/restaurants/${id}/settings/team`}>
            <Users className="w-3" />
            <span>Team settings</span>
          </WidgetLink>
          <div className="border-b my-2"></div>
          <WidgetLink href="/dashboard/restaurants">
            <ArrowLeftRight className="w-3" />
            <span>Change restaurant</span>
          </WidgetLink>
        </div>
      )}
    </button>
  );
}

type LinkProps = {
  children: React.ReactNode;
  href: string;
};

function WidgetLink({ href, children }: LinkProps) {
  return (
    <Link
      href={href}
      className="hover:bg-zinc-100 w-full text-start rounded-md px-3 py-1 flex items-center gap-2 min-w-max"
    >
      {children}
    </Link>
  );
}
