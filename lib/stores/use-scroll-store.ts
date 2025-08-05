import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

interface ScrollState {
  activeHash: string;
  setActiveHash: (hash: string) => void;
}

export const useScrollStore = createWithEqualityFn<ScrollState>(
  set => ({
    activeHash: '',
    setActiveHash: (hash: string) => set({ activeHash: hash }),
  }),
  shallow
);
