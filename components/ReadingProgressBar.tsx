'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gray-200/40 pointer-events-none">
      <div
        className="h-full bg-[#BEF264] transition-all duration-150 ease-out shadow-[0_0_12px_#BEF264]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
