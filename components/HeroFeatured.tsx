'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { Post } from '@/lib/wordpress';

interface HeroFeaturedProps {
  post: Post;
}

export default function HeroFeatured({ post }: HeroFeaturedProps) {
  return (
    <section className="pt-32 pb-12 px-6 sm:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-10 md:p-12 border border-gray-200/80 dark:border-neutral-800 shadow-soft-lg group hover:border-gray-300 dark:hover:border-neutral-700 transition-all duration-300 relative overflow-hidden"
      >
        {/* Subtle accent backdrop blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#BEF264]/20 dark:bg-[#BEF264]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column: Metadata & Typography */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Category Pill & Featured Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-[#BEF264] text-[#111827] text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                  Featured
                </span>
                {post.categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 dark:border-neutral-700"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>

              {/* Title */}
              <Link href={`/blog/${post.slug}`} className="group/title">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] dark:text-white leading-[1.1] tracking-tight mb-6 group-hover/title:text-lime-500 transition-colors">
                  {post.title}
                </h1>
              </Link>

              {/* Excerpt */}
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                {post.excerpt}
              </p>
            </div>

            {/* Author Meta & Action */}
            <div className="pt-6 border-t border-gray-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatarUrl}
                  alt={post.author.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white dark:border-neutral-700 shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#111827] dark:text-white">{post.author.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                  {post.readTime}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={`Read article: ${post.title}`}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-[#BEF264] text-[#111827] dark:text-white dark:hover:text-[#111827] flex items-center justify-center transition-all duration-200 hover:scale-110 ml-2"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Rounded Image */}
          <div className="lg:col-span-5 relative">
            <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-2xl sm:rounded-3xl shadow-md">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-[4/3] w-full relative bg-gray-100 overflow-hidden"
              >
                <img
                  src={post.featuredImage.url}
                  alt={post.featuredImage.altText || post.title}
                  className="w-full h-full object-cover rounded-2xl sm:rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
