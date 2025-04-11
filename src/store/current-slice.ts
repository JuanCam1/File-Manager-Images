import type { StateCreator } from "zustand";


export interface ImageItemSlice {
  searchTerm: string;
  debouncedSearchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  setDebouncedSearchTerm: (debouncedSearchTerm: string) => void;
}


export const createImageSlice: StateCreator<ImageItemSlice> =
  (set) => ({
    searchTerm: "",
    debouncedSearchTerm: "",
    setSearchTerm: (searchTerm: string) => set({ searchTerm }),
    setDebouncedSearchTerm: (debouncedSearchTerm: string) => set({ debouncedSearchTerm }),
  });