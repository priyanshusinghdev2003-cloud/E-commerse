import { create } from "zustand";

export const useProductStore = create((set) => ({
  randomProduct: null,
  getRandomProduct: (product) => set({ randomProduct: product }),
}));
