import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostGrid from '@/components/PostGrid';
import {
  getCategories,
  getCategoryBySlug,
  getPostsByCategory,
  getAllPosts,
  getMenu,
} from '@/lib/wordpress';
import { ArrowLeft, Tag, Layers } from 'lucide-react';

export const revalidate = 60; // ISR revalidation every 60 seconds

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories
    .filter((c) => c.slug !== 'all')
    .map((cat) => ({
      slug: cat.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    return {
      title: 'Category Not Found — AiRooms',
    };
  }

  return {
    title: `${category.name} Articles — AiRooms`,
    description: `Explore all strategic articles and publications tagged under ${category.name} on AiRooms.`,
  };
}

export default async function CategoryArchivePage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const [category, posts, allPosts, categories, headerMenu, footerMenu] = await Promise.all([
    getCategoryBySlug(slug),
    getPostsByCategory(slug),
    getAllPosts(),
    getCategories(),
    getMenu('header'),
    getMenu('footer'),
  ]);

  if (!category && posts.length === 0) {
    return (
      <div className="min-h-[100dvh] bg-[#F9FAFB] dark:bg-[#0A0A0A] flex flex-col justify-between">
        <Header navItems={headerMenu} posts={allPosts} />
        <div className="max-w-4xl mx-auto px-6 py-40 text-center">
          <h1 className="text-4xl font-extrabold text-[#111827] dark:text-white mb-4">Category Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The requested category archive could not be found.</p>
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

  const categoryName = category?.name || slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] dark:bg-[#0A0A0A] flex flex-col justify-between">
      <Header navItems={headerMenu} posts={allPosts} />

      <main className="flex-grow pt-32 pb-24">
        {/* Category Header Banner */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-12">
          {/* Breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Publications</span>
          </Link>

          <div className="bg-white dark:bg-neutral-900 p-8 sm:p-12 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft relative overflow-hidden">
            {/* Ambient accent background blur */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#BEF264]/20 dark:bg-[#BEF264]/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>

            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#BEF264] text-[#111827] text-xs font-extrabold px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs">
                  <Tag className="w-3.5 h-3.5" /> Category Archive
                </span>
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full border border-gray-200/60 dark:border-neutral-700 inline-flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> {posts.length} {posts.length === 1 ? 'Publication' : 'Publications'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] dark:text-white leading-tight tracking-tight mb-4">
                {categoryName}
              </h1>

              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                Exploring all strategic publications, technical guides, and architectural insights filed under <strong className="text-[#111827] dark:text-white">{categoryName}</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Category Articles Post Grid */}
        <PostGrid posts={posts} />
      </main>

      <Footer navItems={footerMenu} categories={categories} />
    </div>
  );
}
