import { create } from "zustand";

interface TransitionConfig {
  duration: number;
  onExit?: () => void;
}

interface TransitionStore {
  isExiting: boolean;
  targetHref: string | null;
  config: TransitionConfig;
  stageExit: (href: string, config?: TransitionConfig) => void;
  completeExit: () => void;
}

export const useTransitionStore = create<TransitionStore>((set) => ({
  isExiting: false,
  targetHref: null,
  config: { duration: 0.3 },
  stageExit: (href, config) =>
    set({
      isExiting: true,
      targetHref: href,
      config: { ...{ duration: 0.3 }, ...config },
    }),
  completeExit: () => set({ isExiting: false, targetHref: null }),
}));
