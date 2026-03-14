'use client';

import React from 'react';
import { 
  Target, 
  TrendingUp, 
  Info, 
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Line
} from 'recharts';
import { motion } from 'motion/react';
import { RetirementInputs, RetirementPlanResult, formatCurrency, calculateRetirementPlan } from '@/src/lib/retirementMath';
import RetirementTimeline from './RetirementTimeline';

interface ResultsDashboardProps {
  inputs: RetirementInputs;
  results: RetirementPlanResult;
}

export default function ResultsDashboard({ inputs, results }: ResultsDashboardProps) {
  // Generate dynamic chart data
  const chartData = React.useMemo(() => {
    const data = [];
    const yearsToRetirement = Math.max(0, inputs.retirementAge - inputs.currentAge);
    const monthlyRate = (inputs.preRetirementReturn / 100) / 12;
    const annualRate = inputs.preRetirementReturn / 100;
    const monthlySIP = inputs.currentMonthlySIP;
    
    for (let i = 0; i <= yearsToRetirement; i += 2) {
      const age = inputs.currentAge + i;
      const months = i * 12;
      
      const savingsGrowth = inputs.currentSavings * Math.pow(1 + annualRate, i);
      
      let sipGrowth = 0;
      if (months > 0) {
        if (monthlyRate === 0) {
          sipGrowth = monthlySIP * months;
        } else {
          sipGrowth = monthlySIP * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        }
      }
      
      const totalSavings = savingsGrowth + sipGrowth;
      const targetCurve = results.retirementCorpus * Math.pow(i / (yearsToRetirement || 1), 2.5);

      data.push({
        age,
        savings: Math.round(totalSavings),
        target: Math.round(targetCurve)
      });
    }

    if (yearsToRetirement % 2 !== 0 || data.length === 0) {
      data.push({
        age: inputs.retirementAge,
        savings: Math.round(results.projectedCorpus),
        target: Math.round(results.retirementCorpus)
      });
    }

    return data;
  }, [inputs, results]);

  const readinessScore = results.readinessScore;

  const getReadinessStatus = (score: number) => {
    if (score >= 90) return { label: 'Well Prepared', color: 'bg-green-50 text-green-700 border-green-100', icon: <CheckCircle2 size={14} />, text: 'You are on a great track! Stay consistent with your current plan.' };
    if (score >= 70) return { label: 'On Track', color: 'bg-blue-50 text-blue-700 border-blue-100', icon: <Info size={14} />, text: 'You are doing well, but a small increase in SIP could make your retirement even more secure.' };
    if (score >= 50) return { label: 'Needs Attention', color: 'bg-amber-50 text-amber-700 border-amber-100', icon: <AlertCircle size={14} />, text: 'You might face a shortfall. Consider increasing your monthly investment or delaying retirement.' };
    return { label: 'Action Required', color: 'bg-red-50 text-red-700 border-red-100', icon: <AlertCircle size={14} />, text: 'Significant gap detected. We recommend increasing your SIP or reducing expected retirement expenses.' };
  };

  const status = getReadinessStatus(readinessScore);
  const lifeExpectancy = inputs.retirementAge + inputs.retirementDuration;

  const scenarios = [
    { name: 'Conservative', pre: 10, post: 5 },
    { name: 'Moderate', pre: 12, post: 7 },
    { name: 'Optimistic', pre: 14, post: 9 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* INSIGHT ALERT */}
      <motion.div variants={itemVariants} className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 flex gap-4 items-start">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#224c87] shrink-0">
          <Info size={20} />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold text-[#224c87] uppercase tracking-wider">Inflation Insight</p>
          <p className="text-sm text-[#334155] leading-relaxed">
            Your current annual expenses of <span className="font-bold">{formatCurrency(inputs.currentAnnualExpenses)}</span> may grow to <span className="font-bold text-[#da3832]">{formatCurrency(results.inflatedExpense)}</span> by retirement if inflation averages {inputs.inflationRate}%.
          </p>
        </div>
      </motion.div>

      {/* KEY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="card border-none shadow-xl shadow-blue-900/5 flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-1">
              <h3 className="text-[10px] font-bold text-[#919090] uppercase tracking-widest">Target Corpus</h3>
              <p className="text-2xl font-bold text-[#224c87] tracking-tight">{formatCurrency(results.retirementCorpus)}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#224c87] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target size={20} />
            </div>
          </div>
          <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#919090] uppercase">Required by age {inputs.retirementAge}</span>
            <ArrowRight size={14} className="text-[#919090]" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card border-none shadow-xl shadow-blue-900/5 flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-1">
              <h3 className="text-[10px] font-bold text-[#919090] uppercase tracking-widest">Monthly SIP Required</h3>
              <p className="text-2xl font-bold text-[#224c87] tracking-tight">{formatCurrency(results.monthlySIP)}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#224c87] flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="pt-4 border-t border-gray-50">
            {results.monthlySIP > inputs.currentMonthlySIP ? (
              <div className="flex items-center gap-2 text-[#da3832]">
                <AlertCircle size={12} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Gap: {formatCurrency(results.monthlySIP - inputs.currentMonthlySIP)}/mo</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 size={12} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Plan is on track</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* READINESS SCORE */}
      <motion.div variants={itemVariants} className="card border-none shadow-xl shadow-blue-900/5">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="80" cy="80" r="72" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
              <motion.circle 
                cx="80" 
                cy="80" 
                r="72" 
                fill="transparent" 
                stroke="#224c87" 
                strokeWidth="12" 
                strokeDasharray={452.4}
                initial={{ strokeDashoffset: 452.4 }}
                animate={{ strokeDashoffset: 452.4 * (1 - readinessScore/100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#224c87]">{readinessScore}</span>
              <span className="text-[10px] font-bold text-[#919090] uppercase tracking-widest">Score</span>
            </div>
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${status.color}`}>
              {status.icon}
              {status.label}
            </div>
            <h3 className="text-xl font-bold text-[#224c87] font-montserrat tracking-tight">{status.text}</h3>
            <p className="text-sm text-[#919090] leading-relaxed">
              This score represents how close your current savings and investments are to meeting your retirement goal.
            </p>
          </div>
        </div>
      </motion.div>

      {/* TIMELINE */}
      <motion.div variants={itemVariants}>
        <RetirementTimeline 
          currentAge={inputs.currentAge}
          retirementAge={inputs.retirementAge}
          lifeExpectancy={lifeExpectancy}
        />
      </motion.div>

      {/* CHART */}
      <motion.div variants={itemVariants} className="card border-none shadow-xl shadow-blue-900/5">
        <div className="flex justify-between items-end mb-8">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#224c87] uppercase tracking-widest">Wealth Projection</h3>
            <p className="text-xs text-[#919090]">Estimated growth of your retirement corpus over time.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#224c87]"></div>
              <span className="text-[10px] font-bold text-[#919090] uppercase">Savings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#da3832] opacity-30"></div>
              <span className="text-[10px] font-bold text-[#919090] uppercase">Target</span>
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#224c87" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#224c87" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="age" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#919090', fontWeight: 'bold' }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#919090', fontWeight: 'bold' }}
                tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '12px' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                labelStyle={{ fontSize: '10px', color: '#919090', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                formatter={(value: number) => [`₹${(value / 10000000).toFixed(2)} Cr`, '']}
                labelFormatter={(label) => `Age ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="savings" 
                stroke="#224c87" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorSavings)" 
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#da3832" 
                strokeWidth={2} 
                strokeDasharray="6 6"
                dot={false}
                opacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* SCENARIOS */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-[#224c87] rounded-full"></div>
            <h3 className="text-sm font-bold text-[#224c87] uppercase tracking-widest">Market Scenarios</h3>
          </div>
          <p className="text-[10px] font-bold text-[#919090] uppercase tracking-widest">Pre / Post Retirement Returns</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {scenarios.map((scenario) => {
            const scenarioResult = calculateRetirementPlan({
              ...inputs,
              preRetirementReturn: scenario.pre,
              postRetirementReturn: scenario.post
            });

            const isModerate = scenario.name === 'Moderate';

            return (
              <div 
                key={scenario.name}
                className={`p-8 rounded-3xl border-2 transition-all flex flex-col justify-between h-full ${
                  isModerate 
                    ? 'border-[#224c87] bg-blue-50/20 shadow-lg shadow-blue-900/5' 
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                      isModerate ? 'bg-[#224c87] text-white' : 'bg-gray-100 text-[#919090]'
                    }`}>
                      {scenario.name}
                    </span>
                    <div className="text-[10px] font-bold text-[#919090]">{scenario.pre}% / {scenario.post}%</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-[9px] font-bold text-[#919090] uppercase tracking-wider mb-1">Target Corpus</p>
                      <p className="text-xl font-bold text-[#224c87] tracking-tight">{formatCurrency(scenarioResult.retirementCorpus)}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-[#919090] uppercase tracking-wider mb-1">Monthly SIP</p>
                      <p className="text-sm font-bold text-[#334155]">{formatCurrency(scenarioResult.monthlySIP)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100/50">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${isModerate ? 'bg-[#224c87]' : 'bg-gray-300'}`}></div>
                    <p className="text-[9px] font-bold text-[#919090] uppercase tracking-widest">
                      {isModerate ? 'Recommended Strategy' : 'Alternative View'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
