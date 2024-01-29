import { Tables } from "@/schemas/database";
import { create } from "zustand";

type RestaurantStore = {
  restaurant: Tables<"restaurants"> | undefined;

  setRestaurant: (restaurant: Tables<"restaurants">) => void;
  clearRestaurant: () => void;
};

export const useRestaurantStore = create<RestaurantStore>()((set) => ({
  restaurant: undefined,

  setRestaurant: (restaurant) => set({ restaurant }),
  clearRestaurant: () => set({ restaurant: undefined }),
}));
