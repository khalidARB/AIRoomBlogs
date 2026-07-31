'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostBySlug, getAllPosts, getCategories, getMenu, Post, Category, MenuItem } from '@/lib/wordpress';
import { motion } from 'motion/react';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Link as LinkIcon,
  Check,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export default function SingleArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<Post | undefined>(undefined);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [headerMenu, setHeaderMenu] = useState<MenuItem[]>([]);
  const [footerMenu, setFooterMenu] = useState<MenuItem[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      const [fetchedPost, postsList, fetchedCats, hMenu, fMenu] = await Promise.all([
        getPostBySlug(slug),
        getAllPosts(),
        getCategories(),
        getMenu('header'),
        getMenu('footer'),
      ]);
      setPost(fetchedPost);
      setAllPosts(postsList);
      setCategories(fetchedCats);
      setHeaderMenu(hMenu);
      setFooterMenu(fMenu);
      setLoading(false);
    }
    loadData();
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-[#F9FAFB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-[#BEF264] animate-spin"></div>
          <span className="text-sm font-semibold text-gray-600">Loading Article...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[100dvh] bg-[#F9FAFB] flex flex-col justify-between">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-40 text-center">
          <h1 className="text-4xl font-extrabold text-[#111827] mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The requested publication could not be found.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#BEF264] text-[#111827] font-bold px-6 py-3 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Filter "Read Next" posts (excluding current post)
  const readNextPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] flex flex-col justify-between">
      <Header navItems={headerMenu} />

      <main className="flex-grow pt-32 pb-24">
        {/* Top Breadcrumb Nav */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Publications</span>
          </Link>
        </div>

        {/* Minimalist Article Header */}
        <article className="max-w-6xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mb-10"
          >
            {/* Category Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {post.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-[#BEF264] text-[#111827] text-xs font-extrabold px-3.5 py-1 rounded-full"
                >
                  {cat.name}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#111827] leading-[1.08] tracking-tight mb-6">
              {post.title}
            </h1>

            {/* Brief Excerpt */}
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
              {post.excerpt}
            </p>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-soft-lg border border-gray-200/80 bg-gray-100"
          >
            <img
              src={post.featuredImage.url}
              alt={post.featuredImage.altText || post.title}
              className="w-full h-full object-cover rounded-3xl"
            />
          </motion.div>

          {/* Main Layout: Sticky Desktop Sidebar + Reading Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
            {/* Desktop Sticky Left Sidebar */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-32 flex flex-col gap-8 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-soft">
                {/* Author Information */}
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">{post.author.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">{post.author.role}</p>
                  </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                {/* Article Meta details */}
                <div className="space-y-3 text-xs text-gray-500 font-medium">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <Calendar className="w-4 h-4" /> Published
                    </span>
                    <span className="font-bold text-gray-800">{post.date}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-400">
                      <Clock className="w-4 h-4" /> Reading time
                    </span>
                    <span className="font-bold text-gray-800">{post.readTime}</span>
                  </div>
                </div>

                <div className="h-px bg-gray-100"></div>

                {/* Social Sharing Actions */}
                <div>
                  <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5" /> Share Publication
                  </h5>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Share on Twitter"
                      className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#BEF264] text-[#111827] flex items-center justify-center transition-all duration-200 hover:scale-105"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Share on LinkedIn"
                      className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#BEF264] text-[#111827] flex items-center justify-center transition-all duration-200 hover:scale-105"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    </a>
                    <button
                      onClick={handleCopyLink}
                      aria-label="Copy article link"
                      className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#BEF264] text-[#111827] flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-700" /> : <LinkIcon className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Reading Column (Narrow max 68ch UX) */}
            <div className="lg:col-span-9 max-w-[68ch]">
              <div
                className="prose prose-lg max-w-none text-[#111827] leading-relaxed font-normal"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* In-line Embedded Visual Element Showcase */}
              <div className="my-12 p-8 bg-white rounded-3xl border border-gray-200/80 shadow-soft">
                <div className="flex items-center gap-2 text-[#111827] font-bold text-sm mb-4">
                  <Sparkles className="w-4 h-4 text-[#BEF264]" /> Key Takeaway
                </div>
                <p className="text-gray-700 text-base leading-relaxed italic">
                  Headless architecture decoupled with Next.js provides complete autonomy over rendering performance, UI design systems, and SEO delivery while leveraging familiar authoring workflows in WordPress.
                </p>
              </div>

              {/* Bottom Newsletter / Promotion Soft Box */}
              <div className="mt-16 p-8 sm:p-10 bg-[#BEF264]/15 rounded-3xl border border-[#BEF264]/40 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827] mb-2">
                    Enjoyed this publication?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Subscribe to receive strategic articles straight to your inbox.
                  </p>
                </div>
                <Link
                  href="#newsletter"
                  className="bg-[#BEF264] hover:bg-[#a3e635] text-[#111827] font-extrabold text-sm px-6 py-3.5 rounded-full transition-all hover:scale-105 shadow-soft whitespace-nowrap"
                >
                  Subscribe Free
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Read Next Section */}
        {readNextPosts.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 sm:px-8 pt-24 mt-16 border-t border-gray-200/80">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
                Read Next
              </h2>
              <Link
                href="/"
                className="text-xs font-extrabold uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors"
              >
                View All Posts →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {readNextPosts.map((rPost) => (
                <div
                  key={rPost.id}
                  className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <Link
                      href={`/blog/${rPost.slug}`}
                      className="block overflow-hidden rounded-2xl mb-4 aspect-[16/10] bg-gray-100"
                    >
                      <img
                        src={rPost.featuredImage.url}
                        alt={rPost.title}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    <span className="bg-[#BEF264]/20 text-[#111827] text-xs font-extrabold px-3 py-1 rounded-full inline-block mb-3">
                      {rPost.categories[0]?.name || 'Article'}
                    </span>

                    <Link href={`/blog/${rPost.slug}`}>
                      <h3 className="font-bold text-[#111827] text-lg leading-snug group-hover:text-lime-600 transition-colors line-clamp-2 mb-2">
                        {rPost.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 text-xs line-clamp-2 mb-4">
                      {rPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="font-semibold">{rPost.author.name}</span>
                    <Link
                      href={`/blog/${rPost.slug}`}
                      aria-label={`Read ${rPost.title}`}
                      className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#BEF264] text-[#111827] flex items-center justify-center transition-all"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer navItems={footerMenu} categories={categories} />
    </div>
  );
}
