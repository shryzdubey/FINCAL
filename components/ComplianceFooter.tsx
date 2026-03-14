'use client';

import React, { useState } from 'react';
import { Info, ChevronDown, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ComplianceFooter() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => setIsExpanded(!isExpanded);

  return (
    <footer className="mt-20 pb-12 border-t border-gray-100 pt-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* DISCLAIMER ACCORDION */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
          <button
            onClick={toggleAccordion}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-[#224c87]">
                <Info size={16} />
              </div>
              <span className="text-xs font-bold text-[#224c87] uppercase tracking-widest">Important Disclaimer</span>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={16} className="text-[#919090]" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-4 pb-4 pt-2">
                  <p className="text-xs text-[#919090] leading-relaxed italic border-l-2 border-[#224c87] pl-4">
                    &quot;This tool has been designed for information purposes only. Actual results may vary depending on various factors involved in capital market. Investor should not consider above as a recommendation for any schemes of HDFC Mutual Fund. Past performance may or may not be sustained in future and is not a guarantee of any future returns.&quot;
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FOOTER INFO */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#224c87] flex items-center justify-center text-white">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#224c87] tracking-tight">FinCal Retirement Planner</p>
              <p className="text-[10px] font-bold text-[#919090] uppercase tracking-widest">Version 2.0 • Secure & Private</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-bold text-[#919090] uppercase tracking-widest">
            <span className="hover:text-[#224c87] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#224c87] cursor-pointer transition-colors">Terms of Use</span>
            <span className="hover:text-[#224c87] cursor-pointer transition-colors">Security</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-[#919090] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} FinCal Financial Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
