'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-soft" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 text-[#111827] dark:text-white border border-gray-200 dark:border-neutral-800 flex items-center justify-center shadow-soft hover:shadow-soft-lg transition-all duration-200 cursor-pointer"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'light' ? (
          <Moon className="w-4 h-4 text-gray-700 hover:text-gray-900" />
        ) : (
          <Sun className="w-4 h-4 text-[#BEF264]" />
        )}
      </motion.div>
    </motion.button>
  );
}
