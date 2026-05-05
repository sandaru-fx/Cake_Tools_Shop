# 🎂 CakeCraft Tools Shop (React + Vite)

Premium UI cake tools shop with a modern public storefront and an admin dashboard.

## Features
- **Public site**: Home, Shop, Product details, Cart, About, Contact
- **Premium UI**: design tokens, subtle motion, dark/light mode, accessible focus states
- **Admin dashboard** (`/admin`)
  - Products CRUD (localStorage)
  - Orders list + status updates (localStorage)
  - API / Integrations settings (WhatsApp number, placeholders for API/webhooks)

## Tech Stack
- React + Vite
- React Router
- React Icons

## Run locally
```bash
npm install
npm run dev
```

## Routes
- Public: `/`, `/products`, `/product/:id`, `/cart`, `/about`, `/contact`
- Admin: `/admin`, `/admin/products`, `/admin/orders`, `/admin/api`

## Notes
- Admin data is stored in **localStorage** (demo mode). You can connect a real backend later.
