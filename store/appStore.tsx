import { create } from "zustand"

export interface AppState {
  selectedFeature: number | null
  setSelectedFeature: (feature: number) => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedFeature: null,
  setSelectedFeature: (feature) => set({ selectedFeature: feature }),
}))
