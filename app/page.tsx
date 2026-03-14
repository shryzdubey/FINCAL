'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import InputPanel from '@/components/InputPanel';
import ResultsDashboard from '@/components/ResultsDashboard';
import ComplianceFooter from '@/components/ComplianceFooter';
import { RetirementInputs, RetirementPlanResult, calculateRetirementPlan } from '@/src/lib/retirementMath';

export default function Home() {
  const [inputs, setInputs] = useState<RetirementInputs>({
    currentAge: 30,
    retirementAge: 60,
    retirementDuration: 20,
    currentAnnualExpenses: 600000,
    inflationRate: 6,
    preRetirementReturn: 12,
    postRetirementReturn: 7,
    currentSavings: 500000,
    currentMonthlySIP: 5000,
  });

  const [results, setResults] = useState<{
    data: RetirementPlanResult;
    calculationInputs: RetirementInputs;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = () => {
    setIsLoading(true);
    
    // Simulate loading for UX (300-500ms as requested)
    setTimeout(() => {
      const calculationResults = calculateRetirementPlan(inputs);

      setResults({
        data: calculationResults,
        calculationInputs: { ...inputs }
      });
      
      setIsLoading(false);

      // Scroll to results on mobile for better UX
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setTimeout(() => {
          document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }, 450);
  };

  return (
    <main className="main-content">
      <Header />
      
      <div className="container py-12">
        <div className="grid lg-grid-layout">
          {/* Left Input Panel */}
          <div className="input-section">
            <InputPanel 
              inputs={inputs} 
              setInputs={setInputs} 
              onCalculate={handleCalculate}
              isLoading={isLoading}
            />
          </div>

          {/* Right Results Dashboard */}
          <div className="results-section">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] card">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#224c87] mb-4"></div>
                <p className="text-[#919090] font-medium">Calculating your retirement plan...</p>
              </div>
            ) : results ? (
              <ResultsDashboard 
                inputs={results.calculationInputs} 
                results={results.data} 
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] card text-center p-8">
                <div className="bg-blue-50 p-6 rounded-full mb-6">
                  <svg className="w-12 h-12 text-[#224c87]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#224c87] mb-2">Ready to plan?</h2>
                <p className="text-[#919090] max-w-xs mx-auto">
                  Adjust your details on the left and click calculate to see your personalized retirement roadmap.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ComplianceFooter />
    </main>
  );
}
