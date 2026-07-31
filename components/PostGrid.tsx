'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { Post } from '@/lib/wordpress';

interface PostGridProps {
  posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
  const [visibleCount, setVisibleCount] = useState(6);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section className="px-6 sm:px-8 max-w-7xl mx-auto pb-20">
      {/* Asymmetric Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visiblePosts.map((post, idx) => {
          // Asymmetric layout logic: First card in the grid gets 2 columns span on large screens
          const isWideCard = idx === 0;

          return (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              className={`bg-white rounded-3xl p-6 border border-gray-200/80 shadow-soft hover:shadow-soft-lg group transition-all duration-300 flex flex-col justify-between ${
                isWideCard ? 'lg:col-span-2' : ''
              }`}
            >
              <div>
                {/* Image Container with Hover Zoom */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="block overflow-hidden rounded-2xl mb-6 relative aspect-[16/10] bg-gray-100"
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    src={post.featuredImage.url}
                    alt={post.featuredImage.altText || post.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {post.categories.map((cat, cIdx) => (
                      <span
                        key={cIdx}
                        className="bg-white/90 backdrop-blur-md text-[#111827] text-xs font-bold px-3 py-1 rounded-full border border-gray-200/50 shadow-sm"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </Link>

                {/* Article Meta */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <Link href={`/blog/${post.slug}`} className="group/title">
                  <h3
                    className={`font-bold text-[#111827] tracking-tight leading-snug mb-3 group-hover/title:text-lime-600 transition-colors ${
                      isWideCard ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                    }`}
                  >
                    {post.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              {/* Card Footer: Author & Action Button */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                  />
                  <span className="text-xs font-bold text-gray-800">{post.author.name}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={`Read ${post.title}`}
                  className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-[#BEF264] text-[#111827] flex items-center justify-center transition-all duration-200 group-hover:scale-105"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Pagination / Sleek Load More Button */}
      {hasMore && (
        <div className="mt-16 text-center">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border-2 border-[#111827] text-[#111827] font-bold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-soft"
          >
            <span>Load More Articles</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
