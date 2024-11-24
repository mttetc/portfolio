'use client';

import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useThemeStore } from '@/lib/stores/use-theme-store';

export function ThemeSwitcher() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 glass rounded-full"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.01)',
      }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 360,
          scale: isDark ? 1 : 1,
        }}
      >
        {isDark ? (
          <FiSun className="w-6 h-6 text-yellow-400" />
        ) : (
          <FiMoon className="w-6 h-6 text-blue-400" />
        )}
      </motion.div>
    </motion.button>
  );
}
