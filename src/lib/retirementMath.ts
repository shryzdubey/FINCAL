/**
 * Retirement Planning Calculation Module
 * Implements financial formulas for retirement corpus and SIP estimation.
 */

export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  retirementDuration: number;
  currentAnnualExpenses: number;
  inflationRate: number;
  preRetirementReturn: number;
  postRetirementReturn: number;
  currentSavings: number;
  currentMonthlySIP: number;
}

export interface RetirementPlanResult {
  inflatedExpense: number;
  retirementCorpus: number;
  monthlySIP: number;
  projectedCorpus: number;
  readinessScore: number;
}

/**
 * Calculates the retirement plan based on user inputs.
 * 
 * @param inputs - Object containing age, expenses, and return assumptions.
 * @returns Object containing inflated expenses, required corpus, and monthly SIP.
 */
export function calculateRetirementPlan(inputs: RetirementInputs): RetirementPlanResult {
  const {
    currentAge,
    retirementAge,
    retirementDuration,
    currentAnnualExpenses,
    inflationRate,
    preRetirementReturn,
    postRetirementReturn,
    currentSavings,
    currentMonthlySIP,
  } = inputs;

  // Step 1: Calculate years to retirement
  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  const monthsToRetirement = yearsToRetirement * 12;
  const rPreAnnual = preRetirementReturn / 100;
  const rPreMonthly = rPreAnnual / 12;

  // Step 2: Inflate expenses until retirement
  const inflatedExpense = currentAnnualExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);

  // Step 3: Calculate required retirement corpus (Inflation-adjusted Annuity)
  const rPost = postRetirementReturn / 100;
  const iRate = inflationRate / 100;
  const t = retirementDuration;
  
  // Real rate of return during retirement
  const realRate = (1 + rPost) / (1 + iRate) - 1;
  
  let retirementCorpus = 0;
  if (Math.abs(realRate) < 0.0001) {
    retirementCorpus = inflatedExpense * t;
  } else {
    // Annuity Due formula (withdrawal at start of year) with real rate
    retirementCorpus = inflatedExpense * ((1 - Math.pow(1 + realRate, -t)) / realRate) * (1 + realRate);
  }

  // Step 4: Calculate Projected Corpus based on CURRENT savings and SIP
  const fvCurrentSavings = currentSavings * Math.pow(1 + rPreAnnual, yearsToRetirement);
  let fvCurrentSIP = 0;
  if (monthsToRetirement > 0) {
    if (rPreMonthly === 0) {
      fvCurrentSIP = currentMonthlySIP * monthsToRetirement;
    } else {
      fvCurrentSIP = currentMonthlySIP * ((Math.pow(1 + rPreMonthly, monthsToRetirement) - 1) / rPreMonthly) * (1 + rPreMonthly);
    }
  }
  const projectedCorpus = fvCurrentSavings + fvCurrentSIP;

  // Step 5: Calculate Required Monthly SIP to bridge the gap
  const gap = Math.max(0, retirementCorpus - fvCurrentSavings);
  let requiredMonthlySIP = 0;
  if (monthsToRetirement > 0) {
    if (rPreMonthly === 0) {
      requiredMonthlySIP = gap / monthsToRetirement;
    } else {
      requiredMonthlySIP = (gap * rPreMonthly) / ((Math.pow(1 + rPreMonthly, monthsToRetirement) - 1) * (1 + rPreMonthly));
    }
  }

  // Step 6: Calculate Readiness Score
  // Formula: (Projected Savings ÷ Required Corpus) × 100
  const readinessScore = Math.min(100, Math.round((projectedCorpus / retirementCorpus) * 100)) || 0;

  return {
    inflatedExpense,
    retirementCorpus,
    monthlySIP: requiredMonthlySIP,
    projectedCorpus,
    readinessScore,
  };
}

/**
 * Formats a numeric value into Indian currency strings (Cr, L, K).
 * 
 * @param value - The numeric value to format.
 * @returns Formatted string (e.g., ₹3.65 Cr, ₹10.4K, ₹34.46 L).
 */
export function formatCurrency(value: number): string {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  } else if (value >= 1000) {
    return `₹${(value / 1000).toFixed(1)}K`;
  } else {
    return `₹${Math.round(value).toLocaleString('en-IN')}`;
  }
}
