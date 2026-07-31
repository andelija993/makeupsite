# Luxury Makeup Artist Website

Production-ready Next.js 15 website for a professional makeup artist with booking, portfolio, blog, contact, and protected admin dashboard.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- PostgreSQL + Prisma ORM
- Server Actions + API Routes
- Vercel Blob upload integration

## Setup

1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate Prisma client and run migration:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
4. Seed admin user:
   ```bash
   npm run seed
   ```
5. Start dev server:
   ```bash
   npm run dev
   ```

Admin login defaults to `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`.

## Features

- Premium public pages: home, about, portfolio, services, booking, blog, contact
- Booking calendar + availability slots + booking status workflows
- Booking notifications via email
- Protected admin panel:
  - Overview
  - Bookings
  - Availability
  - Portfolio CRUD
  - Blog CRUD
  - Services CRUD
- SEO metadata, Open Graph image, robots, sitemap
- Google Analytics support via `NEXT_PUBLIC_GA_ID`
