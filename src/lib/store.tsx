// lib/store.ts
import { create } from "zustand";

interface AppState {
  counter: number;
  increment: () => void;
  decrement: () => void;
}

export const useStore = create<AppState>((set) => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: state.counter - 1 })),
}));
