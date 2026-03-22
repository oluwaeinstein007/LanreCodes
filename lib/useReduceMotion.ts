import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ReduceMotionStore = {
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
};

export const useReduceMotionStore = create<ReduceMotionStore>()(
  persist(
    (set, get) => ({
      reduceMotion: false,
      toggleReduceMotion: () => set({ reduceMotion: !get().reduceMotion }),
    }),
    { name: 'reduce-motion' }
  )
);
