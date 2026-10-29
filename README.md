# BiasharaSmart AI

AI-assisted business management MVP for small businesses.

## MVP v0.1
- Dashboard with sample business metrics
- Customer list with add-customer form
- Product/service catalog with add-product form
- Orders list with sample records
- AI marketing-copy demo (template-based; not connected to an AI provider)
- Responsive layout for desktop and mobile browsers

## Important prototype notes
- Data is currently held in React state and resets when the page reloads.
- No real authentication, cloud database, payment processing, WhatsApp integration, or live AI API is connected yet.
- Sample metrics and orders are demonstration data, not real sales.
- Do not enter real customer personal data into this prototype.

## Requirements
- Node.js 20.19+ or 22.12+
- npm
- A modern browser

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Planned next milestones
1. Validate the workflow with a few consenting small-business owners.
2. Add persistent database storage and authentication.
3. Add role-based access and database security policies.
4. Add invoices and downloadable PDF documents.
5. Integrate an approved AI provider with usage limits and user review.
6. Add Android packaging with Capacitor after the web MVP is stable.
7. Integrate payment providers only after legal, pricing, and provider requirements are reviewed.
