# FinCal — Retirement Planning Calculator

A retirement planning calculator built for the FinCal Innovation Hackathon,
co-sponsored by HDFC Mutual Fund at TECHNEX '26.

## About
An interactive, investor-friendly retirement planning calculator that helps
users estimate their retirement corpus and required monthly SIP.

## Tech Stack
- Next.js 15.5.12
- TypeScript
- Tailwind CSS
- Recharts

## Run Locally

**Prerequisites:** Node.js 22.11.0, NPM 10.9.0

1. Install dependencies: `npm install`
2. Run the app: `npm run dev`
3. Open http://localhost:3000

## Calculations Used
- Expense Inflation: Current Expense × (1 + Inflation)^Years
- Retirement Corpus: Annual Expense × [(1 − (1+r)^−t) ÷ r]
- Required SIP: Standard SIP accumulation formula

## Compliance
This tool is for investor education and awareness purposes only.
Not a recommendation for any HDFC Mutual Fund scheme.