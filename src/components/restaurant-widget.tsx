"use client";

import { ArrowLeftRight, Store } from "lucide-react";
import { WidgetLink } from "./widget-link";
import { Widget } from "./widget";
import { useRestaurantStore } from "@/stores/restaurant-store";
import { useParams } from "next/navigation";

export function RestaurantWidget() {
  const { restaurant_id } = useParams();
  const { restaurant } = useRestaurantStore();

  if (!restaurant_id || !restaurant) return <></>;

  return (
    <Widget title={restaurant.name} icon={Store}>
      <div className="py-4 text-center">Info del plan</div>
      <div className="border-b my-2"></div>
      <WidgetLink
        href="/dashboard/restaurants"
        title="Change restaurant"
        icon={ArrowLeftRight}
      />
    </Widget>
  );
}
