"use client";

import { getRestaurantById } from "@/functions/restaurants";
import { ArrowLeftRight, ChevronDown, Store } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { WidgetLink } from "./widget-link";

export function RestaurantWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { restaurant_id } = useParams<{ restaurant_id: string }>();
  const [restaurant, setRestaurant] = useState<{ id: string; name: string }>();

  useEffect(() => {
    getRestaurantById(restaurant_id).then(setRestaurant);
  }, [restaurant_id]);

  if (!restaurant_id || !restaurant) return <></>;

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="border rounded-md px-2 py-1 mt-4 mb-4 text-sm w-full flex justify-between items-center relative shadow-sm min-w-max"
    >
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 flex justify-center items-center rounded-md bg-zinc-100">
          <Store className="w-3 stroke-zinc-700" />
        </div>
        <span>Mezqal</span>
      </div>
      <ChevronDown
        className={`w-4 ml-4 transition-all ease-in-out ${
          isOpen && "rotate-180"
        }`}
      />
      <div
        className={`absolute z-40 border rounded-md bg-white p-2 top-full mt-2 right-0 w-full flex min-w-max flex-col transition-all -translate-y-2 opacity-0 invisible ease-in-out duration-200 ${
          isOpen && "!visible !opacity-100 !translate-y-0"
        }`}
      >
        <div className="py-4">Info del plan</div>
        <div className="border-b my-2"></div>
        <WidgetLink href="/dashboard/restaurants">
          <ArrowLeftRight className="w-3" />
          <span>Change restaurant</span>
        </WidgetLink>
      </div>
    </button>
  );
}
