'use client';

import { useEffect, useRef } from 'react';

interface ArticleBodyProps {
  content: string;
}

export default function ArticleBody({ content }: ArticleBodyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const headings = containerRef.current.querySelectorAll('h2, h3');
    headings.forEach((heading, index) => {
      const text = heading.textContent || `Section ${index + 1}`;
      const slugId = heading.id || `section-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      heading.id = slugId;
    });
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="prose prose-lg max-w-none text-[#111827] leading-relaxed font-normal"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
