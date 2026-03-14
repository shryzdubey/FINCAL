'use client';

import React from 'react';

interface RetirementTimelineProps {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
}

export default function RetirementTimeline({
  currentAge,
  retirementAge,
  lifeExpectancy,
}: RetirementTimelineProps) {
  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  const retirementDuration = Math.max(0, lifeExpectancy - retirementAge);
  const totalYears = yearsToRetirement + retirementDuration;

  const workingPercent = totalYears > 0 ? (yearsToRetirement / totalYears) * 100 : 0;
  const retirementPercent = totalYears > 0 ? (retirementDuration / totalYears) * 100 : 0;

  return (
    <div className="card border-none shadow-xl shadow-blue-900/5 overflow-hidden">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1 h-6 bg-[#224c87] rounded-full"></div>
        <h3 className="text-sm font-bold text-[#224c87] uppercase tracking-widest">Retirement Timeline</h3>
      </div>

      <div className="relative px-4 pb-12 pt-16">
        {/* Track Background */}
        <div className="h-2.5 w-full bg-gray-100 rounded-full flex overflow-hidden shadow-inner">
          <div className="h-full bg-[#224c87]/20 transition-all duration-1000" style={{ width: `${workingPercent}%` }} />
          <div className="h-full bg-[#da3832]/20 transition-all duration-1000" style={{ width: `${retirementPercent}%` }} />
        </div>

        {/* Markers */}
        <div className="absolute top-0 left-4 right-4 h-full pointer-events-none">
          {/* Current Age */}
          <div className="absolute top-0 left-0 -translate-x-1/2 flex flex-col items-center">
            <div className="mb-2 px-2.5 py-1 bg-white border border-gray-100 rounded-lg shadow-sm">
              <span className="text-xs font-bold text-[#224c87]">{currentAge}</span>
            </div>
            <div className="w-5 h-5 rounded-full border-4 border-white bg-[#224c87] shadow-md z-10"></div>
            <div className="h-16 w-px bg-gradient-to-b from-gray-300 to-transparent mt-1"></div>
            <span className="mt-2 text-[9px] font-bold text-[#919090] uppercase tracking-widest">Current</span>
          </div>

          {/* Retirement Age */}
          <div 
            className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-1000"
            style={{ left: `${workingPercent}%` }}
          >
            <div className="mb-2 px-2.5 py-1 bg-[#224c87] rounded-lg shadow-lg shadow-blue-900/20">
              <span className="text-xs font-bold text-white">{retirementAge}</span>
            </div>
            <div className="w-5 h-5 rounded-full border-4 border-white bg-[#224c87] shadow-md z-10"></div>
            <div className="h-16 w-px bg-gradient-to-b from-[#224c87]/50 to-transparent mt-1"></div>
            <span className="mt-2 text-[9px] font-bold text-[#224c87] uppercase tracking-widest">Retirement</span>
          </div>

          {/* Life Expectancy */}
          <div className="absolute top-0 left-full -translate-x-1/2 flex flex-col items-center">
            <div className="mb-2 px-2.5 py-1 bg-white border border-gray-100 rounded-lg shadow-sm">
              <span className="text-xs font-bold text-[#919090]">{lifeExpectancy}</span>
            </div>
            <div className="w-5 h-5 rounded-full border-4 border-white bg-[#919090] shadow-md z-10"></div>
            <div className="h-16 w-px bg-gradient-to-b from-gray-300 to-transparent mt-1"></div>
            <span className="mt-2 text-[9px] font-bold text-[#919090] uppercase tracking-widest">Expectancy</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-50">
        <div className="p-6 rounded-2xl bg-blue-50/30 border border-blue-50/50 group hover:bg-blue-50/50 transition-colors">
          <p className="text-[10px] font-bold text-[#224c87] uppercase tracking-widest mb-1">Working Phase</p>
          <p className="text-2xl font-bold text-[#224c87]">{yearsToRetirement} <span className="text-xs font-medium text-[#919090]">Years</span></p>
        </div>
        <div className="p-6 rounded-2xl bg-red-50/30 border border-red-50/50 group hover:bg-red-50/50 transition-colors">
          <p className="text-[10px] font-bold text-[#da3832] uppercase tracking-widest mb-1">Retirement Phase</p>
          <p className="text-2xl font-bold text-[#da3832]">{retirementDuration} <span className="text-xs font-medium text-[#919090]">Years</span></p>
        </div>
      </div>
    </div>
  );
}
