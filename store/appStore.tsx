import { create } from "zustand"

export interface AppState {
  selectedFeature: number | null
  setSelectedFeature: (feature: number) => void

  loggedIn: string | null
  setLoggedIn: (loggedIn: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedFeature: null,
  setSelectedFeature: (feature) => set({ selectedFeature: feature }),

  loggedIn: null,
  setLoggedIn: (loggedIn) => set({ loggedIn: loggedIn }),
}))
