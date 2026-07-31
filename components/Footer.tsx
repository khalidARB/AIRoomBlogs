'use client';

import Link from 'next/link';
import { Send } from 'lucide-react';
import { MenuItem, Category, MOCK_FOOTER_MENU, MOCK_CATEGORIES } from '@/lib/wordpress';

interface FooterProps {
  navItems?: MenuItem[];
  categories?: Category[];
}

export default function Footer({
  navItems = MOCK_FOOTER_MENU,
  categories = MOCK_CATEGORIES,
}: FooterProps) {
  // Filter categories to omit "All Articles" pill in footer column if needed
  const displayCategories = categories.filter((c) => c.slug !== 'all');

  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-12 overflow-hidden border-t border-gray-800 relative">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#BEF264]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Sitemap Grid */}
        <div id="newsletter" className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-16 border-b border-gray-800/80">
          {/* Brand Info */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
              <span className="w-9 h-9 rounded-xl bg-[#BEF264] flex items-center justify-center font-extrabold text-[#111827] text-base">
                Ai
              </span>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Ai<span className="text-[#BEF264]">Rooms</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              A high-performance publication platform powered by WordPress WPGraphQL and Next.js static site regeneration.
            </p>
            {/* Newsletter Input Box */}
            <div className="flex items-center bg-gray-900/90 border border-gray-800 rounded-full p-1.5 max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent text-sm text-white px-4 py-2 focus:outline-none w-full placeholder-gray-500"
              />
              <button
                aria-label="Subscribe to newsletter"
                className="bg-[#BEF264] hover:bg-[#a3e635] text-[#111827] p-2.5 rounded-full transition-transform active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 1: Dynamic Navigation (Managed via WordPress Menus) */}
          <div>
            <h4 className="text-xs font-extrabold text-gray-300 uppercase tracking-wider mb-5">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link href={item.url || '#'} className="hover:text-[#BEF264] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Dynamic Categories (Managed via WordPress Dashboard) */}
          <div>
            <h4 className="text-xs font-extrabold text-gray-300 uppercase tracking-wider mb-5">
              Categories
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {displayCategories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/?category=${cat.slug}`} className="hover:text-[#BEF264] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social & Legal */}
          <div>
            <h4 className="text-xs font-extrabold text-gray-300 uppercase tracking-wider mb-5">
              Connect
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#BEF264] transition-colors">
                  Twitter / X
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#BEF264] transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#BEF264] transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <Link href="#" className="hover:text-[#BEF264] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Massive Screen-Width Typography */}
        <div className="pt-12 flex flex-col items-center justify-between gap-6">
          <div className="w-full text-center overflow-hidden">
            <span className="block font-black text-[13vw] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-700 via-gray-800 to-gray-950 select-none uppercase">
              AiRooms
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between w-full text-xs text-gray-500 gap-4 pt-4 border-t border-gray-900">
            <p>© 2026 AiRooms. All rights reserved.</p>
            <p>Decoupled Architecture with Next.js & WPGraphQL</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
