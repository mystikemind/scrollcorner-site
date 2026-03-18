'use client';
import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIES, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/constants';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="sticky top-0 z-50">
      {/* Breaking news ticker */}
      <div className="bg-[#e63946] text-white text-xs overflow-hidden whitespace-nowrap py-1.5">
        <div className="flex items-center gap-0">
          <span className="flex-shrink-0 font-black uppercase tracking-widest px-4 bg-white text-[#e63946] mr-4 py-0.5">LATEST</span>
          <span className="ticker-content inline-block">
            Breaking news updated every 3 hours · World News · Technology · Finance · Science · Entertainment · Sports · Stay informed with ScrollCorner &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Breaking news updated every 3 hours · World News · Technology · Finance · Science · Entertainment · Sports · Stay informed with ScrollCorner
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-[#070b17]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-[#e63946] rounded flex items-center justify-center font-black text-white text-sm">SC</div>
              <span className="text-xl font-black tracking-tight text-white group-hover:text-white/80 transition-colors">
                Scroll<span className="text-[#e63946]">Corner</span>
              </span>
            </Link>

            <span className="hidden lg:block text-xs text-white/30">{date}</span>

            <button
              className="md:hidden text-white/50 hover:text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>

          {/* Nav */}
          <nav className={`${menuOpen ? 'flex flex-col pb-3 gap-1' : 'hidden'} md:flex md:flex-row md:items-center border-t border-white/5 pt-1 pb-1`}>
            {CATEGORIES.map(cat => (
              <Link
                key={cat}
                href={`/${cat.toLowerCase()}`}
                className="relative text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white px-3 py-2 rounded transition-colors hover:bg-white/5 group"
              >
                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: CATEGORY_COLORS[cat] }} />
                {CATEGORY_LABELS[cat]}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
