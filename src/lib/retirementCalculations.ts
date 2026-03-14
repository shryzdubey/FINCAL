/**
 * Retirement Planning Calculation Module
 * Provides granular functions for retirement planning.
 */

/**
 * Calculates the future value of annual expenses at the time of retirement.
 * Formula: FV = PV * (1 + r)^n
 */
export function calculateFutureExpense(currentAnnualExpenses: number, inflationRate: number, yearsToRetirement: number): number {
  return currentAnnualExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);
}

/**
 * Calculates the total retirement corpus required.
 * Uses an inflation-adjusted annuity model (Annuity Due).
 */
export function calculateRetirementCorpus(
  inflatedExpense: number, 
  postRetirementReturn: number, 
  inflationRate: number, 
  retirementDuration: number
): number {
  const rPost = postRetirementReturn / 100;
  const iRate = inflationRate / 100;
  const t = retirementDuration;
  
  // Real rate of return during retirement
  const realRate = (1 + rPost) / (1 + iRate) - 1;
  
  if (Math.abs(realRate) < 0.0001) {
    return inflatedExpense * t;
  }
  
  // Annuity Due formula (withdrawal at start of year) with real rate
  return inflatedExpense * ((1 - Math.pow(1 + realRate, -t)) / realRate) * (1 + realRate);
}

/**
 * Calculates the required monthly SIP to reach the target corpus.
 */
export function calculateMonthlySIP(
  targetCorpus: number, 
  currentSavings: number, 
  preRetirementReturn: number, 
  yearsToRetirement: number
): number {
  const monthsToRetirement = yearsToRetirement * 12;
  const rPreAnnual = preRetirementReturn / 100;
  const rPreMonthly = rPreAnnual / 12;

  // Future value of current savings
  const fvCurrentSavings = currentSavings * Math.pow(1 + rPreAnnual, yearsToRetirement);
  
  // Gap to be filled by SIP
  const gap = Math.max(0, targetCorpus - fvCurrentSavings);
  
  if (monthsToRetirement <= 0) return 0;
  
  if (rPreMonthly === 0) {
    return gap / monthsToRetirement;
  }
  
  // SIP formula: P = (FV * r) / (((1 + r)^n - 1) * (1 + r))
  return (gap * rPreMonthly) / ((Math.pow(1 + rPreMonthly, monthsToRetirement) - 1) * (1 + rPreMonthly));
}

/**
 * Helper to calculate projected corpus based on current SIP.
 */
export function calculateProjectedCorpus(
  currentSavings: number,
  currentMonthlySIP: number,
  preRetirementReturn: number,
  yearsToRetirement: number
): number {
  const monthsToRetirement = yearsToRetirement * 12;
  const rPreAnnual = preRetirementReturn / 100;
  const rPreMonthly = rPreAnnual / 12;

  const fvCurrentSavings = currentSavings * Math.pow(1 + rPreAnnual, yearsToRetirement);
  
  let fvCurrentSIP = 0;
  if (monthsToRetirement > 0) {
    if (rPreMonthly === 0) {
      fvCurrentSIP = currentMonthlySIP * monthsToRetirement;
    } else {
      fvCurrentSIP = currentMonthlySIP * ((Math.pow(1 + rPreMonthly, monthsToRetirement) - 1) / rPreMonthly) * (1 + rPreMonthly);
    }
  }
  
  return fvCurrentSavings + fvCurrentSIP;
}
