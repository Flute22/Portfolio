# Khushal Sinhmar — Portfolio

Personal portfolio built with React 19, Vite, TypeScript and Tailwind CSS v3.
Dark-first design with a light option: flat tiles, one green accent, Bricolage Grotesque for text and
JetBrains Mono for labels (both self-hosted in `public/fonts/`, no third-party font requests).

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Theme

The first visit follows the visitor's OS setting (dark or light); the sun/moon button in the navbar
overrides it and the choice is remembered. A small script in `index.html` applies it before first paint.
Colours live as CSS variables in `index.css` (`:root` for dark, `:root[data-theme='light']` for light).

## Motion

Small, performance-friendly effects: a scroll progress bar and a sliding highlight in the navbar, headline words
that rise in, numbers that count up, chips that pop in one after another, a timeline that draws itself as you
scroll, and a soft glow that follows the cursor over cards. Everything uses transforms/opacity, and all of it is
switched off for visitors who set "reduce motion" in their OS (the page then simply shows the finished state).

## Contact form

The form in the Contact section posts JSON to the URL in `VITE_FORM_ENDPOINT`.

1. Copy `.env.example` to `.env.local`
2. Set `VITE_FORM_ENDPOINT` to your own FormSubmit / Formspree endpoint

Without it the form shows an error that points visitors to the email address. `.env.local` is git-ignored.
Note that `VITE_*` values are bundled into the public site, so use an endpoint that is safe to expose (form IDs are; API secrets are not).

## Where things live

| What | Where |
| --- | --- |
| All page content (copy, projects, skills…) | `constants.tsx`, typed in `types.ts` |
| Colour tokens, fonts, max width | `index.css` (variables, `@font-face`) and `tailwind.config.js` |
| Reusable pieces (Card, Chip, Badge, MonoLabel, SectionHeader…) | `components/ui/` |
| Page sections | `components/*.tsx` |
| Fonts | `public/fonts/` |
| Resume PDF | `public/Resume.pdf` (served at `/Resume.pdf`) |
