export interface CoreWebVitals {
  lcp: { displayValue: string; numericValue: number; score: number; status: 'good' | 'needs-improvement' | 'poor' };
  fid: { displayValue: string; numericValue: number; score: number; status: 'good' | 'needs-improvement' | 'poor' };
  cls: { displayValue: string; numericValue: number; score: number; status: 'good' | 'needs-improvement' | 'poor' };
  fcp: { displayValue: string; numericValue: number; score: number; status: 'good' | 'needs-improvement' | 'poor' };
  tbt: { displayValue: string; numericValue: number; score: number; status: 'good' | 'needs-improvement' | 'poor' };
  speedIndex: { displayValue: string; numericValue: number; score: number; status: 'good' | 'needs-improvement' | 'poor' };
}

export interface AuditItem {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: string;
  displayValue?: string;
  category: 'seo' | 'performance' | 'accessibility' | 'best-practices';
  severity: 'pass' | 'warning' | 'error';
}

export interface DeepSeoAudit {
  titleTagsCount: number;
  titleContent: string;
  metaDescriptionCount: number;
  metaDescriptionContent: string;
  canonicalUrl: string | null;
  hasCanonical: boolean;
  ogTitle: string | null;
  ogImage: string | null;
  ogDescription: string | null;
  hasOpenGraph: boolean;
  h1Count: number;
  h1Text: string[];
  totalImages: number;
  missingAltCount: number;
  missingAltImages: string[];
  robotsMeta: string | null;
}

export interface FunctionalTestResult {
  status: 'completed' | 'failed' | 'simulated';
  pageTitle: string;
  loadTimeMs: number;
  statusCode: number;
  totalLinksChecked: number;
  brokenLinksCount: number;
  brokenLinks: { url: string; status: number }[];
  consoleErrors: string[];
  interactiveElementsCount: number;
  screenshotUrl?: string;
  executionTimestamp: string;
  deepSeoAudit?: DeepSeoAudit;
}

export interface PageOverview {
  fullUrl: string;
  pathname: string;
  pageTitle: string;
  metaDescription: string;
  faviconUrl: string | null;
  statusCode: number;
  contentLengthKb: number;
  wordCount: number;
  paragraphCount: number;
  imageCount: number;
  linkCount: number;
  headingOutline: { level: string; text: string }[];
  serverHeader: string | null;
  compression: string | null;
  ogPreview: {
    title: string | null;
    description: string | null;
    image: string | null;
  };
}

export interface ReportPayload {
  id: string;
  targetUrl: string;
  domain: string;
  timestamp: string;
  overallScore: number;
  categoryScores: {
    performance: number;
    seo: number;
    accessibility: number;
    bestPractices: number;
  };
  coreWebVitals: CoreWebVitals;
  audits: AuditItem[];
  functionalTest?: FunctionalTestResult;
  pageOverview?: PageOverview;
  recommendations: string[];
}

export interface ProgrammaticLandingPage {
  title: string;
  slug: string;
  niche: string;
  heroTitle: string;
  heroSubtitle: string;
  targetAudience: string;
  features: { title: string; description: string; icon: string }[];
  faqs: { question: string; answer: string }[];
  metaDescription: string;
}

