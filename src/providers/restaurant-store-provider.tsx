"use client";

import { getRestaurantById } from "@/functions/restaurants";
import { useRestaurantStore } from "@/stores/restaurant-store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const RestaurantStoreProvider = ({ children }: Props) => {
  const { restaurant_id } = useParams<{ restaurant_id: string }>();
  const { setRestaurant } = useRestaurantStore();

  return children;
};
