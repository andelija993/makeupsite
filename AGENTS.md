<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: Mua Julija Nesić – makeup artist website

One-page, mobile-first site for a makeup artist working in **Vlasotince** and **Beograd**. The owner is not technical, so keep everything simple, free, and maintenance-free.

## Hard rules
- **Language:** all visible text is Serbian, Latin script (č, ć, š, ž, đ). Never add English UI text or i18n.
- **Mobile first:** most visitors use phones. Test every change at 390px width. No horizontal overflow, tap targets ≥ 44px, form inputs `text-base` (16px) to prevent iOS zoom.
- **Dark theme is the default.** Light theme is opt-in via the toggle (stored in `localStorage.theme`). Every new UI must look good in both.
- **No database, no backend, no paid services.** The booking form (`src/components/booking.tsx`) posts directly from the browser to the free Web3Forms API, which emails each request to nesicjulija030@gmail.com. The access key is `site.bookingFormKey` in `src/lib/site.ts` (public by design). If sending fails, the form offers a prefilled WhatsApp fallback. Direct WhatsApp/Viber/Instagram links are shown below the form. Do not reintroduce Prisma, auth, admin panels or APIs unless explicitly asked.
- Keep the elegant look: lots of whitespace, thin serif headings, rose-gold accents, soft glows, subtle motion (respect `prefers-reduced-motion`).

## Where things live
| What | File |
|---|---|
| Phone, Instagram, cities, SEO texts | `src/lib/site.ts` (single source of truth – never hardcode these elsewhere) |
| Colors (light + dark), fonts mapping, animations | `src/app/globals.css` (use tokens: `bg`, `bg-soft`, `card`, `fg`, `fg-soft`, `line`, `gold`, `gold-soft`, `gold-fg`) |
| Fonts (Manrope body, Cormorant Garamond display, Allura script) | `src/app/layout.tsx` |
| Page sections, in order | `src/app/page.tsx` → `navbar`, `hero`, `marquee`, `about`, `gallery`, `booking`, `footer`, `mobile-bar` in `src/components/` |
| Shared brand pieces (`Logo`, `Sparkle`, `Divider`, `SectionHeading`) | `src/components/brand.tsx` |
| Scroll animation wrapper | `src/components/reveal.tsx` |
| Brand icons (Instagram, WhatsApp, Viber – lucide has none) | `src/components/icons.tsx` |
| Portrait / logo | `public/logo.png` |

## Gallery media
- Photos go in `public/media/foto/`, videos in `public/media/video/` (subfolders allowed). `src/lib/media.ts` scans them at build time; sorted by file path descending (name files `YYYY-MM-DD-...` so newest shows first).
- Supported: jpg, jpeg, png, webp, avif, gif / mp4, webm, mov, m4v. HEIC is **not** supported – convert first.
- Before adding media, optimize: photos max ~1600px long edge, JPEG/WebP quality ~80; videos H.264 MP4, max ~1080px, no file over ~20 MB (GitHub hard limit is 100 MB). On macOS `sips` works for photos; use `ffmpeg` for video if available.

## Commands
- `npm run dev` – local server (http://localhost:3000)
- `npx tsc --noEmit` and `npm run lint` – must pass before finishing
- `npm run build` – production build (stop the dev server first; they share `.next`)
