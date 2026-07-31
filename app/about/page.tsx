import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterBox from '@/components/NewsletterBox';
import { getAllPosts, getCategories, getMenu, slugify } from '@/lib/wordpress';
import {
  Sparkles,
  Zap,
  Shield,
  Layers,
  Cpu,
  ArrowUpRight,
  CheckCircle2,
  Users,
  Terminal,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — AiRooms',
  description:
    'Discover the mission behind AiRooms. We combine headless WordPress architecture, Next.js performance, and editorial design to publish high-impact tech insights.',
};

export default async function AboutPage() {
  const [allPosts, categories, headerMenu, footerMenu] = await Promise.all([
    getAllPosts(),
    getCategories(),
    getMenu('header'),
    getMenu('footer'),
  ]);

  // Extract unique editorial team members from posts
  const teamMembers = Array.from(
    new Map(
      allPosts.map((p) => [
        p.author.name,
        {
          name: p.author.name,
          role: p.author.role,
          avatarUrl: p.author.avatarUrl,
          slug: slugify(p.author.name),
        },
      ])
    ).values()
  );

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] dark:bg-[#0A0A0A] flex flex-col justify-between">
      <Header navItems={headerMenu} posts={allPosts} />

      <main className="flex-grow pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#BEF264] text-[#111827] text-xs font-extrabold px-4 py-1.5 rounded-full mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT AIROOMS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#111827] dark:text-white leading-[1.05] tracking-tight mb-8">
              Engineering the Next Era of Digital Publications.
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-2xl leading-relaxed font-normal max-w-3xl">
              AiRooms is a modern publication platform built at the intersection of headless web architecture, high-performance static rendering, and AI-driven tech curation.
            </p>
          </div>
        </section>

        {/* Stats Bento Grid */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft">
              <span className="text-3xl sm:text-5xl font-extrabold text-[#111827] dark:text-white block mb-2">
                100<span className="text-[#BEF264]">%</span>
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Core Web Vitals
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft">
              <span className="text-3xl sm:text-5xl font-extrabold text-[#111827] dark:text-white block mb-2">
                &lt;60<span className="text-[#BEF264]">ms</span>
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Edge TTFB Latency
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft">
              <span className="text-3xl sm:text-5xl font-extrabold text-[#111827] dark:text-white block mb-2">
                {allPosts.length}+
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Published Articles
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft">
              <span className="text-3xl sm:text-5xl font-extrabold text-[#111827] dark:text-white block mb-2">
                24/7
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Global CDN Delivery
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Core Pillars Bento Section */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-24">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-4">
              Our Architectural Pillars
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl">
              We reject generic website templates. Every pixel and line of code is optimized for performance, tactile legibility, and editorial autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#BEF264]/20 dark:bg-[#BEF264]/10 text-[#111827] dark:text-[#BEF264] flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-3">
                  Sub-Second Speed
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Leveraging Next.js App Router, SSG static pre-rendering, and Incremental Static Regeneration (ISR) to serve pages instantly straight from edge CDNs.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#BEF264]/20 dark:bg-[#BEF264]/10 text-[#111827] dark:text-[#BEF264] flex items-center justify-center mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-3">
                  Decoupled Freedom
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  WordPress powers the CMS backend via WPGraphQL while Next.js handles custom React frontend rendering, giving authors familiar editorial tools.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#BEF264]/20 dark:bg-[#BEF264]/10 text-[#111827] dark:text-[#BEF264] flex items-center justify-center mb-6">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-3">
                  Tactile UX & Motion
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Fluid Framer Motion micro-physics, dark/light theme switching, sticky reading TOCs, and instant search modals designed for distraction-free reading.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Team Section */}
        {teamMembers.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-24">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-2">
                  Meet Our Editorial Team
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Architects, designers, and software engineers curating technical insights.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.slug}
                  className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-gray-200/80 dark:border-neutral-800 shadow-soft flex items-center gap-5 group"
                >
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100 dark:border-neutral-700 shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-[#111827] dark:text-white group-hover:text-lime-500 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">
                      {member.role}
                    </p>
                    <Link
                      href={`/author/${member.slug}`}
                      className="text-xs font-extrabold text-lime-600 dark:text-[#BEF264] inline-flex items-center gap-1 hover:underline"
                    >
                      <span>View Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Callout Banner */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8">
          <NewsletterBox />
        </section>
      </main>

      <Footer navItems={footerMenu} categories={categories} />
    </div>
  );
}
