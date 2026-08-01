import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShareButtons from '@/components/ShareButtons';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import TableOfContents from '@/components/TableOfContents';
import ArticleBody from '@/components/ArticleBody';
import NewsletterBox from '@/components/NewsletterBox';
import { getPostBySlug, getAllPosts, getCategories, getMenu, slugify } from '@/lib/wordpress';
import { Calendar, Clock, ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';

export const revalidate = 60; // ISR revalidation every 60 seconds

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Article Not Found — AiRooms',
    };
  }

  return {
    title: `${post.title} — AiRooms`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.featuredImage.url }],
    },
  };
}

export default async function SingleArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const [post, allPosts, categories, headerMenu, footerMenu] = await Promise.all([
    getPostBySlug(slug),
    getAllPosts(),
    getCategories(),
    getMenu('header'),
    getMenu('footer'),
  ]);

  if (!post) {
    return (
      <div className="min-h-[100dvh] bg-[#F9FAFB] dark:bg-[#0A0A0A] flex flex-col justify-between">
        <Header navItems={headerMenu} posts={allPosts} />
        <div className="max-w-4xl mx-auto px-6 py-40 text-center">
          <h1 className="text-4xl font-extrabold text-[#111827] dark:text-white mb-4">Article Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The requested publication could not be found.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#BEF264] text-[#111827] font-bold px-6 py-3 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
        <Footer navItems={footerMenu} categories={categories} />
      </div>
    );
  }

  // Filter "Read Next" posts (excluding current post)
  const readNextPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] dark:bg-[#0A0A0A] flex flex-col justify-between">
      {/* Scroll Progress Indicator Bar */}
      <ReadingProgressBar />

      <Header navItems={headerMenu} posts={allPosts} />

      <main className="flex-grow pt-32 pb-24">
        {/* Top Breadcrumb Nav */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Publications</span>
          </Link>
        </div>

        {/* Minimalist Article Header */}
        <article className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-5xl mb-10">
            {/* Category Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {post.categories.map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/category/${cat.slug}`}
                  className="bg-[#BEF264] text-[#111827] text-xs font-extrabold px-3.5 py-1 rounded-full shadow-xs hover:scale-105 transition-transform"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#111827] dark:text-white leading-[1.08] tracking-tight mb-6">
              {post.title}
            </h1>

            {/* Brief Excerpt */}
            <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Featured Image */}
          <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-soft-lg border border-gray-200/80 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-900">
            <img
              src={post.featuredImage.url}
              alt={post.featuredImage.altText || post.title}
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>

          {/* Main Layout: Sticky Desktop Sidebar + Reading Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
            {/* Desktop Sticky Left Sidebar (Author + Table of Contents + Social Share) */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 flex flex-col gap-6">
                {/* Author Information Card */}
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft flex flex-col gap-4">
                  <Link
                    href={`/author/${slugify(post.author.name)}`}
                    className="flex items-center gap-3 group/author"
                  >
                    <img
                      src={post.author.avatarUrl}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 dark:border-neutral-800 shadow-sm group-hover/author:scale-105 transition-transform"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#111827] dark:text-white group-hover/author:text-lime-500 transition-colors">
                        {post.author.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{post.author.role}</p>
                    </div>
                  </Link>

                  <div className="h-px bg-gray-100 dark:bg-neutral-800"></div>

                  {/* Article Meta details */}
                  <div className="space-y-2.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                        <Calendar className="w-4 h-4" /> Published
                      </span>
                      <span className="font-bold text-gray-800 dark:text-gray-200">{post.date}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                        <Clock className="w-4 h-4" /> Reading time
                      </span>
                      <span className="font-bold text-gray-800 dark:text-gray-200">{post.readTime}</span>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 dark:bg-neutral-800"></div>

                  {/* Social Sharing Actions */}
                  <ShareButtons title={post.title} />
                </div>

                {/* Table of Contents Sticky Component */}
                <TableOfContents content={post.content} />
              </div>
            </aside>

            {/* Reading Column */}
            <div className="lg:col-span-8 w-full">
              <ArticleBody content={post.content} />

              {/* In-line Embedded Visual Element Showcase */}
              <div className="my-12 p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft">
                <div className="flex items-center gap-2 text-[#111827] dark:text-white font-bold text-sm mb-4">
                  <Sparkles className="w-4 h-4 text-[#BEF264]" /> Key Takeaway
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed italic">
                  Headless architecture decoupled with Next.js provides complete autonomy over rendering performance, UI design systems, and SEO delivery while leveraging familiar authoring workflows in WordPress.
                </p>
              </div>

              {/* Bottom Newsletter / Promotion Soft Box */}
              <NewsletterBox />
            </div>
          </div>
        </article>

        {/* Read Next Section */}
        {readNextPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-24 mt-16 border-t border-gray-200/80 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white">
                Read Next
              </h2>
              <Link
                href="/"
                className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                View All Posts →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {readNextPosts.map((rPost) => (
                <div
                  key={rPost.id}
                  className="bg-white dark:bg-neutral-900 rounded-3xl p-5 border border-gray-200/80 dark:border-neutral-800 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <Link
                      href={`/blog/${rPost.slug}`}
                      className="block overflow-hidden rounded-2xl mb-4 aspect-[16/10] bg-gray-100 dark:bg-neutral-800"
                    >
                      <img
                        src={rPost.featuredImage.url}
                        alt={rPost.title}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    <span className="bg-[#BEF264]/20 text-[#111827] dark:text-[#BEF264] text-xs font-extrabold px-3 py-1 rounded-full inline-block mb-3">
                      {rPost.categories[0]?.name || 'Article'}
                    </span>

                    <Link href={`/blog/${rPost.slug}`}>
                      <h3 className="font-bold text-[#111827] dark:text-white text-lg leading-snug group-hover:text-lime-500 transition-colors line-clamp-2 mb-2">
                        {rPost.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2 mb-4">
                      {rPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{rPost.author.name}</span>
                    <Link
                      href={`/blog/${rPost.slug}`}
                      aria-label={`Read ${rPost.title}`}
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-800 group-hover:bg-[#BEF264] text-[#111827] dark:text-white dark:group-hover:text-[#111827] flex items-center justify-center transition-all"
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