// Default static fallback programmatic landing pages for preset niches
export const PRESET_LANDING_PAGES: Record<string, ProgrammaticLandingPage> = {
  'seo-tester-for-doctors': {
    title: 'SEO & Core Web Vitals Tester for Medical Practices & Doctors',
    slug: 'seo-tester-for-doctors',
    niche: 'Healthcare & Medical Practices',
    heroTitle: 'Dominate Local Medical Search with Precision Lighthouse Audits',
    heroSubtitle: 'Ensure your clinic or medical practice website loads instantly, adheres to HIPAA web standards, and ranks #1 for local patients.',
    targetAudience: 'Doctors, Dentists, Medical Clinics, Healthcare Marketing Teams',
    metaDescription: 'Free automated SEO & Core Web Vitals diagnostic tool tailored for medical clinics and healthcare practices.',
    features: [
      { title: 'HIPAA & SSL Security Checks', description: 'Verifies encrypted protocol configurations, secure headers, and form input validation.', icon: 'ShieldCheck' },
      { title: 'Local Pack Citation Audits', description: 'Checks local schema markup (MedicalClinic, Physician) and Google Maps indexability.', icon: 'MapPin' },
      { title: 'Sub-Second Patient Page Speed', description: 'Measures LCP and CLS to ensure mobile patients on 4G networks load clinic schedules instantly.', icon: 'Zap' },
    ],
    faqs: [
      { question: 'Why is website speed critical for medical practices?', answer: '78% of local healthcare searches end in an appointment within 24 hours. If your mobile site takes over 3 seconds to load, patients click back to a competitor.' },
      { question: 'Does this audit verify Medical Clinic Schema?', answer: 'Yes! The audit checks for structured JSON-LD data including address, opening hours, specialty, and accepted insurance.' },
    ],
  },
  'seo-tester-for-e-commerce': {
    title: 'E-Commerce Store Speed & Conversion SEO Diagnostics',
    slug: 'seo-tester-for-e-commerce',
    niche: 'E-Commerce & Online Stores',
    heroTitle: 'Boost Online Store Sales by Fixing Slow Checkout & Hidden SEO Bottlenecks',
    heroSubtitle: 'Run Google Lighthouse audits + functional add-to-cart tests to identify revenue-killing latency and indexation errors.',
    targetAudience: 'Shopify, WooCommerce, and Next.js Headless Store Owners',
    metaDescription: 'Comprehensive Lighthouse SEO audit and functional interaction test for e-commerce stores.',
    features: [
      { title: 'Product Schema & Price Markup', description: 'Validates Product, Offer, AggregateRating, and in-stock schema tags for rich search snippets.', icon: 'Tag' },
      { title: 'Cart & Checkout Load Speeds', description: 'Analyzes visual stability (CLS) and input latency (INP/FID) during high-traffic sales events.', icon: 'ShoppingCart' },
      { title: 'Mobile Image Optimization', description: 'Audits next-gen webp/avif image formatting, unminified scripts, and render-blocking CSS.', icon: 'Image' },
    ],
    faqs: [
      { question: 'How does site speed affect ecommerce conversion rates?', answer: 'Every 100ms delay in checkout load time reduces conversion rates by up to 7%. Fixing LCP and CLS directly increases sales.' },
      { question: 'Can I test WooCommerce or Headless Next.js stores?', answer: 'Yes! The tool tests any public URL regardless of whether it runs on WooCommerce, Shopify, or Next.js.' },
    ],
  },
  'seo-tester-for-lawyers': {
    title: 'Law Firm SEO & Legal Practice Website Diagnostic Tool',
    slug: 'seo-tester-for-lawyers',
    niche: 'Legal Services & Law Firms',
    heroTitle: 'Outrank Competitor Law Firms with Deep SEO & Accessibility Audits',
    heroSubtitle: 'Identify missing schema, slow consultation forms, and WCAG accessibility non-compliance before search engines penalize your firm.',
    targetAudience: 'Attorneys, Law Firms, Legal Marketers',
    metaDescription: 'Free legal website SEO and accessibility auditor designed for high-competition law firm niches.',
    features: [
      { title: 'Legal Service Schema Validation', description: 'Verifies LegalService schema tags, attorney bio pages, and local practice area markup.', icon: 'Scale' },
      { title: 'ADA / WCAG Accessibility Checks', description: 'Audits contrast ratios, screen reader labels, and keyboard navigation compliance.', icon: 'Eye' },
      { title: 'High-Value Lead Form Speed', description: 'Measures First Input Delay and Interaction to Next Paint on consultation booking forms.', icon: 'FileText' },
    ],
    faqs: [
      { question: 'Why is local SEO vital for law firms?', answer: 'Legal keywords are among the most expensive PPC ads in search engines. High organic rankings save tens of thousands in monthly ad spend.' },
      { question: 'Does this test check ADA accessibility compliance?', answer: 'Yes! Lighthouse accessibility audits inspect ARIA roles, color contrast, and focus states.' },
    ],
  },
};

// Internal memory cache for run results when WP REST is offline
const memoryReportStore = new Map<string, ReportPayload>();

export function storeReportInMemory(report: ReportPayload): void {
  memoryReportStore.set(report.id, report);
}

export function getReportFromMemory(id: string): ReportPayload | null {
  return memoryReportStore.get(id) || null;
}
