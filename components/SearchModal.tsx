'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Clock, ArrowUpRight, FileText } from 'lucide-react';
import { Post, MOCK_POSTS } from '@/lib/wordpress';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts?: Post[];
}

export default function SearchModal({ isOpen, onClose, posts = MOCK_POSTS }: SearchModalProps) {
  const [query, setQuery] = useState('');

  // Handle ESC key and Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset query on close
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  const filteredPosts = query.trim() === ''
    ? posts.slice(0, 4)
    : posts.filter((post) => {
        const q = query.toLowerCase();
        const titleMatch = post.title.toLowerCase().includes(q);
        const excerptMatch = post.excerpt.toLowerCase().includes(q);
        const categoryMatch = post.categories.some((c) => c.name.toLowerCase().includes(q));
        const authorMatch = post.author.name.toLowerCase().includes(q);
        return titleMatch || excerptMatch || categoryMatch || authorMatch;
      });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden z-10 flex flex-col max-h-[80vh]"
          >
            {/* Search Header Bar */}
            <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-neutral-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0 ml-1" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search publications by title, category, or keyword..."
                autoFocus
                className="w-full text-base sm:text-lg font-medium text-[#111827] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-transparent focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search input"
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                aria-label="Close search modal"
                className="hidden sm:flex items-center gap-1 text-xs font-semibold text-gray-400 dark:text-gray-400 bg-gray-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md border border-gray-200 dark:border-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Instant Search Results Container */}
            <div className="p-4 sm:p-6 overflow-y-auto divide-y divide-gray-100 dark:divide-neutral-800 flex-grow">
              <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 px-2">
                {query.trim() === '' ? 'Suggested Articles' : `Search Results (${filteredPosts.length})`}
              </div>

              {filteredPosts.length > 0 ? (
                <div className="space-y-3 pt-2">
                  {filteredPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      onClick={onClose}
                      className="group flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-neutral-800/80 transition-all duration-200 border border-transparent hover:border-gray-200/80 dark:hover:border-neutral-700"
                    >
                      <img
                        src={post.featuredImage.url}
                        alt={post.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 bg-gray-100 dark:bg-neutral-800"
                      />
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="bg-[#BEF264] text-[#111827] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                            {post.categories[0]?.name || 'Article'}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-gray-400 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3" /> {post.readTime}
                          </span>
                        </div>

                        <h4 className="font-bold text-[#111827] dark:text-white text-sm sm:text-base leading-snug group-hover:text-lime-500 transition-colors truncate">
                          {post.title}
                        </h4>

                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="self-center p-2 rounded-full group-hover:bg-[#BEF264] text-gray-400 group-hover:text-[#111827] transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-3">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-[#111827] dark:text-white text-base mb-1">No articles found</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                    We couldn&apos;t find any publications matching &quot;{query}&quot;. Try searching another term or category.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-gray-50 dark:bg-neutral-950 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 px-6">
              <span className="flex items-center gap-1.5">
                Press <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded font-mono text-[10px] text-gray-600 dark:text-gray-300 shadow-xs">ESC</kbd> to exit
              </span>
              <span className="flex items-center gap-1.5">
                Powered by <strong className="text-gray-700 dark:text-gray-300 font-semibold">AiRooms Search</strong>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
