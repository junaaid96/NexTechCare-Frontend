# NexTechCare — Frontend

Technology support marketplace: software, hardware, consultancy, data recovery, networking, cybersecurity, cloud & backup, device setup, smart home and remote support.

**Live:** https://nextechcare.netlify.app · **API:** https://nextechcare-backend.vercel.app · [Backend repo](https://github.com/junaaid96/NexTechCare-Backend)

## Standout features
1. **AI Issue Triage**: describe a problem in plain words and get the category, urgency, safe first steps and best-matched services (Groq LLM, with a rule-based fallback).
2. **Live SLA Tracker**: every booking has a stepper (Requested → Accepted → In progress → Resolved), an SLA countdown and a timeline with engineer notes. It auto-refreshes.
3. **Engineer Trust Score**: a transparent 0–100 score from ratings, completion rate, response speed and admin verification. It powers sorting, the admin leaderboard and the workload view.

Role dashboards: Customer (bookings, pending actions), Engineer (job queue, services, trust), Admin (KPIs, trends, demand by category, bulk approvals, verification, inbox, activity).

## Stack
Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · lucide-react · sonner. Dark and light themes, mobile-first, reduced-motion aware.

## Run locally
```bash
cp .env.example .env.local      # NEXT_PUBLIC_API_URL=http://localhost:8000
npm install
npm run dev                     # http://localhost:3000
```
Run the backend locally on port 8000 (see the backend README).

## Environment
| Name | Local | Netlify |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | `https://nextechcare-backend.vercel.app` |

It is inlined at build time, so redeploy after changing it. If it's unset, production builds fall back to the Vercel API URL.

---
Designed & engineered by [CodeJBorg](https://junaidul.pro.bd/codejborg).
