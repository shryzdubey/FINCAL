'use client';

import React from 'react';
import { Wallet } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <div className="w-10 h-10 bg-[#224c87] rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
            <Wallet className="text-white" size={22} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#224c87] tracking-tight leading-none mb-1">FinCal</span>
            <span className="text-[10px] font-bold text-[#919090] uppercase tracking-[0.2em] leading-none">Retirement Planner</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-10">
          <Link 
            href="/" 
            className={`text-xs font-bold uppercase tracking-widest transition-colors ${pathname === '/' ? 'text-[#224c87]' : 'text-[#919090] hover:text-[#224c87]'}`}
          >
            Calculator
          </Link>
          <Link 
            href="/support" 
            className={`text-xs font-bold uppercase tracking-widest transition-colors ${pathname === '/support' ? 'text-[#224c87]' : 'text-[#919090] hover:text-[#224c87]'}`}
          >
            Support
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-xs font-bold text-[#224c87] uppercase tracking-widest hover:opacity-70 transition-opacity">
            Sign In
          </Link>
          <button className="bg-[#224c87] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#1a3a68] transition-all shadow-lg shadow-blue-900/10">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
