# BeautyBell — Premium Luxury Cosmetics

A responsive e-commerce website for BeautyBell, a premium luxury cosmetic brand. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Landing page** with hero, category showcase, featured products, brand story, testimonials, and newsletter
- **About page** with brand story, founder message, values, and team
- **Contact page** with form, customer service info, FAQ, and social links
- **Product pages** with image gallery, shade selector, add to cart, reviews, and related products
- **Category pages** for Face, Eyes, Lips, and Skincare
- Fully responsive design (mobile-first)
- SEO-friendly meta tags and semantic HTML
- Accessible navigation and form controls (WCAG-oriented)

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 7

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Deploy to Vercel

### Option 1: Vercel Dashboard

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Vite — no extra config needed
4. Click **Deploy**

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts. For production:

```bash
vercel --prod
```

The included `vercel.json` configures SPA routing so all paths serve `index.html`.

## Project Structure

```
src/
├── components/
│   ├── home/       # Homepage sections
│   ├── layout/     # Header, Footer, Layout
│   ├── product/    # Product cards, ratings, shades
│   └── ui/         # Button, SEO
├── context/        # Cart state
├── data/           # Product catalog
├── pages/          # Route pages
└── types/          # TypeScript interfaces
```

## Customization

### Products

Edit `src/data/products.ts` to add or update products, categories, and reviews.

### Colors & Typography

Design tokens live in `src/index.css` under `@theme`:

- Brand maroon: `#6b0f24`
- Logo mark **BB**: Kenao Sans Serif (`public/fonts/`)
- Wordmark **Beauty Bell**: Agrandir Grand (`public/fonts/`)
- UI body: Outfit (Google Fonts)

Add your licensed WOFF2 files as described in `public/fonts/README.md`. The header and footer use the shared `Logo` component in `src/components/brand/Logo.tsx`.

### CMS Integration (Optional)

To connect a headless CMS (Contentful, Sanity, etc.):

1. Install the CMS SDK
2. Replace static data in `src/data/products.ts` with API fetches
3. Add environment variables in Vercel project settings

## License

Private — BeautyBell © 2026
