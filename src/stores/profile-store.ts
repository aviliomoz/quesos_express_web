import { create } from "zustand";

type ProfileStore = {
  profile: any;

  setProfile: (profile: any) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileStore>()((set) => ({
  profile: undefined,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: undefined }),
}));
