import { Tables } from "@/schemas/database";
import { create } from "zustand";

type ProfileStore = {
  profile: Tables<"profiles"> | undefined;

  setProfile: (profile: Tables<"profiles">) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileStore>()((set) => ({
  profile: undefined,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: undefined }),
}));
