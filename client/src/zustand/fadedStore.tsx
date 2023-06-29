import { create } from "zustand";

export type IncreaseDecreaseStore = {
  increaseStylesClass: string;
  setIncreaseStylesClass: (value: string) => void;
  decreaseStylesClass: string;
  setDecreaseStylesClass: (value: string) => void;
};

export const useIncreaseDecreaseStore = create<IncreaseDecreaseStore>(
  (set) => ({
    increaseStylesClass: "",
    setIncreaseStylesClass: (value: string) =>
      set({ increaseStylesClass: value }),
    decreaseStylesClass: "",
    setDecreaseStylesClass: (value: string) =>
      set({ increaseStylesClass: value }),
  })
);
