'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, ShieldCheck, Activity, ArrowRight, CheckCircle2, AlertTriangle, RefreshCw, Cpu, Globe, Sparkles } from 'lucide-react';
import { ReportPayload } from '@/lib/seo-tester';

const TEST_STEPS = [
  { id: 1, label: 'Connecting to Google PageSpeed Insights API...' },
  { id: 2, label: 'Executing Lighthouse audit (SEO, Speed, Accessibility)...' },
  { id: 3, label: 'Running Puppeteer functional browser trace...' },
  { id: 4, label: 'Normalizing Core Web Vitals & generating report...' },
];

export default function SeoTesterSection() {
  const router = useRouter();
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [quickReport, setQuickReport] = useState<ReportPayload | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setQuickReport(null);
    setCurrentStep(1);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < TEST_STEPS.length ? prev + 1 : prev));
    }, 1200);

    try {
      // 1. Run SEO & PageSpeed test
      const seoRes = await fetch('/api/run-seo-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput }),
      });

      const seoData = await seoRes.json();

      if (!seoRes.ok || !seoData.success) {
        throw new Error(seoData.error || 'Failed to complete PageSpeed audit.');
      }

      const report: ReportPayload = seoData.report;

      // 2. Run Functional Puppeteer test in parallel
      try {
        const funcRes = await fetch('/api/run-functional-test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: urlInput }),
        });
        if (funcRes.ok) {
          const funcData = await funcRes.json();
          report.functionalTest = funcData;
        }
      } catch {
        // Functional test optional fallback
      }

      clearInterval(stepInterval);
      setCurrentStep(4);
      setQuickReport(report);
      setLoading(false);
    } catch (err: any) {
      clearInterval(stepInterval);
      setLoading(false);
      setErrorMsg(err.message || 'An unexpected error occurred during the audit.');
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
    if (score >= 50) return 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
    return 'text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
  };

  return (
    <section className="py-12 sm:py-16 px-6 sm:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-10 w-full">
        {/* Main Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white text-xs font-semibold uppercase tracking-wider shadow-soft"
          >
            <span className="w-2 h-2 rounded-full bg-[#BEF264] animate-pulse" /> Official Website Audit Engine
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight font-heading"
          >
            Free Automated <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">SEO & Core Web Vitals</span> Tester
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 dark:text-neutral-400 font-normal leading-relaxed"
          >
            Type your URL below to run Google Lighthouse performance audits, Core Web Vitals measurements, and Puppeteer functional browser interaction traces in real-time.
          </motion.p>
        </div>

        {/* Form Card (Full 7xl Width) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-soft w-full"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-neutral-500" />
                <input
                  type="url"
                  required
                  placeholder="https://yourwebsite.com"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 text-base focus:outline-none focus:border-gray-900 dark:focus:border-[#BEF264] focus:ring-1 focus:ring-gray-900 dark:focus:ring-[#BEF264] transition-all disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 rounded-2xl bg-gray-900 text-white dark:bg-[#BEF264] dark:text-gray-950 font-bold text-base hover:bg-black dark:hover:bg-[#a3e635] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" /> Auditing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" /> Run Audit <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo URLs */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <span>Try sample URLs:</span>
              {['https://nextjs.org', 'https://wordpress.org', 'https://github.com'].map((demoUrl) => (
                <button
                  key={demoUrl}
                  type="button"
                  onClick={() => setUrlInput(demoUrl)}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-[#BEF264] font-medium underline underline-offset-4 transition-colors"
                >
                  {demoUrl.replace('https://', '')}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 font-medium">
              <span className="text-gray-400">Tailored audit tools:</span>
              <button
                type="button"
                onClick={() => router.push('/tools/seo-tester-for-doctors')}
                className="hover:text-gray-900 dark:hover:text-[#BEF264] underline underline-offset-4"
              >
                Doctors
              </button>
              <button
                type="button"
                onClick={() => router.push('/tools/seo-tester-for-e-commerce')}
                className="hover:text-gray-900 dark:hover:text-[#BEF264] underline underline-offset-4"
              >
                E-Commerce
              </button>
              <button
                type="button"
                onClick={() => router.push('/tools/seo-tester-for-lawyers')}
                className="hover:text-gray-900 dark:hover:text-[#BEF264] underline underline-offset-4"
              >
                Lawyers
              </button>
            </div>
          </div>

          {/* Loading Animation & Progress Steps */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 pt-6 border-t border-gray-100 dark:border-neutral-800 space-y-4"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-neutral-400">
                  <span>AUDIT PROGRESS</span>
                  <span className="text-gray-900 dark:text-[#BEF264]">{Math.min(currentStep * 25, 100)}%</span>
                </div>

                <div className="w-full bg-gray-100 dark:bg-neutral-900 h-2 rounded-full overflow-hidden border border-gray-200 dark:border-neutral-800">
                  <motion.div
                    className="h-full bg-gray-900 dark:bg-[#BEF264]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${Math.min(currentStep * 25, 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="space-y-2">
                  {TEST_STEPS.map((step) => {
                    const isDone = currentStep > step.id;
                    const isCurrent = currentStep === step.id;
                    return (
                      <div
                        key={step.id}
                        className={`flex items-center gap-3 text-sm transition-colors ${
                          isDone
                            ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                            : isCurrent
                            ? 'text-gray-900 dark:text-[#BEF264] font-semibold'
                            : 'text-gray-400 dark:text-neutral-600'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        ) : isCurrent ? (
                          <RefreshCw className="w-4 h-4 animate-spin text-gray-900 dark:text-[#BEF264] flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-neutral-800 flex-shrink-0" />
                        )}
                        <span>{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm flex items-center gap-3"
            >
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-500" />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Report Preview Card */}
        {quickReport && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-soft w-full"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-neutral-800 pb-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-gray-400 dark:text-neutral-500">Audit Completed</span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1 font-heading">
                  {quickReport.domain}
                </h2>
                <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">Report ID: {quickReport.id}</p>
              </div>

              <button
                onClick={() => {
                  try {
                    localStorage.setItem(`seo_report_${quickReport.id}`, JSON.stringify(quickReport));
                  } catch {}
                  router.push(`/report/${quickReport.id}`);
                }}
                className="px-6 py-3 rounded-xl bg-gray-900 text-white dark:bg-[#BEF264] dark:text-gray-950 font-bold text-sm hover:bg-black dark:hover:bg-[#a3e635] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Open Full Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Scores Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { title: 'Performance', score: quickReport.categoryScores.performance },
                { title: 'SEO', score: quickReport.categoryScores.seo },
                { title: 'Accessibility', score: quickReport.categoryScores.accessibility },
                { title: 'Best Practices', score: quickReport.categoryScores.bestPractices },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gray-50 dark:bg-neutral-900 p-4 rounded-2xl border border-gray-100 dark:border-neutral-800 text-center space-y-2"
                >
                  <div className="text-xs text-gray-500 dark:text-neutral-400 font-medium">{item.title}</div>
                  <div
                    className={`text-3xl font-extrabold inline-block px-3 py-1 rounded-xl border ${getScoreBadge(
                      item.score
                    )}`}
                  >
                    {item.score}
                  </div>
                </div>
              ))}
            </div>

            {/* Core Web Vitals Row */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 flex items-center gap-2">
                <Activity className="w-4 h-4 text-gray-900 dark:text-[#BEF264]" /> Core Web Vitals Summary
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
                  <div className="text-xs text-gray-500 dark:text-neutral-400">LCP (Largest Contentful Paint)</div>
                  <div className="text-base font-bold text-gray-900 dark:text-white mt-1">{quickReport.coreWebVitals.lcp.displayValue}</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
                  <div className="text-xs text-gray-500 dark:text-neutral-400">CLS (Cumulative Layout Shift)</div>
                  <div className="text-base font-bold text-gray-900 dark:text-white mt-1">{quickReport.coreWebVitals.cls.displayValue}</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
                  <div className="text-xs text-gray-500 dark:text-neutral-400">FID / INP (Input Delay)</div>
                  <div className="text-base font-bold text-gray-900 dark:text-white mt-1">{quickReport.coreWebVitals.fid.displayValue}</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Features Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-neutral-800 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-neutral-900 flex items-center justify-center text-gray-900 dark:text-[#BEF264]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading">Google Cloud Engine</h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">
              Queries Google PageSpeed REST APIs to execute Lighthouse audits directly on cloud infrastructure without server load.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-neutral-800 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-neutral-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading">Puppeteer Browser Traces</h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">
              Monitors JavaScript errors, broken internal links, and DOM interaction timings using isolated browser microservices.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-neutral-800 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-neutral-900 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading">Shareable Reports</h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">
              Generates dynamic OpenGraph cards for report links so users can share audit grades across social networks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
