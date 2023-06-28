import { create } from "zustand";

export type SortOptionStore = {
  sortOption: string;
  setSortOption: (value: string) => void;
};

export const useSortOptionStore = create<SortOptionStore>((set) => ({
  sortOption: "",
  setSortOption: (value: string) => set({ sortOption: value }),
}));
