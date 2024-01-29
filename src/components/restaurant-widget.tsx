"use client";

import { getRestaurantById } from "@/functions/restaurants";
import { ArrowLeftRight, Store } from "lucide-react";
import { WidgetLink } from "./widget-link";
import { Widget } from "./widget";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tables } from "@/schemas/database";

export function RestaurantWidget() {
  const { restaurant_id } = useParams<{ restaurant_id: string }>();
  const [restaurant, setRestaurant] = useState<Tables<"restaurants">>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    restaurant_id &&
      getRestaurantById(restaurant_id)
        .then(setRestaurant)
        .finally(() => setLoading(false));
  }, [restaurant_id]);

  if (!restaurant_id || !restaurant || loading) return <></>;

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
