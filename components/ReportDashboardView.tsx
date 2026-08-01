'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ReportPayload } from '@/lib/seo-tester';
import { ShieldCheck, Activity, AlertTriangle, CheckCircle2, ArrowLeft, Globe, Terminal, ExternalLink, FileText, Image as ImageIcon, Share2, Tag, Layers, Server, FileCode, AlignLeft, Hash, Compass } from 'lucide-react';

interface ReportDashboardViewProps {
  reportId: string;
  initialReport: ReportPayload;
}

export default function ReportDashboardView({
  reportId,
  initialReport,
}: ReportDashboardViewProps) {
  const [report, setReport] = useState<ReportPayload>(initialReport);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`seo_report_${reportId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.domain) {
          setReport(parsed);
        }
      }
    } catch {
      // Keep initial report if localStorage reading fails
    }
  }, [reportId]);

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
    if (score >= 50) return 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
    return 'text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
  };

  const deepSeo = report.functionalTest?.deepSeoAudit;
  const pageOv = report.pageOverview;

  return (
    <div className="space-y-8 w-full">
      {/* Navigation Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Main Tool
        </Link>

        <div className="flex items-center gap-3">
          <a
            href={report.targetUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-gray-900 dark:text-[#BEF264]" /> {report.targetUrl} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Hero Score Header Card */}
      <div className="bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-soft">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-xs font-semibold text-gray-900 dark:text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-[#BEF264]" /> Certified Lighthouse & DOM Audit
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-snug font-heading">
              Audit Report for <span className="text-gray-900 dark:text-[#BEF264]">{report.domain}</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-neutral-400">
              Generated at {new Date(report.timestamp).toLocaleString()} • Report ID: {report.id}
            </p>
          </div>

          {/* Main Overall Score Badge */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 min-w-[140px] text-center shadow-inner">
              <span className="text-xs text-gray-500 dark:text-neutral-400 uppercase font-bold tracking-wider mb-1">Overall Score</span>
              <span className={`text-4xl sm:text-5xl font-black ${getScoreBadge(report.overallScore).split(' ')[0]}`}>
                {report.overallScore}
              </span>
              <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-semibold uppercase tracking-widest mt-1">out of 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE OVERVIEW CARD */}
      {pageOv && (
        <div className="bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 pb-4">
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-emerald-600 dark:text-[#BEF264]" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-heading">Page Overview & Architecture</h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold font-mono">
              HTTP {pageOv.statusCode} OK
            </span>
          </div>

          {/* URL & Title Summary */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-neutral-400">
              <Globe className="w-3.5 h-3.5" /> Target Path: <span className="font-mono text-gray-900 dark:text-white bg-white dark:bg-neutral-950 px-2 py-0.5 rounded border border-gray-200 dark:border-neutral-800">{pageOv.pathname}</span>
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">{pageOv.pageTitle}</h3>
            {pageOv.metaDescription && (
              <p className="text-xs text-gray-600 dark:text-neutral-400 leading-relaxed">{pageOv.metaDescription}</p>
            )}
          </div>

          {/* 6 Grid Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 space-y-1">
              <div className="text-[11px] text-gray-500 dark:text-neutral-400 flex items-center justify-center gap-1">
                <AlignLeft className="w-3 h-3" /> Word Count
              </div>
              <div className="text-lg font-extrabold text-gray-900 dark:text-white">{pageOv.wordCount}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 space-y-1">
              <div className="text-[11px] text-gray-500 dark:text-neutral-400 flex items-center justify-center gap-1">
                <FileText className="w-3 h-3" /> Paragraphs
              </div>
              <div className="text-lg font-extrabold text-gray-900 dark:text-white">{pageOv.paragraphCount}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 space-y-1">
              <div className="text-[11px] text-gray-500 dark:text-neutral-400 flex items-center justify-center gap-1">
                <ImageIcon className="w-3 h-3" /> Images
              </div>
              <div className="text-lg font-extrabold text-gray-900 dark:text-white">{pageOv.imageCount}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 space-y-1">
              <div className="text-[11px] text-gray-500 dark:text-neutral-400 flex items-center justify-center gap-1">
                <ExternalLink className="w-3 h-3" /> Total Links
              </div>
              <div className="text-lg font-extrabold text-gray-900 dark:text-white">{pageOv.linkCount}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 space-y-1">
              <div className="text-[11px] text-gray-500 dark:text-neutral-400 flex items-center justify-center gap-1">
                <FileCode className="w-3 h-3" /> HTML Size
              </div>
              <div className="text-lg font-extrabold text-gray-900 dark:text-white">{pageOv.contentLengthKb} KB</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 space-y-1">
              <div className="text-[11px] text-gray-500 dark:text-neutral-400 flex items-center justify-center gap-1">
                <Server className="w-3 h-3" /> Encoding
              </div>
              <div className="text-xs font-bold text-gray-900 dark:text-[#BEF264] mt-1">{pageOv.compression}</div>
            </div>
          </div>

          {/* Heading Structure Tree & Social Card Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Heading Tree Outline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-gray-900 dark:text-[#BEF264]" /> Heading Tree Outline ({pageOv.headingOutline.length})
              </h4>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 space-y-2 max-h-56 overflow-y-auto font-mono text-xs">
                {pageOv.headingOutline.length > 0 ? (
                  pageOv.headingOutline.map((h, i) => (
                    <div key={i} className={`flex items-start gap-2 ${h.level === 'H1' ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-neutral-400 pl-4'}`}>
                      <span className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-neutral-800 text-[10px]">{h.level}</span>
                      <span className="truncate">{h.text}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No H1-H3 headings found in DOM body.</p>
                )}
              </div>
            </div>

            {/* Social Share Preview Card */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400 flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-gray-900 dark:text-[#BEF264]" /> Social Media Share Card Preview
              </h4>
              <div className="rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 overflow-hidden text-xs">
                {pageOv.ogPreview.image ? (
                  <img src={pageOv.ogPreview.image} alt="OG Card Preview" className="w-full h-28 object-cover border-b border-gray-200 dark:border-neutral-800" />
                ) : (
                  <div className="w-full h-24 bg-gray-200 dark:bg-neutral-800 flex items-center justify-center text-gray-400 font-semibold">
                    No og:image tag found
                  </div>
                )}
                <div className="p-3 space-y-1">
                  <div className="text-[10px] text-gray-400 font-mono uppercase">{report.domain}</div>
                  <div className="font-bold text-gray-900 dark:text-white line-clamp-1">{pageOv.ogPreview.title || pageOv.pageTitle}</div>
                  <p className="text-gray-500 dark:text-neutral-400 text-[11px] line-clamp-2">{pageOv.ogPreview.description || pageOv.metaDescription || 'No description provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4 Category Score Gauges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Performance', score: report.categoryScores.performance },
          { label: 'SEO Optimization', score: report.categoryScores.seo },
          { label: 'Accessibility', score: report.categoryScores.accessibility },
          { label: 'Best Practices', score: report.categoryScores.bestPractices },
        ].map((cat) => (
          <div
            key={cat.label}
            className="bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-neutral-800 p-6 rounded-2xl space-y-3 flex flex-col justify-between shadow-soft"
          >
            <span className="text-xs text-gray-500 dark:text-neutral-400 font-semibold">{cat.label}</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white font-heading">{cat.score}</span>
              <span className={`px-2 py-0.5 rounded-full border text-[11px] font-bold ${getScoreBadge(cat.score)}`}>
                {cat.score >= 90 ? 'PASSED' : cat.score >= 50 ? 'NEEDS WORK' : 'POOR'}
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-neutral-900 h-1.5 rounded-full overflow-hidden border border-gray-200 dark:border-neutral-800">
              <div
                className={`h-full ${
                  cat.score >= 90 ? 'bg-emerald-500' : cat.score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${cat.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* DEEP SEO & METADATA EXTRACTION SECTION */}
      {deepSeo && (
        <div className="bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft">
          <div className="flex items-center gap-3 border-b border-gray-100 dark:border-neutral-800 pb-4">
            <Layers className="w-5 h-5 text-gray-900 dark:text-[#BEF264]" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-heading">Deep SEO & DOM Metadata Scraper Audit</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title Tag Check */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-neutral-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-gray-900 dark:text-white" /> &lt;title&gt; Tag Audit
                </span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    deepSeo.titleTagsCount === 1
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                      : deepSeo.titleTagsCount > 1
                      ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                      : 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                  }`}
                >
                  {deepSeo.titleTagsCount === 1 ? 'PASSED (Single)' : deepSeo.titleTagsCount > 1 ? `WARNING (${deepSeo.titleTagsCount} Duplicates)` : 'ERROR (Missing)'}
                </span>
              </div>
              <p className="text-xs text-gray-800 dark:text-neutral-200 font-medium truncate">
                {deepSeo.titleContent || 'No title tag found'}
              </p>
              <div className="text-[11px] text-gray-500 dark:text-neutral-400">
                Length: {deepSeo.titleContent.length} chars {deepSeo.titleContent.length >= 30 && deepSeo.titleContent.length <= 60 ? '(Optimal 30-60)' : '(Recommended: 30-60 chars)'}
              </div>
            </div>

            {/* Meta Description Check */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-neutral-400 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-gray-900 dark:text-white" /> Meta Description Audit
                </span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    deepSeo.metaDescriptionCount === 1
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                      : deepSeo.metaDescriptionCount > 1
                      ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                      : 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                  }`}
                >
                  {deepSeo.metaDescriptionCount === 1 ? 'PASSED' : deepSeo.metaDescriptionCount > 1 ? `WARNING (${deepSeo.metaDescriptionCount} Duplicates)` : 'ERROR (Missing)'}
                </span>
              </div>
              <p className="text-xs text-gray-800 dark:text-neutral-200 line-clamp-2">
                {deepSeo.metaDescriptionContent || 'No meta description found'}
              </p>
              <div className="text-[11px] text-gray-500 dark:text-neutral-400">
                Length: {deepSeo.metaDescriptionContent.length} chars {deepSeo.metaDescriptionContent.length >= 120 && deepSeo.metaDescriptionContent.length <= 160 ? '(Optimal 120-160)' : '(Recommended: 120-160 chars)'}
              </div>
            </div>

            {/* Open Graph Social Sharing Tags */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-neutral-400 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-gray-900 dark:text-white" /> Open Graph Tags (og:image, og:title)
                </span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    deepSeo.hasOpenGraph
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                      : 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                  }`}
                >
                  {deepSeo.hasOpenGraph ? 'PASSED (Social Ready)' : 'MISSING OG TAGS'}
                </span>
              </div>
              <div className="text-xs text-gray-800 dark:text-neutral-200 space-y-1">
                <div><span className="text-gray-400">og:title:</span> {deepSeo.ogTitle || 'Missing'}</div>
                <div className="truncate"><span className="text-gray-400">og:image:</span> {deepSeo.ogImage || 'Missing'}</div>
              </div>
            </div>

            {/* Canonical Tag Check */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-neutral-400 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-gray-900 dark:text-white" /> Canonical URL (&lt;link rel="canonical"&gt;)
                </span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    deepSeo.hasCanonical
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                      : 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                  }`}
                >
                  {deepSeo.hasCanonical ? 'PASSED' : 'MISSING CANONICAL'}
                </span>
              </div>
              <p className="text-xs font-mono text-gray-800 dark:text-neutral-200 truncate">
                {deepSeo.canonicalUrl || 'No rel="canonical" tag discovered'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Core Web Vitals Grid */}
      <div className="bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft">
        <div className="flex items-center gap-3 border-b border-gray-100 dark:border-neutral-800 pb-4">
          <Activity className="w-5 h-5 text-gray-900 dark:text-[#BEF264]" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white font-heading">Core Web Vitals Metrics</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Largest Contentful Paint (LCP)', val: report.coreWebVitals.lcp.displayValue, desc: 'Measures loading performance.', status: report.coreWebVitals.lcp.status },
            { label: 'Cumulative Layout Shift (CLS)', val: report.coreWebVitals.cls.displayValue, desc: 'Measures visual stability.', status: report.coreWebVitals.cls.status },
            { label: 'First Input Delay (FID/INP)', val: report.coreWebVitals.fid.displayValue, desc: 'Measures input responsiveness.', status: report.coreWebVitals.fid.status },
            { label: 'First Contentful Paint (FCP)', val: report.coreWebVitals.fcp.displayValue, desc: 'First DOM element paint time.', status: report.coreWebVitals.fcp.status },
            { label: 'Total Blocking Time (TBT)', val: report.coreWebVitals.tbt.displayValue, desc: 'Main thread task blockage duration.', status: report.coreWebVitals.tbt.status },
            { label: 'Speed Index', val: report.coreWebVitals.speedIndex.displayValue, desc: 'Speed content is visually displayed.', status: report.coreWebVitals.speedIndex.status },
          ].map((metric) => (
            <div key={metric.label} className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 space-y-2">
              <div className="text-xs text-gray-500 dark:text-neutral-400 font-medium">{metric.label}</div>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{metric.val}</div>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    metric.status === 'good'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                      : 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                  }`}
                >
                  {metric.status}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-neutral-400">{metric.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Puppeteer Functional Interaction Trace Section */}
      {report.functionalTest && (
        <div className="bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft">
          <div className="flex items-center gap-3 border-b border-gray-100 dark:border-neutral-800 pb-4">
            <Terminal className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-heading">Puppeteer Functional Browser Trace</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
              <div className="text-xs text-gray-500 dark:text-neutral-400">Total Load Time</div>
              <div className="text-xl font-extrabold text-gray-900 dark:text-white mt-1">{report.functionalTest.loadTimeMs} ms</div>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
              <div className="text-xs text-gray-500 dark:text-neutral-400">HTTP Status</div>
              <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{report.functionalTest.statusCode}</div>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
              <div className="text-xs text-gray-500 dark:text-neutral-400">Links Checked</div>
              <div className="text-xl font-extrabold text-gray-900 dark:text-white mt-1">{report.functionalTest.totalLinksChecked}</div>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
              <div className="text-xs text-gray-500 dark:text-neutral-400">Interactive Inputs</div>
              <div className="text-xl font-extrabold text-gray-900 dark:text-[#BEF264] mt-1">
                {report.functionalTest.interactiveElementsCount}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audits & Actionable Recommendations */}
      <div className="bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft">
        <div className="flex items-center gap-3 border-b border-gray-100 dark:border-neutral-800 pb-4">
          <CheckCircle2 className="w-5 h-5 text-gray-900 dark:text-[#BEF264]" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white font-heading">Lighthouse Audit Breakdown</h2>
        </div>

        <div className="space-y-3">
          {report.audits.map((audit) => (
            <div
              key={audit.id}
              className="p-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  {audit.severity === 'pass' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  ) : audit.severity === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  )}
                  <span>{audit.title}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-neutral-400 leading-relaxed">{audit.description}</p>
              </div>

              {audit.displayValue && (
                <span className="text-xs font-mono text-gray-800 dark:text-[#BEF264] bg-white dark:bg-neutral-950 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-neutral-800 flex-shrink-0">
                  {audit.displayValue}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
