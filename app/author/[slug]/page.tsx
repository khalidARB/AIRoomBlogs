import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostGrid from '@/components/PostGrid';
import {
  getAuthorBySlug,
  getPostsByAuthor,
  getAllPosts,
  getCategories,
  getMenu,
  slugify,
} from '@/lib/wordpress';
import { ArrowLeft, UserCheck, BookOpen, Share2 } from 'lucide-react';

export const revalidate = 60; // ISR revalidation every 60 seconds

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const authors = Array.from(new Set(posts.map((p) => slugify(p.author.name))));
  return authors.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const author = await getAuthorBySlug(resolvedParams.slug);

  if (!author) {
    return {
      title: 'Author Not Found — AiRooms',
    };
  }

  return {
    title: `${author.name} — Author Profile — AiRooms`,
    description: author.bio,
    openGraph: {
      title: `${author.name} on AiRooms`,
      description: author.bio,
      images: [{ url: author.avatarUrl }],
    },
  };
}

export default async function AuthorArchivePage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const [author, posts, allPosts, categories, headerMenu, footerMenu] = await Promise.all([
    getAuthorBySlug(slug),
    getPostsByAuthor(slug),
    getAllPosts(),
    getCategories(),
    getMenu('header'),
    getMenu('footer'),
  ]);

  if (!author && posts.length === 0) {
    return (
      <div className="min-h-[100dvh] bg-[#F9FAFB] dark:bg-[#0A0A0A] flex flex-col justify-between">
        <Header navItems={headerMenu} posts={allPosts} />
        <div className="max-w-4xl mx-auto px-6 py-40 text-center">
          <h1 className="text-4xl font-extrabold text-[#111827] dark:text-white mb-4">Author Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The requested author profile could not be found.</p>
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

  const authorName = author?.name || slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  const avatarUrl = author?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200';
  const role = author?.role || 'Author & Contributor';
  const bio = author?.bio || `Writing strategic articles on software architecture, design engineering, and web performance at AiRooms.`;

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] dark:bg-[#0A0A0A] flex flex-col justify-between">
      <Header navItems={headerMenu} posts={allPosts} />

      <main className="flex-grow pt-32 pb-24">
        {/* Author Profile Banner */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-12">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Publications</span>
          </Link>

          <div className="bg-white dark:bg-neutral-900 p-8 sm:p-12 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft relative overflow-hidden">
            {/* Ambient accent background blur */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#BEF264]/20 dark:bg-[#BEF264]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 relative z-10">
              {/* Large Author Avatar */}
              <div className="relative shrink-0">
                <img
                  src={avatarUrl}
                  alt={authorName}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white dark:border-neutral-800 shadow-lg"
                />
                <span className="absolute -bottom-2 -right-2 bg-[#BEF264] text-[#111827] p-2 rounded-xl shadow-sm">
                  <UserCheck className="w-4 h-4" />
                </span>
              </div>

              {/* Author Details */}
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="bg-[#BEF264] text-[#111827] text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-xs">
                    {role}
                  </span>
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full border border-gray-200/60 dark:border-neutral-700 inline-flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Published {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] dark:text-white leading-tight tracking-tight mb-3">
                  {authorName}
                </h1>

                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                  {bio}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Author Articles Post Grid */}
        <PostGrid posts={posts} />
      </main>

      <Footer navItems={footerMenu} categories={categories} />
    </div>
  );
}
