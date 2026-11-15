# Khushal Sinhmar — Portfolio

Personal portfolio built with React 19, Vite, TypeScript and Tailwind CSS v3.
Flat, light design system: white cards, one green accent, Instrument Sans for text and JetBrains Mono for labels.

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Contact form

The form in the contact dialog posts JSON to the URL in `VITE_FORM_ENDPOINT`.

1. Copy `.env.example` to `.env.local`
2. Set `VITE_FORM_ENDPOINT` to your own FormSubmit / Formspree endpoint

Without it the dialog shows an error that points visitors to the email address. `.env.local` is git-ignored.
Note that `VITE_*` values are bundled into the public site, so use an endpoint that is safe to expose (form IDs are; API secrets are not).

## Where things live

| What | Where |
| --- | --- |
| All page content (copy, projects, skills…) | `constants.tsx`, typed in `types.ts` |
| Colours, fonts, radii | `tailwind.config.js` |
| Reusable pieces (Card, Chip, Badge, Metric, SectionHeader…) | `components/ui/` |
| Page sections | `components/*.tsx` |
| Resume PDF | `public/Resume.pdf` (served at `/Resume.pdf`) |
