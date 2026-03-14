'use client';

import React, { useState } from 'react';
import { Info, HelpCircle, Wallet, TrendingUp, Calendar, Target, ArrowRight } from 'lucide-react';

import { RetirementInputs } from '@/src/lib/retirementMath';

interface LifestyleOption {
  id: string;
  label: string;
  amount: number;
  description: string;
}

const LIFESTYLE_OPTIONS: LifestyleOption[] = [
  {
    id: 'basic',
    label: 'Basic',
    amount: 400000,
    description: 'Essential needs covered',
  },
  {
    id: 'comfortable',
    label: 'Comfortable',
    amount: 800000,
    description: 'Balanced lifestyle',
  },
  {
    id: 'luxury',
    label: 'Luxury',
    amount: 1500000,
    description: 'Premium living',
  },
];

interface TooltipProps {
  text: string;
}

const Tooltip = ({ text }: TooltipProps) => (
  <div className="group relative inline-block ml-1.5">
    <button 
      type="button"
      className="focus:outline-none focus:ring-2 focus:ring-[#224c87] rounded-full"
      aria-label="More information"
    >
      <HelpCircle size={14} className="text-[#919090] cursor-help" />
    </button>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-56 p-3 bg-[#224c87] text-white text-[11px] rounded-xl shadow-2xl z-50 leading-relaxed">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#224c87]"></div>
    </div>
  </div>
);

interface InputPanelProps {
  inputs: RetirementInputs;
  setInputs: React.Dispatch<React.SetStateAction<RetirementInputs>>;
  onCalculate: () => void;
  isLoading?: boolean;
}

export default function InputPanel({ inputs, setInputs, onCalculate, isLoading }: InputPanelProps) {
  const [selectedLifestyle, setSelectedLifestyle] = useState<string | null>(null);

  const updateInput = (key: keyof RetirementInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleLifestyleSelect = (option: LifestyleOption) => {
    setSelectedLifestyle(option.id);
    updateInput('currentAnnualExpenses', option.amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate();
  };

  return (
    <div id="input-panel-container" className="card border-none shadow-2xl shadow-blue-900/5 p-8 md:p-10">
      <form onSubmit={handleSubmit} className="space-y-12">
        
        {/* SECTION A — PERSONAL DETAILS */}
        <section id="section-personal-details" aria-labelledby="heading-personal-details">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-8 bg-[#224c87] rounded-full"></div>
            <h2 id="heading-personal-details" className="text-lg font-bold text-[#224c87] font-montserrat tracking-tight">
              Personal Profile
            </h2>
          </div>
          
          <div className="space-y-10">
            {/* Current Age */}
            <div className="input-group mb-0">
              <div className="flex justify-between items-center mb-5">
                <label htmlFor="current-age" className="text-[11px] font-bold text-[#64748b] uppercase tracking-[0.15em] flex items-center">
                  <Calendar size={14} className="mr-2 text-[#224c87]" />
                  Current Age
                  <Tooltip text="Your current age in years. Minimum age for planning is 18." />
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="current-age-number"
                    type="number"
                    value={inputs.currentAge}
                    onChange={(e) => updateInput('currentAge', Math.max(18, Math.min(70, Number(e.target.value))))}
                    className="w-20 h-11 text-center border-2 border-gray-100 rounded-xl font-bold text-[#224c87] focus:border-[#224c87] focus:bg-white bg-gray-50 outline-none transition-all"
                    min="18"
                    max="70"
                  />
                  <span className="text-[10px] font-bold text-[#919090] uppercase tracking-widest">yrs</span>
                </div>
              </div>
              <input
                id="current-age"
                type="range"
                min="18"
                max="70"
                value={inputs.currentAge}
                onChange={(e) => updateInput('currentAge', Number(e.target.value))}
                className="range-slider"
              />
            </div>

            {/* Retirement Age */}
            <div className="input-group mb-0">
              <div className="flex justify-between items-center mb-5">
                <label htmlFor="retirement-age" className="text-[11px] font-bold text-[#64748b] uppercase tracking-[0.15em] flex items-center">
                  <Target size={14} className="mr-2 text-[#224c87]" />
                  Retirement Age
                  <Tooltip text="The age at which you plan to stop working. Most people choose 58-60." />
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="retirement-age-number"
                    type="number"
                    value={inputs.retirementAge}
                    onChange={(e) => updateInput('retirementAge', Math.max(40, Math.min(80, Number(e.target.value))))}
                    className="w-20 h-11 text-center border-2 border-gray-100 rounded-xl font-bold text-[#224c87] focus:border-[#224c87] focus:bg-white bg-gray-50 outline-none transition-all"
                    min="40"
                    max="80"
                  />
                  <span className="text-[10px] font-bold text-[#919090] uppercase tracking-widest">yrs</span>
                </div>
              </div>
              <input
                id="retirement-age"
                type="range"
                min="40"
                max="80"
                value={inputs.retirementAge}
                onChange={(e) => updateInput('retirementAge', Number(e.target.value))}
                className="range-slider"
              />
            </div>

            {/* Retirement Duration */}
            <div className="input-group mb-0">
              <div className="flex justify-between items-center mb-5">
                <label htmlFor="retirement-duration" className="text-[11px] font-bold text-[#64748b] uppercase tracking-[0.15em] flex items-center">
                  <TrendingUp size={14} className="mr-2 text-[#224c87]" />
                  Years in Retirement
                  <Tooltip text="How many years you expect to live after retirement. Average is 20-30 years." />
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="retirement-duration-number"
                    type="number"
                    value={inputs.retirementDuration}
                    onChange={(e) => updateInput('retirementDuration', Math.max(5, Math.min(50, Number(e.target.value))))}
                    className="w-20 h-11 text-center border-2 border-gray-100 rounded-xl font-bold text-[#224c87] focus:border-[#224c87] focus:bg-white bg-gray-50 outline-none transition-all"
                    min="5"
                    max="50"
                  />
                  <span className="text-[10px] font-bold text-[#919090] uppercase tracking-widest">yrs</span>
                </div>
              </div>
              <input
                id="retirement-duration"
                type="range"
                min="5"
                max="50"
                value={inputs.retirementDuration}
                onChange={(e) => updateInput('retirementDuration', Number(e.target.value))}
                className="range-slider"
              />
            </div>
          </div>
        </section>

        {/* SECTION B — FINANCIALS */}
        <section id="section-financials" aria-labelledby="heading-financials">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-8 bg-[#224c87] rounded-full"></div>
            <h2 id="heading-financials" className="text-lg font-bold text-[#224c87] font-montserrat tracking-tight">
              Financial Status
            </h2>
          </div>
          
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label htmlFor="current-savings" className="text-[11px] font-bold text-[#64748b] uppercase tracking-[0.15em] flex items-center">
                  <Wallet size={14} className="mr-2 text-[#224c87]" />
                  Existing Savings
                  <Tooltip text="Total amount saved specifically for retirement across all assets." />
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#919090] font-bold">₹</span>
                  <input
                    id="current-savings"
                    type="number"
                    value={inputs.currentSavings}
                    onChange={(e) => updateInput('currentSavings', Number(e.target.value))}
                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-[#224c87] focus:bg-white focus:border-[#224c87] outline-none transition-all text-lg"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label htmlFor="current-sip" className="text-[11px] font-bold text-[#64748b] uppercase tracking-[0.15em] flex items-center">
                  <TrendingUp size={14} className="mr-2 text-[#224c87]" />
                  Monthly SIP
                  <Tooltip text="Your current monthly investment towards retirement corpus." />
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#919090] font-bold">₹</span>
                  <input
                    id="current-sip"
                    type="number"
                    value={inputs.currentMonthlySIP}
                    onChange={(e) => updateInput('currentMonthlySIP', Number(e.target.value))}
                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-[#224c87] focus:bg-white focus:border-[#224c87] outline-none transition-all text-lg"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-[0.15em] flex items-center">
                Lifestyle Preference
                <Tooltip text="Select a lifestyle that matches your expected retirement spending. This sets your baseline annual expenses." />
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {LIFESTYLE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleLifestyleSelect(option)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 group ${
                      selectedLifestyle === option.id 
                        ? 'border-[#224c87] bg-blue-50/50 shadow-lg shadow-blue-900/5' 
                        : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                  >
                    <div className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-3 transition-colors ${
                      selectedLifestyle === option.id ? 'text-[#224c87]' : 'text-[#919090]'
                    }`}>
                      {option.label}
                    </div>
                    <div className="text-2xl font-bold text-[#224c87] mb-2 tracking-tight">₹{(option.amount / 1000).toFixed(0)}k</div>
                    <div className="text-[10px] text-[#64748b] leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                      {option.description}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100/50 flex items-center justify-between">
                      <span className="text-[9px] font-bold text-[#919090] uppercase">Per Year</span>
                      {selectedLifestyle === option.id && (
                        <div className="w-2 h-2 rounded-full bg-[#224c87]"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION C — ASSUMPTIONS */}
        <section id="section-assumptions" aria-labelledby="heading-assumptions">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-8 bg-[#da3832] rounded-full"></div>
            <h2 id="heading-assumptions" className="text-lg font-bold text-[#da3832] font-montserrat tracking-tight">
              Assumptions
            </h2>
          </div>

          <div className="space-y-10">
            {/* Inflation */}
            <div className="input-group mb-0">
              <div className="flex justify-between items-center mb-5">
                <label htmlFor="inflation-rate" className="text-[11px] font-bold text-[#64748b] uppercase tracking-[0.15em] flex items-center">
                  Inflation Rate
                  <Tooltip text="Expected annual increase in cost of living. Historical average in India is 5-7%." />
                </label>
                <span className="text-sm font-bold text-[#da3832]">{inputs.inflationRate}%</span>
              </div>
              <input
                id="inflation-rate"
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={inputs.inflationRate}
                onChange={(e) => updateInput('inflationRate', Number(e.target.value))}
                className="range-slider accent-red-slider"
              />
            </div>

            {/* Pre-Retirement Return */}
            <div className="input-group mb-0">
              <div className="flex justify-between items-center mb-5">
                <label htmlFor="pre-return" className="text-[11px] font-bold text-[#64748b] uppercase tracking-[0.15em] flex items-center">
                  Pre-Retirement Returns
                  <Tooltip text="Annual return on investments before retirement. Typically 10-14% for equity-heavy portfolios." />
                </label>
                <span className="text-sm font-bold text-[#224c87]">{inputs.preRetirementReturn}%</span>
              </div>
              <input
                id="pre-return"
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={inputs.preRetirementReturn}
                onChange={(e) => updateInput('preRetirementReturn', Number(e.target.value))}
                className="range-slider"
              />
            </div>

            {/* Post-Retirement Return */}
            <div className="input-group mb-0">
              <div className="flex justify-between items-center mb-5">
                <label htmlFor="post-return" className="text-[11px] font-bold text-[#64748b] uppercase tracking-[0.15em] flex items-center">
                  Post-Retirement Returns
                  <Tooltip text="Annual return on investments after retirement. Usually lower (6-9%) as portfolios shift to debt." />
                </label>
                <span className="text-sm font-bold text-[#224c87]">{inputs.postRetirementReturn}%</span>
              </div>
              <input
                id="post-return"
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={inputs.postRetirementReturn}
                onChange={(e) => updateInput('postRetirementReturn', Number(e.target.value))}
                className="range-slider"
              />
            </div>
          </div>
        </section>

        <div className="pt-4">
          <button
            id="btn-calculate"
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#224c87] text-white font-bold py-6 rounded-2xl hover:bg-[#1a3a68] transition-all shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-4 disabled:opacity-70 active:scale-[0.98] text-lg group"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Generate Retirement Roadmap</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        <div className="pt-8 border-t border-gray-100 flex gap-4 text-[#919090]">
          <Info size={16} className="shrink-0 mt-0.5 text-[#224c87]" />
          <p className="text-[11px] leading-relaxed italic">
            Calculations are based on the assumptions provided. Market returns are subject to volatility. Please consult a qualified financial advisor for personalized investment guidance.
          </p>
        </div>
      </form>
    </div>
  );
}
