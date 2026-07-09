# 🎓 AI Tutor Platform

**Smart AI Learning for SSC & IELTS Students in Bangladesh** — a bilingual (English + বাংলা) AI-powered learning platform.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript 6**, **Tailwind CSS v4** and **Prisma 7 / PostgreSQL**. Every AI and payment integration degrades gracefully to safe **mock responses** when API keys are missing, so the whole app runs end-to-end out of the box.

---

## ✨ Features

- **Bilingual AI Tutor** — a modern, full-height chat experience: aurora-glow empty state, gradient branding, quick-start suggestion cards, an animated gradient composer, and step-by-step explanations in English & Bangla. Subject/track aware, with regenerate / explain-simply / save / practice actions.
- **AI Doubt Solver + OCR** — type a question or upload a photo; OCR extracts the text and the AI solves it step by step.
- **Concept Card Library** — structured lessons with explanation, example, common mistakes and practice.
- **SSC Track** — full Bangladesh National Curriculum (Grade 9–10) across Science, Business & Humanities groups; board-style mocks, custom exam builder, previous-year questions, weak-topic detection & adaptive plans.
- **IELTS Track** — AI Writing Task 1 & 2 scorer, AI Speaking evaluator, vocabulary builder, band progress tracker, full mock tests, model answers.
- **Role-based dashboards** — Student, Parent (read-only), School Admin (B2B), Super Admin.
- **Subscriptions & billing** — Free / SSC Pro / IELTS Pro / Bundle / School License with bKash, Nagad & Stripe architecture and a central subscription **guard**.
- **PWA-ready**, responsive, with toasts, skeletons, empty/loading/error states.

---

## 🧱 Tech Stack

| Layer | Tech |
| --- | --- |
| Frontend | Next.js 16 App Router, React 19, TypeScript 6, Tailwind CSS v4 |
| i18n | Custom lightweight EN/BN dictionary provider (`lib/i18n`) |
| Backend | Next.js Route Handlers (API) |
| Database | PostgreSQL + Prisma 7 (driver adapter `@prisma/adapter-pg`) |
| AI | OpenRouter · Claude Haiku · Gemini Flash · Whisper · ElevenLabs · Sarvam AI · Google Vision / Tesseract (all mock-capable) |
| Payments | bKash · Nagad · Stripe (mock-capable) |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Fill in what you have. **Nothing is required to run** — with `NEXT_PUBLIC_USE_MOCK_AI="true"` (the default) all AI and payment calls return realistic mock data. Only set `DATABASE_URL` if you want to use Prisma/seed.

### 3. (Optional) Set up the database

```bash
npm run db:push     # create tables from prisma/schema.prisma
npm run db:seed     # seed subjects, concept cards, exams & demo users
```

> The UI is fully populated from `lib/mock/*` in scaffold mode, so the app is browsable without a database. The Prisma schema + seed are ready for when you wire real persistence.
>
> **Prisma 7 note:** the connection URL lives in `.env` (`DATABASE_URL`) and is read by `prisma.config.ts` for CLI/Migrate; at runtime the client connects through the `@prisma/adapter-pg` driver adapter (see `lib/db/prisma.ts`) — Prisma 7 no longer ships the Rust query engine.

### 4. Run

```bash
npm run dev
```

Open <http://localhost:3000>.

---

## 👤 Demo accounts / roles

Auth is mocked. On the **Login** page pick a role (Student / Parent / School Admin / Super Admin) to jump into that dashboard:

| Role | Home |
| --- | --- |
| Student | `/dashboard` |
| Parent | `/parent` |
| School Admin | `/school` |
| Super Admin | `/admin` |

---

## 🗺️ Routes

**Public:** `/` · `/ssc` · `/ielts` · `/pricing` · `/schools` · `/contact`
**Auth:** `/login` · `/signup` · `/onboarding`
**Student:** `/dashboard` · `/dashboard/ai-tutor` · `/dashboard/doubt-solver` · `/dashboard/concept-cards` · `/dashboard/mock-exams` · `/dashboard/ielts` · `/dashboard/study-plan` · `/dashboard/progress` · `/dashboard/settings`
**Parent:** `/parent`
**School:** `/school` · `/school/students` · `/school/reports`
**Admin:** `/admin` · `/admin/users` · `/admin/content` · `/admin/subscriptions` · `/admin/analytics` · `/admin/payments` · `/admin/notifications`

### API

`POST /api/ai/tutor` · `POST /api/ai/solve-doubt` · `POST /api/ocr/extract` · `POST /api/ielts/writing-score` · `POST /api/ielts/speaking-score` · `POST /api/auth/login` · `POST /api/auth/logout` · `POST /api/payments/checkout`

---

## 📁 Project structure

```
app/
  (public)/      # marketing site + layout
  (auth)/        # login, signup, onboarding
  dashboard/     # student area
  parent/  school/  admin/
  api/           # route handlers (AI, OCR, IELTS, auth, payments)
components/
  layout/  public/  dashboard/  ai/  ielts/  admin/  ui/
lib/
  ai/            # provider selection + tutor/ielts/ocr/voice (mock-capable)
  payments/      # bKash / Nagad / Stripe gateway wrappers
  subscription/  # central feature/limit guard
  auth/  db/  constants/  utils/  i18n/  mock/
prisma/          # schema.prisma + seed.ts
messages/        # en.json + bn.json
types/
```

---

## 🔌 Going to production

Each integration point has a clearly marked `// Real ... integration goes here` block:

1. **AI** — `lib/ai/tutor.ts`, `lib/ai/ielts.ts`, `lib/ai/ocr.ts`, `lib/ai/voice.ts`. Add keys to `.env`, set `NEXT_PUBLIC_USE_MOCK_AI="false"`.
2. **Payments** — `lib/payments/gateways.ts` (bKash tokenized checkout, Nagad init, Stripe Checkout Session).
3. **Auth** — replace `lib/auth/session.ts` with NextAuth (email + phone OTP); `components/layout/RoleGuard.tsx` already gates by role.
4. **Data** — swap `lib/mock/*` reads for Prisma queries against the existing schema.

---

## 🎨 Design system

A CSS-first Tailwind v4 theme (`app/globals.css`) drives the whole UI through semantic tokens, so colours, radii and shadows stay consistent across every page:

- **Palette** — Primary `#7034EA` (violet) · Tertiary `#AA3FFF` · Secondary `#09FF9B` (mint) · Accent `#FDFD35` · CTA `#FF5714`, plus semantic `ink` / `muted` / `line` / `surface` roles.
- **Radii** — `md` inputs, `lg` chips & tiles, `xl` toggles & panels, `2xl` large surfaces.
- **Motion** — reusable keyframes for `fadeUp`, `blink`, `float`, `marquee` and an always-on Primary→Tertiary `gradient-border` utility.

Shared primitives live in `components/ui/` and dashboard building blocks in `components/dashboard/cards.tsx`.

---

## 🧭 Future tracks (schema-ready)

HSC · University Admission · BCS · SAT · GRE · GMAT · Junior School — add a `TrackType`/subjects entry and the UI scales automatically.

Made with ❤️ for students in Bangladesh 🇧🇩
