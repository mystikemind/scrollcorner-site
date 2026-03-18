'use client';
import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIES, CATEGORY_LABELS } from '@/lib/constants';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#0a0e1a] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 border-b border-white/5">
          <Link href="/" className="text-2xl font-black tracking-tight text-white">
            SCROLL<span className="text-[#e63946]">CORNER</span>
          </Link>
          <div className="hidden md:flex items-center gap-4 text-xs text-white/40">
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <button
            className="md:hidden text-white/60 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
        {/* Nav */}
        <nav className={`${menuOpen ? 'flex flex-col pb-3' : 'hidden'} md:flex md:flex-row md:items-center gap-1 py-1`}>
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              href={`/${cat.toLowerCase()}`}
              className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white px-3 py-2 rounded hover:bg-white/5 transition-colors"
            >
              {CATEGORY_LABELS[cat]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
