# FinCal — Retirement Planning Calculator

Built for the FinCal Innovation Hackathon, co-sponsored by HDFC Mutual Fund at TECHNEX '26, IIT BHU.

## About
An interactive, investor-friendly retirement planning calculator that helps everyday investors 
understand how much they need to save for retirement — without the boring spreadsheet UI.

## Calculator Type
Retirement Planning Calculator

## Features
- Retirement corpus estimator
- Required monthly SIP calculator
- Retirement Readiness Score (0–100)
- Wealth projection chart
- 3 market scenario comparisons (Conservative / Moderate / Optimistic)
- Lifestyle preference presets
- Fully responsive — works on mobile, tablet, desktop

## Formulas Used

### Step 1 — Inflate Annual Expenses
Retirement Expense = Current Expense × (1 + Inflation Rate)^(Years to Retirement)

### Step 2 — Required Retirement Corpus
Corpus = Annual Expense × [(1 − (1 + r)^−t) ÷ r]
- r = Post-retirement annual return
- t = Expected retirement duration (years)

### Step 3 — Required Monthly SIP
SIP = Gap × r ÷ [((1 + r)^n − 1) × (1 + r)]
- r = Monthly pre-retirement return
- n = Months to retirement
- Gap = Required corpus − Current savings (compounded)

## Assumptions
All assumptions are user-editable and clearly disclosed:
- Inflation Rate (default: 6%)
- Pre-Retirement Return (default: 12%)
- Post-Retirement Return (default: 7%)
- Retirement Duration (default: 20 years)
- Results are illustrative only — not a guarantee of future returns

## Tech Stack
- Next.js 15.5.12
- TypeScript
- Tailwind CSS
- Recharts
- Framer Motion

## Run Locally

**Prerequisites:** Node.js 22.11.0, NPM 10.9.0

1. Clone the repo: `git clone https://github.com/shryzdubey/FINCAL.git`
2. Install dependencies: `npm install`
3. Run the app: `npm run dev`
4. Open http://localhost:3000

## Compliance Disclaimer
This tool has been designed for information purposes only. Actual results may vary 
depending on various factors involved in capital market. Investor should not consider 
above as a recommendation for any schemes of HDFC Mutual Fund. Past performance may 
or may not be sustained in future and is not a guarantee of any future returns.
