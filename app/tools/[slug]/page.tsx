import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PRESET_LANDING_PAGES, ProgrammaticLandingPage } from '@/lib/seo-tester';
import { getCategories, getMenu } from '@/lib/wordpress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';

const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost/BlogsRoom/graphql';

interface ProgrammaticPageProps {
  params: Promise<{ slug: string }>;
}

async function fetchLandingPageFromWP(slug: string): Promise<ProgrammaticLandingPage | null> {
  // Check local preset static pages first
  if (PRESET_LANDING_PAGES[slug]) {
    return PRESET_LANDING_PAGES[slug];
  }

  // Attempt GraphQL fetch from WordPress
  try {
    const query = `
      query GetToolLandingPage($slug: ID!) {
        toolLandingPage(id: $slug, idType: SLUG) {
          title
          slug
          niche
          heroSubtitle
          content
        }
      }
    `;

    const res = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { slug } }),
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      const pageData = data?.data?.toolLandingPage;
      if (pageData) {
        return {
          title: pageData.title,
          slug: pageData.slug,
          niche: pageData.niche || 'Niche Business',
          heroTitle: pageData.title,
          heroSubtitle: pageData.heroSubtitle || 'Custom SEO and Core Web Vitals diagnostic tool.',
          targetAudience: 'Business Owners & SEO Specialists',
          metaDescription: `Free automated SEO audit tool tailored for ${pageData.title}`,
          features: [
            { title: 'Core Web Vitals Diagnosis', description: 'Measures sub-second LCP and visual stability.', icon: 'Zap' },
            { title: 'Schema & Local Markup Audit', description: 'Verifies structured data tags for search engine indexing.', icon: 'ShieldCheck' },
          ],
          faqs: [
            { question: 'Why is site speed critical for rankings?', answer: 'Search engines prioritize fast-loading websites with minimal input latency.' },
          ],
        };
      }
    }
  } catch {
    // Fallback handling
  }

  return null;
}

export async function generateMetadata({ params }: ProgrammaticPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchLandingPageFromWP(slug);

  if (!page) {
    return {
      title: 'SEO Tool Landing Page | BlogsRoom',
    };
  }

  return {
    title: `${page.title} | Free Audit Engine`,
    description: page.metaDescription,
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      type: 'website',
    },
  };
}

export default async function ProgrammaticToolPage({ params }: ProgrammaticPageProps) {
  const { slug } = await params;
  const [categories, headerMenu, footerMenu] = await Promise.all([
    getCategories(),
    getMenu('header'),
    getMenu('footer'),
  ]);

  const page = await fetchLandingPageFromWP(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] dark:bg-[#0A0A0A] flex flex-col justify-between">
      <Header navItems={headerMenu} />

      <main className="flex-grow pt-28 pb-16 px-6 sm:px-8 max-w-7xl mx-auto w-full font-sans transition-colors">
        <div className="space-y-12 w-full">
          {/* Niche Badge & Hero */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white text-xs font-semibold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gray-900 dark:text-[#BEF264]" /> Tailored for {page.niche}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight font-heading">
              {page.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-neutral-400 font-normal leading-relaxed">
              {page.heroSubtitle}
            </p>
          </div>

          {/* Audit Tool Call to Action Card (Full 7xl Container Width) */}
          <div className="bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-soft w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-heading">Test Your Website Now</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-neutral-400 max-w-xl mx-auto">
              Get instant Google Lighthouse scores, Core Web Vitals, and Puppeteer functional interaction traces for your practice or store.
            </p>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gray-900 text-white dark:bg-[#BEF264] dark:text-gray-950 font-bold text-base hover:bg-black dark:hover:bg-[#a3e635] transition-all shadow-sm"
            >
              Launch Free SEO Audit <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Feature Cards Grid */}
          <div className="space-y-6 w-full">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center font-heading">
              Key Diagnostic Checks for {page.niche}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {page.features.map((feat, idx) => (
                <div key={idx} className="bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-neutral-800 p-6 rounded-2xl space-y-3 shadow-soft">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-neutral-900 flex items-center justify-center text-gray-900 dark:text-[#BEF264]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading">{feat.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Section */}
          <div className="bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-8 sm:p-10 space-y-6 shadow-soft w-full">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 font-heading">
              <HelpCircle className="w-6 h-6 text-gray-900 dark:text-[#BEF264]" /> Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {page.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 sm:p-6 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 space-y-2">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                  <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer navItems={footerMenu} categories={categories} />
    </div>
  );
}
