'use client';

import { useEffect, useState } from 'react';
import { List, ChevronRight } from 'lucide-react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse HTML string to extract h2 and h3 elements
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');

    const parsedHeadings: HeadingItem[] = [];

    headingElements.forEach((el, index) => {
      const text = el.textContent || `Section ${index + 1}`;
      const slugId = el.id || `section-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      
      // Inject ID into actual DOM element if present on page
      const domEl = document.getElementById(slugId) || Array.from(document.querySelectorAll('h2, h3'))[index];
      if (domEl) {
        domEl.id = slugId;
      }

      parsedHeadings.push({
        id: slugId,
        text,
        level: el.tagName.toLowerCase() === 'h3' ? 3 : 2,
      });
    });

    setHeadings(parsedHeadings);

    // Setup IntersectionObserver for active section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -40% 0px', threshold: 0.1 }
    );

    parsedHeadings.forEach((h) => {
      const targetEl = document.getElementById(h.id);
      if (targetEl) observer.observe(targetEl);
    });

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120; // Header height clearance
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-soft">
      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
        <List className="w-4 h-4 text-[#111827]" /> Table of Contents
      </h5>

      <nav className="space-y-1.5">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`w-full text-left flex items-center gap-2 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                heading.level === 3 ? 'ml-3 w-[calc(100%-0.75rem)]' : ''
              } ${
                isActive
                  ? 'bg-[#BEF264] text-[#111827] font-bold shadow-xs'
                  : 'text-gray-600 hover:text-[#111827] hover:bg-gray-50'
              }`}
            >
              <ChevronRight
                className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                  isActive ? 'translate-x-0.5 text-[#111827]' : 'text-gray-300'
                }`}
              />
              <span className="truncate">{heading.text}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
