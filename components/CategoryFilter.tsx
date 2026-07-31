'use client';

import { motion } from 'motion/react';

interface CategoryFilterProps {
  categories: { id: string; name: string; slug: string }[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <section className="px-6 sm:px-8 max-w-7xl mx-auto py-6">
      <div className="flex items-center justify-between border-b border-gray-200/80 dark:border-neutral-800 pb-6 mb-8 flex-wrap gap-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
          Latest Publications
        </h2>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#111827]'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 border border-gray-200 dark:border-neutral-800'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBadge"
                    className="absolute inset-0 bg-[#BEF264] rounded-full shadow-soft"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
