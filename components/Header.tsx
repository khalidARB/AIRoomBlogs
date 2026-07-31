'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, X, Search, ArrowUpRight } from 'lucide-react';
import { MenuItem, Post, MOCK_HEADER_MENU } from '@/lib/wordpress';
import SearchModal from '@/components/SearchModal';

interface HeaderProps {
  navItems?: MenuItem[];
  posts?: Post[];
}

export default function Header({ navItems = MOCK_HEADER_MENU, posts }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-header py-4 border-b border-gray-200/50 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-[#BEF264] flex items-center justify-center font-extrabold text-[#111827] text-base shadow-soft group-hover:scale-105 transition-transform duration-200">
              Ai
            </span>
            <span className="font-extrabold text-xl tracking-tight text-[#111827]">
              Ai<span className="text-[#111827]">Rooms</span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#BEF264] ml-1"></span>
            </span>
          </Link>

          {/* Desktop Navigation - Managed via WP Dashboard */}
          <nav className="hidden md:flex items-center gap-8 bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-gray-200/60 shadow-soft">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.url || '#'}
                className="relative text-sm font-medium text-gray-700 hover:text-[#111827] transition-colors py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#BEF264] transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Instant Search Trigger */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setSearchModalOpen(true)}
              aria-label="Search articles"
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 font-medium text-xs px-4 py-2.5 rounded-full border border-gray-200 shadow-soft transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <Search className="w-4 h-4 text-gray-400" />
              <span>Search articles...</span>
              <kbd className="hidden lg:inline-block bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-500">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Mobile Right Controls: Search Icon + Hamburger Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setSearchModalOpen(true)}
              aria-label="Search articles"
              className="w-11 h-11 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-900 shadow-soft active:scale-95 transition-transform"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="w-11 h-11 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-900 shadow-soft active:scale-95 transition-transform"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#F9FAFB]/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={item.url || '#'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-extrabold text-[#111827] hover:text-lime-600 transition-colors flex items-center justify-between border-b border-gray-200/60 pb-4"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-6 h-6 text-gray-400" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchModalOpen(true);
                }}
                className="w-full bg-white border border-gray-200 text-[#111827] font-bold text-center py-4 rounded-2xl shadow-soft text-base flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span>Search Publications</span>
              </button>
              <p className="text-xs text-center text-gray-500">
                © 2026 AiRooms. WordPress Headless Architecture.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        posts={posts}
      />
    </>
  );
}
