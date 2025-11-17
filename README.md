# HarvestLink 🌾

A modern, farmer-focused SaaS marketplace and management system inspired by fintech dashboards. Built as an accessible, mobile-first PWA featuring glassmorphism UI, live dashboards, co-op tooling, and mocked integrations for Supabase + M-Pesa workflows.

## Features
- Landing hero with dual CTA, testimonials, FAQ, and multilingual footer.
- Farmer dashboard with KPI cards, AI market insights, real-time chart, inventory bars, deal pipeline, and logistics bids.
- Operations suite: produce listings CRUD, wallet ledger, accounting, buyers marketplace, and Supabase-ready chat/co-op tools.
- Alerts, settings with dark mode, Supabase schema reference, and floating "+ Add Produce" FAB.
- Offline-first via service worker, manifest, and local mock data.

## Getting Started
This project is fully static—open `index.html` in any modern browser or serve locally:

```bash
python3 -m http.server 4173
```

Then navigate to `http://localhost:4173`.

## Tech Notes
- Styling via CSS custom properties (Inter / Poppins) with gradients and glassmorphism.
- Charts rendered with vanilla Canvas APIs.
- Service worker caches key assets for offline drafts.
- `data.js` centralizes mock datasets, Supabase schema, and M-Pesa timelines.
- `app.js` wires UI interactions (filters, Kanban, chat simulator, MPESA simulation, PWA registration).

Configure actual Supabase + M-Pesa keys in `.env` or via the Wallet form when integrating with live services.
