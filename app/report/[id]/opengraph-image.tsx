import { ImageResponse } from 'next/og';
import { getReportFromMemory } from '@/lib/seo-tester';

export const runtime = 'edge';
export const alt = 'SEO & Functional Audit Report Score Card';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = getReportFromMemory(id);

  const domain = report ? report.domain : 'Website Audit';
  const score = report ? report.overallScore : 88;
  const perfScore = report ? report.categoryScores.performance : 85;
  const seoScore = report ? report.categoryScores.seo : 92;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#F9FAFB',
          color: '#111827',
          padding: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#111827',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#BEF264',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            ⚡
          </div>
          <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>
            BlogsRoom SEO Audit Engine
          </span>
        </div>

        {/* Middle Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span style={{ fontSize: '20px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Lighthouse Performance & SEO Report
          </span>
          <span style={{ fontSize: '56px', fontWeight: '900', color: '#111827' }}>
            {domain}
          </span>
        </div>

        {/* Bottom Score Grid */}
        <div style={{ display: 'flex', width: '100%', gap: '24px' }}>
          <div
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '2px solid #e5e7eb',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: '16px', color: '#6b7280' }}>Overall Score</span>
            <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#111827' }}>{score} / 100</span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '2px solid #e5e7eb',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: '16px', color: '#6b7280' }}>Performance</span>
            <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#0284c7' }}>{perfScore} / 100</span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '2px solid #e5e7eb',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: '16px', color: '#6b7280' }}>SEO Rating</span>
            <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#059669' }}>{seoScore} / 100</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
