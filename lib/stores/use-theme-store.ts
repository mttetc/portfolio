import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      isDark: true,
      toggleTheme: () =>
        set(state => {
          const isDark = !state.isDark;
          document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
          return { isDark };
        }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
