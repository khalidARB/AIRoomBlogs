'use client';

import { useState } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <h5 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5" /> Share Publication
      </h5>
      <div className="flex items-center gap-2">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Share on Twitter"
          className="w-9 h-9 rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-[#BEF264] text-[#111827] dark:text-white dark:hover:text-[#111827] flex items-center justify-center transition-all duration-200 hover:scale-105"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/`}
          target="_blank"
          rel="noreferrer"
          aria-label="Share on LinkedIn"
          className="w-9 h-9 rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-[#BEF264] text-[#111827] dark:text-white dark:hover:text-[#111827] flex items-center justify-center transition-all duration-200 hover:scale-105"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        </a>
        <button
          onClick={handleCopyLink}
          aria-label="Copy article link"
          className="w-9 h-9 rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-[#BEF264] text-[#111827] dark:text-white dark:hover:text-[#111827] flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-green-700 dark:text-green-400" /> : <LinkIcon className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
