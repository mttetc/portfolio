'use client';

import { motion } from 'motion/react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useThemeStore } from '@/lib/stores/use-theme-store';
import { useEffect } from 'react';

export function ThemeSwitcher() {
  const theme = useThemeStore(state => state.theme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);

  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 glass rounded-full"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.01)',
      }}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 360,
        }}
      >
        {isDark ? (
          <FiSun className="w-6 h-6 text-yellow-400" aria-hidden="true" />
        ) : (
          <FiMoon className="w-6 h-6 text-blue-400" aria-hidden="true" />
        )}
      </motion.div>
      <span className="sr-only">{isDark ? 'Switch to light theme' : 'Switch to dark theme'}</span>
    </motion.button>
  );
}
