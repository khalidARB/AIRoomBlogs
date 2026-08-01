'use client';

import { useEffect, useState } from 'react';
import { ReportPayload } from '@/lib/seo-tester';

interface ReportClientHydratorProps {
  reportId: string;
  initialReport: ReportPayload;
  children: (report: ReportPayload) => React.ReactNode;
}

export default function ReportClientHydrator({
  reportId,
  initialReport,
  children,
}: ReportClientHydratorProps) {
  const [activeReport, setActiveReport] = useState<ReportPayload>(initialReport);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`seo_report_${reportId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.domain) {
          setActiveReport(parsed);
        }
      }
    } catch {
      // Keep initial report if localStorage parsing fails
    }
  }, [reportId]);

  return <>{children(activeReport)}</>;
}
