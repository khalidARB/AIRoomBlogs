import fs from 'fs';
import path from 'path';
import { ReportPayload } from './seo-tester';

const REPORTS_DIR = path.join(process.cwd(), '.reports_cache');

function ensureReportsDir() {
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }
}

export function saveReportToFile(report: ReportPayload): void {
  try {
    ensureReportsDir();
    const filePath = path.join(REPORTS_DIR, `${report.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(report, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save report to disk cache:', err);
  }
}

export function getReportFromFile(id: string): ReportPayload | null {
  try {
    const filePath = path.join(REPORTS_DIR, `${id}.json`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as ReportPayload;
    }
  } catch (err) {
    console.error(`Failed to read report file ${id}:`, err);
  }
  return null;
}
