import { create } from "zustand";

type RestaurantStore = {
  restaurant: any;

  setRestaurant: (restaurant: any) => void;
  clearRestaurant: () => void;
};

export const useRestaurantStore = create<RestaurantStore>()((set) => ({
  restaurant: undefined,

  setRestaurant: (restaurant) => set({ restaurant }),
  clearRestaurant: () => set({ restaurant: undefined }),
}));
