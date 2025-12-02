# Aching Kepret · Digital Scrapbook & Memory Match

A handcrafted, animated web experience built with Next.js 16 to celebrate Aching Kepret. It combines a vintage scrapbook aesthetic, scrolling photo gallery, photobooth keepsakes, a heartfelt letter, and a GSAP-powered memory card game that feels like a mini gift inside the gift.

## Highlights
- Animated landing page, horizontal scroll gallery, and photobooth strips driven by GSAP + ScrollTrigger.
- Photo collections sourced from `public/gallery`, `public/photobox`, and `public/game-photos` for simple swaps.
- Interactive memory-match mini game with confetti celebrations and move tracking.
- Responsive layout with Tailwind CSS utilities, custom handwriting fonts, and subtle paper textures.
- Client-side loading screen and smooth transitions for a cohesive storytelling flow.

## Tech Stack
- Next.js 16 (App Router) + React 19
- Tailwind CSS 4 utility classes (via `app/globals.css`)
- GSAP 3 with ScrollTrigger for scroll-driven scenes
- lucide-react icon set for UI affordances

## Getting Started
Prerequisites: Node.js 18.17+ (or any version supported by Next.js 16) and npm.

```bash
npm install
npm run dev
# visit http://localhost:3000
```

## Available Scripts
- `npm run dev` – start the local dev server with HMR.
- `npm run build` – create an optimized production build.
- `npm run start` – serve the production build.
- `npm run lint` – run ESLint with the Next.js shareable config.

## Customizing the Gift
- **Hero copy & sections** – edit text, emojis, and layout in `app/page.tsx`.
- **Photo gallery** – replace images inside `public/gallery` and update captions in the `photos` array.
- **Photobooth strips** – swap assets in `public/photobox` and adjust the `photoboothPhotos` object.
- **Memory game** – update card imagery inside `public/game-photos` and the `uniqueImageSources` array in `app/game/page.tsx`.

Images are loaded directly from `public`, so maintaining filenames (or updating the corresponding arrays) keeps everything in sync without touching build tooling.

## Deployment
Deploy effortlessly on [Vercel](https://vercel.com/) or any platform that supports Next.js. Make sure to:
1. Set `NODE_ENV=production` and run `npm run build`.
2. Serve the app with `npm run start` behind your platform’s adapter (Vercel does this automatically).

## Inspiration
This project is a personal digital keepsake. Feel free to adapt it for your own celebrations—swap in your photos, rewrite the letter, and share it with the people you love most.
