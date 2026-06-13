# CLAUDE.md — Fundi3 Project Bible

> Read this file completely before doing anything. This is the single source
> of truth for every decision made in this codebase.

---

## What is Fundi3?

Fundi3 is a Web3 education platform built for francophone Africa —
specifically designed for learners in Cameroon, Congo, Gabon, Côte d'Ivoire,
and the broader CEMAC/ECOWAS zone. The name comes from the Swahili word
"Fundi" meaning skilled craftsman or expert, combined with "3" for Web3.

**Founder story:** The founder struggled deeply to learn Web3 and blockchain.
Every existing platform assumed fast internet, English fluency, and Western
economic context. Fundi3 exists to be the platform the founder wished existed —
teaching Web3 in French and English, with African examples, optimized for
mobile and low-bandwidth, building real skills that lead to real income.

**Tagline (bilingual):**

- EN: "Web3, Finally Clear."
- FR: "Web3, Enfin Clair."

**Mission:** Make every African who wants to learn Web3 able to do so —
regardless of language, bandwidth, or economic background.

---

## Tech Stack

| Layer           | Tool                           | Why                                       |
| --------------- | ------------------------------ | ----------------------------------------- |
| Framework       | Next.js 14 (App Router)        | Web + API in one, great SEO               |
| Language        | TypeScript strict              | Catch errors early                        |
| Styling         | Tailwind CSS + shadcn/ui       | Fast, consistent UI                       |
| Database + Auth | Supabase                       | Free tier, Postgres, auth built-in        |
| Mobile          | React Native + Expo            | Share logic with web                      |
| Blockchain      | Solana + Anchor                | Fast, cheap, developer-friendly           |
| NFT minting     | Metaplex compressed NFTs       | Fractions of a cent per mint              |
| Wallet UX       | Privy                          | Email/phone login creates wallet silently |
| Payments        | MTN MoMo, Orange Money, USDC   | Local mobile money + crypto               |
| Code editor     | Monaco + Sandpack              | In-browser JS/TS editor                   |
| Solidity env    | Remix IDE (iframe embed)       | Free, browser-based, no install           |
| Solana env      | Solana Playground (iframe)     | Browser Rust/Anchor IDE                   |
| AI Tutor        | Claude API (claude-sonnet-4-6) | Bilingual, context-aware tutor            |
| Hosting         | Vercel                         | Free tier, edge functions                 |
| Media/CDN       | Cloudflare R2                  | Free storage + global CDN                 |
| Animation       | Framer Motion                  | Smooth, performant animations             |
| Icons           | Lucide React                   | Clean, consistent icon set                |

---

## Brand System

### Colors

```typescript
// Always use these. Never hardcode random hex values.
export const brand = {
  // Primary — deep forest green. Growth, Africa, life.
  green: {
    50: "#E1F5EE",
    100: "#9FE1CB",
    400: "#1D9E75", // accent teal
    600: "#0F6E56", // PRIMARY — use most
    800: "#085041",
    900: "#04342C",
  },
  // Secondary — warm amber. Energy, Web3, warmth.
  amber: {
    50: "#FAEEDA",
    100: "#FAC775",
    400: "#EF9F27", // SECONDARY — use for CTAs, highlights
    600: "#BA7517",
    800: "#633806",
  },
  // Neutrals
  dark: {
    bg: "#0A0F0E", // page background
    surface: "#111915", // card background
    border: "#1E2E28", // card borders
    muted: "#4A6358", // muted text
  },
  white: "#F5FAF7", // off-white text on dark backgrounds
};
```

### Typography

```
Headings:  Space Grotesk (Google Fonts) — weight 500, 600
Body:      Inter (Google Fonts) — weight 400, 500
Mono:      JetBrains Mono — for code blocks
```

### Tailwind Config Extensions

```typescript
// tailwind.config.ts — extend theme with these
theme: {
  extend: {
    colors: {
      primary:   '#0F6E56',
      secondary: '#EF9F27',
      accent:    '#1D9E75',
      dark:      '#0A0F0E',
      surface:   '#111915',
      border:    '#1E2E28',
    },
    fontFamily: {
      heading: ['Space Grotesk', 'sans-serif'],
      body:    ['Inter', 'sans-serif'],
      mono:    ['JetBrains Mono', 'monospace'],
    },
  }
}
```

### Design Principles

1. **Dark first.** Background is always `#0A0F0E`. Light mode is not a priority
   for launch — Web3 users expect dark.
2. **Glassmorphism for cards.** Use `backdrop-blur-md`, `bg-white/5`,
   `border border-white/10` for card surfaces.
3. **Green = progress, success, action.** Primary CTAs are green.
4. **Amber = highlight, warning, reward.** Use for tokens, badges, streaks.
5. **No generic SaaS look.** Every page should feel like a Web3 product —
   think Linear.app meets Phantom wallet meets Duolingo.
6. **Mobile first, always.** Design for 375px first, scale up.
7. **Low bandwidth.** No auto-playing video. Lazy load all images.
   Prefer SVG illustrations over heavy PNGs.
8. **Bilingual always.** Every piece of UI copy needs French AND English.
   Use a `t()` helper from day one even if it's simple at start.

---

## Logo System

The Fundi3 logo mark is a geometric "F3":

- The **F** is built from three stacked horizontal blocks (blockchain blocks)
- The **3** is integrated on the right side of the F, sharing the bottom stroke
- Overall feel: geometric, modern, technical — not decorative
- Works at 16px (favicon) through full billboard size as pure SVG

Logo variants to always maintain:

- `LogoMark` — icon only, 1:1 square
- `LogoFull` — horizontal: mark + "Fundi3" wordmark
- `LogoFullLight` — white version for dark backgrounds (primary)
- `LogoFullDark` — dark version for light backgrounds (docs, certificates)

All logos live in `components/brand/Logo.tsx` as named SVG exports.
Never use image files for the logo. SVG only.

---

## File Structure

```
fundi3/
├── CLAUDE.md                    ← you are here
├── app/
│   ├── layout.tsx               ← root layout, fonts, providers
│   ├── page.tsx                 ← landing page (/)
│   ├── about/page.tsx           ← about page (/about)
│   ├── contact/page.tsx         ← contact page (/contact)
│   ├── docs/
│   │   ├── page.tsx             ← docs index (/docs)
│   │   └── [slug]/page.tsx      ← individual doc pages
│   ├── courses/
│   │   ├── page.tsx             ← course catalog (/courses)
│   │   └── [courseId]/page.tsx  ← course detail
│   ├── learn/
│   │   └── [courseId]/
│   │       └── [lessonId]/page.tsx  ← lesson player
│   ├── dashboard/page.tsx       ← learner dashboard
│   ├── certificate/
│   │   └── [courseId]/page.tsx  ← certificate claim
│   ├── auth/
│   │   ├── signup/page.tsx
│   │   ├── login/page.tsx
│   │   └── verify/page.tsx
│   ├── brand/page.tsx           ← internal brand/style guide
│   └── api/
│       ├── tutor/route.ts       ← AI tutor endpoint
│       └── certificates/route.ts
├── components/
│   ├── brand/
│   │   ├── Logo.tsx             ← all logo variants
│   │   └── BrandShowcase.tsx    ← style guide page component
│   ├── layout/
│   │   ├── Navbar.tsx           ← site navigation
│   │   ├── Footer.tsx           ← site footer
│   │   └── MobileMenu.tsx       ← mobile nav drawer
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── Problem.tsx
│   │   ├── Solution.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── CoursesPreview.tsx
│   │   ├── Stats.tsx
│   │   ├── Testimonials.tsx
│   │   └── CallToAction.tsx
│   ├── courses/
│   │   ├── CourseCard.tsx
│   │   └── CourseGrid.tsx
│   ├── learn/
│   │   ├── LessonPlayer.tsx
│   │   ├── CodeEditor.tsx       ← Monaco/Sandpack wrapper
│   │   ├── RemixEmbed.tsx       ← Remix IDE iframe wrapper
│   │   ├── AiTutor.tsx          ← slide-over chat panel
│   │   └── CurriculumTree.tsx
│   ├── certificates/
│   │   ├── CertificateDesign.tsx ← SVG certificate
│   │   └── ClaimButton.tsx
│   ├── dashboard/
│   │   ├── StatsRow.tsx
│   │   ├── CourseProgress.tsx
│   │   └── AchievementCard.tsx
│   └── ui/                      ← shadcn/ui components live here
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── certificates/
│   │   └── mint.ts              ← Metaplex NFT minting
│   ├── i18n/
│   │   ├── index.ts             ← t() translation helper
│   │   ├── en.ts                ← English strings
│   │   └── fr.ts                ← French strings
│   └── utils.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useLanguage.ts           ← FR/EN toggle
│   └── useCourseProgress.ts
├── styles/
│   ├── globals.css
│   └── brand.ts                 ← brand constants (colors, fonts)
├── public/
│   ├── favicon.svg
│   └── og-image.png             ← Open Graph image
└── middleware.ts                ← protect /dashboard, /learn routes
```

---

## Pages — Content & Requirements

### `/` — Landing Page

**Purpose:** Convert visitors into signups. This is the most important page.

**Sections in order:**

**1. Navbar**

- Logo left, nav links center (Courses, About, Docs), CTA button right
- "Get Started Free" button in amber/green
- Language toggle: FR | EN
- Transparent on hero, solid surface color on scroll
- Mobile: hamburger menu, full-screen drawer

**2. Hero**

- Headline: `"Web3, Enfin Clair." / "Web3, Finally Clear."`
- Subheadline: `"La première plateforme Web3 conçue pour l'Afrique." / "The first Web3 platform built for Africa."`
- Body: `"Learn blockchain, DeFi, and smart contracts in French and English — with African examples, low-bandwidth design, and real career outcomes."`
- CTA 1 (primary, green): "Start Learning Free" / "Commencer Gratuitement"
- CTA 2 (ghost): "See how it works" / "Voir comment ça marche"
- Background: dark `#0A0F0E` with animated gradient orbs (green + amber, CSS only)
- Subtle grid pattern overlay (SVG grid, 5% opacity)
- Floating course player mockup on the right (desktop only)
- Scroll indicator arrow at bottom

**3. Social proof bar**

- Logos/text: "Trusted by learners in 🇨🇲 🇬🇦 🇨🇩 🇨🇮 🇸🇳"
- Stats: "2,400+ learners" · "6 countries" · "Free to start"
- Subtle divider line, muted styling

**4. Problem Section**

- Section label: "THE PROBLEM" (small caps, amber)
- Headline: `"Learning Web3 as an African is hard."`
- Three problem cards (glassmorphism):
  - Card 1: "Too Technical" — "Platforms assume CS degrees and 100Mbps internet"
  - Card 2: "Wrong Language" — "Everything is in English. Francophone Africa is left out."
  - Card 3: "No Local Context" — "Examples use Wall Street, not mobile money or Njangi"
- Each card: lucide icon, title, description, subtle red/warning tint

**5. Solution Section**

- Headline: `"Fundi3 is different."`
- Three solution cards (green tint, glassmorphism):
  - "French + English" — Full bilingual curriculum, written for Africans
  - "Mobile + Low Data" — Works on 3G. Text-first. Offline mode coming.
  - "African Context" — Build a Njangi DApp. Learn DeFi with CFA examples.
- Transition: problem cards slide out, solution cards slide in (Framer Motion)

**6. How It Works**

- Headline: `"From zero to Web3 developer in 12 weeks"`
- Four numbered steps with icons:
  1. "Sign up free" — No crypto knowledge needed. Just your email or phone.
  2. "Choose your path" — Beginner, Developer, or DeFi track.
  3. "Learn by building" — Code in your browser. Real projects. No setup.
  4. "Earn your certificate" — Get an NFT certificate on Solana. Verified forever.
- Horizontal timeline on desktop, vertical on mobile

**7. Courses Preview**

- Headline: `"Start with our most popular courses"`
- Three course cards:
  - Course 1: "Blockchain 101" — Beginner · French + English · Free · 6 lessons
  - Course 2: "Build Your First Smart Contract" — Intermediate · Solidity · 12 lessons
  - Course 3: "Njangi on the Blockchain" — Intermediate · Solana · 10 lessons · African context badge
- Each card: course image (use colored gradient placeholder), title, level badge, language badge, lesson count, "Start free" link
- "See all courses →" link below grid

**8. Stats Section**

- Dark surface background
- Four stats in a row:
  - `2,400+` Learners across Africa
  - `6` Countries represented
  - `< $0.01` Cost per NFT certificate
  - `3` Languages: FR, EN, Pidgin (coming)
- Animated count-up on scroll (Framer Motion)

**9. Testimonials**

- Headline: `"What our learners say"`
- Three testimonial cards with:
  - Avatar (initials circle, green background)
  - Quote
  - Name, country flag emoji, course completed
- Placeholder content for launch:
  - "J'avais essayé d'apprendre Solidity pendant 6 mois. Fundi3 l'a rendu clair en 2 semaines." — Amara K., 🇨🇲 Cameroon
  - "The Njangi DApp course changed how I see money and technology." — Didier M., 🇬🇦 Gabon
  - "Enfin une plateforme qui parle notre langue — au sens propre et figuré." — Fatou S., 🇨🇮 Côte d'Ivoire

**10. Final CTA Section**

- Full-width section, gradient green background
- Headline: `"Your Web3 journey starts today."`
- Subtext: `"Free forever for beginners. No credit card. No crypto required."`
- Single large CTA button: "Create Your Free Account" / "Créer mon compte gratuit"

**11. Footer**

- Logo + tagline
- Links: Courses · About · Docs · Contact · Twitter/X · GitHub
- Language: "Built in 🇨🇲 Cameroon. For Africa."
- Copyright: "© 2025 Fundi3. All rights reserved."

---

### `/about` — About Page

**Purpose:** Build trust and tell the founder story.

**Sections:**

**1. Hero**

- Headline: `"Built from frustration. Driven by purpose."`
- Subtext: The founder story in 2-3 sentences.
- Full story paragraph:
  `"When I started learning Web3 in Cameroon, I hit walls everywhere. The courses were in English only, assumed fast internet I didn't have, and used examples that made no sense to my life. I spent months confused. When things finally clicked, I realized the tools to teach this properly didn't exist for people like me — so I built them. Fundi3 is the platform I wish existed when I started."`

**2. Mission**

- Three mission pillars (cards):
  - "Accessible" — Web3 education that works on any device, any connection
  - "Bilingual" — French and English, always, from day one
  - "Contextual" — Built around African economic reality, not Wall Street

**3. The Problem We Solve**

- Brief stats about the Web3 skills gap in Africa
- Reference: "Sub-Saharan Africa is the world's third fastest-growing crypto market — yet has almost no local Web3 education infrastructure."

**4. Team Section**

- Headline: "Who we are"
- Founder card: Name, title "Founder & CEO", short bio, country flag
- "We're hiring" card: Join us as instructor, developer, or community lead. Link to contact.

**5. Values**

- Six values as small cards:
  - Community first · Radical clarity · African pride
  - Build real things · Language is power · Learn by doing

---

### `/contact` — Contact Page

**Purpose:** Let learners, instructors, partners, and press reach the team.

**Sections:**

**1. Headline:** `"Get in touch"`
**Subtext:** `"We read every message. Usually reply within 48 hours."`

**2. Contact Form**
Fields:

- Name (required)
- Email (required)
- Subject — dropdown: General · Partnership · Press · Become an Instructor · Bug Report · Other
- Message (textarea, required)
- Language preference: French | English
- Submit button: "Send Message" / "Envoyer"

On submit: POST to `/api/contact` which sends email via Resend (free tier).
Show success state with green checkmark and thank you message.

**3. Other contact options (beside form):**

- Twitter/X: @fundi3hq
- Email: hello@fundi3.xyz
- Discord: discord.gg/fundi3 (community)
- Location: Bamenda, Cameroon 🇨🇲

**4. FAQ accordion (bottom of page):**

- "Is Fundi3 really free?" — Yes, beginner content is always free.
- "Do I need crypto to sign up?" — No. Just an email or phone number.
- "Are courses in French?" — Yes. All courses are bilingual FR/EN.
- "What is an NFT certificate?" — A tamper-proof credential stored on the Solana blockchain.
- "Can I teach on Fundi3?" — Yes, reach out via the contact form.

---

### `/docs` — Documentation Hub

**Purpose:** Help learners understand Web3 concepts and platform features.

**Layout:** Two-column — sidebar nav left, content right.

**Sidebar sections:**

- Getting Started
  - What is Fundi3?
  - Creating your account
  - Setting up your wallet
  - Your first lesson
- Web3 Basics
  - What is blockchain?
  - What is a smart contract?
  - What is DeFi?
  - What is an NFT?
  - What is Solana?
- Platform Guide
  - How courses work
  - The code editor
  - NFT certificates
  - The AI tutor
- For Instructors
  - Teaching on Fundi3
  - Course creation guide

**Each doc page:**

- Breadcrumb navigation
- Reading time estimate
- Last updated date
- Bilingual toggle at top
- Clear headings, short paragraphs
- Code blocks with syntax highlighting (use Shiki)
- "Was this helpful?" feedback at bottom
- Next/previous article navigation

**First doc to write fully:** "What is blockchain?" — explain using the
analogy of a communal notebook (like a village record book) that everyone
can read but nobody can secretly erase. Use Njangi as the example.

---

### `/brand` — Internal Brand Guide (dev only, not linked in nav)

**Purpose:** Design system reference for builders.

**Sections:**

- Logo variants (all 4, on dark and light backgrounds)
- Color palette (all swatches with hex, CSS variable name, usage note)
- Typography scale (h1 through caption, with size, weight, font)
- Spacing scale
- Component showcase: buttons, cards, badges, inputs, alerts
- Animation principles
- Do / Don't examples

---

## Components — Build Specifications

### Navbar (`components/layout/Navbar.tsx`)

```
- Height: 64px desktop, 56px mobile
- Background: transparent on hero, surface color (#111915) on scroll
  Use Framer Motion scroll listener for transition
- Logo: LogoFull component (white version)
- Nav links: Courses, About, Docs (hidden on mobile)
- Right side: Language toggle (FR|EN) + "Get Started" button (amber)
- Mobile: hamburger icon opens full-screen dark drawer
- Sticky at top, z-index 50
- On auth pages: show only logo, no nav links
```

### Footer (`components/layout/Footer.tsx`)

```
- Background: #0A0F0E (same as page bg, no border needed)
- Four columns: Logo+tagline | Courses | Company | Community
- Bottom bar: copyright left, "Built in 🇨🇲" right
- All links hover: green underline
- Social icons: Twitter/X, GitHub, Discord (Lucide icons)
```

### CourseCard (`components/courses/CourseCard.tsx`)

```
Props: title, description, level, language, lessonCount,
       duration, isFree, tags[], slug, gradientFrom, gradientTo

- Card: glassmorphism (bg-white/5, backdrop-blur, border-white/10)
- Top: colored gradient banner (use gradientFrom/To props)
- Body: title (Space Grotesk), description, badges row
- Badges: level (Beginner/Intermediate/Advanced), language (FR/EN), Free
- Footer: lesson count + duration + "Start" button
- Hover: subtle scale(1.02), border brightens
- African context badge: amber badge "🌍 African context" when applicable
```

### GlassCard (reusable utility component)

```tsx
// components/ui/GlassCard.tsx
// Use this everywhere you need a card surface
className="bg-white/5 backdrop-blur-md border border-white/10
           rounded-2xl p-6 hover:border-white/20 transition-colors"
```

---

## AI Tutor — System Prompt

When calling the Claude API from `/api/tutor/route.ts`, always use this system prompt:

```
You are the Fundi3 AI tutor — a friendly, expert Web3 educator
specifically built for African learners.

Your role:
- Explain blockchain, Solidity, Rust, DeFi, NFTs, and Web3 concepts clearly
- Always use African examples: Njangi groups, MTN Mobile Money, CFA franc,
  cross-border CEMAC payments, informal savings circles
- Detect whether the user writes in French or English and respond in the SAME language
- If they mix languages (Camfranglais style), respond in their dominant language
- Be encouraging. Learning Web3 is hard. Celebrate small wins.
- Never make the user feel stupid for not knowing something
- When explaining code, explain what each line DOES, not just what it IS
- If asked about something outside Web3/blockchain, gently redirect:
  "I'm specialized in Web3 — let me know if you have a blockchain question!"

Tone: warm, patient, like a knowledgeable friend from the community.
Not corporate. Not condescending. Not overly formal.

Context: The user is currently on lesson: {lessonTitle}
Course: {courseName}
Their level: {userLevel}
```

---

## Bilingual System

Every string in the UI must go through the `t()` helper.
Never hardcode English or French directly in JSX.

```typescript
// lib/i18n/index.ts
export type Lang = "en" | "fr";

export function t(
  key: string,
  lang: Lang,
  vars?: Record<string, string>,
): string {
  const strings = lang === "fr" ? fr : en;
  let str = strings[key] ?? key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      str = str.replace(`{{${k}}}`, v);
    });
  }
  return str;
}

// Usage in components:
// const { lang } = useLanguage()
// <h1>{t('hero.headline', lang)}</h1>
```

Language preference is stored in localStorage and Supabase user profile.
Default language detection: check browser `navigator.language`,
default to French if it starts with 'fr', else English.

---

## Today's Priority Build Order

Work through these in sequence. Do not skip ahead.

### Priority 1 — Foundation (do this first, everything depends on it)

- [ ] Scaffold Next.js 14 project with TypeScript, Tailwind, shadcn/ui
- [ ] Configure `tailwind.config.ts` with brand colors and fonts
- [ ] Set up `styles/globals.css` with CSS variables and base styles
- [ ] Create `styles/brand.ts` with all brand constants
- [ ] Set up Google Fonts (Space Grotesk + Inter) in `app/layout.tsx`
- [ ] Create `lib/i18n/` with `t()` helper, `en.ts`, `fr.ts` string files
- [ ] Create `hooks/useLanguage.ts`
- [ ] Initialize git repo and push to GitHub

### Priority 2 — Brand + Logo

- [ ] Build `components/brand/Logo.tsx` — all 4 SVG logo variants
- [ ] Create `public/favicon.svg` from LogoMark
- [ ] Build `components/brand/BrandShowcase.tsx`
- [ ] Add `/brand` route

### Priority 3 — Layout Shell

- [ ] Build `components/layout/Navbar.tsx` (with scroll behavior + mobile menu)
- [ ] Build `components/layout/Footer.tsx`
- [ ] Build `components/layout/MobileMenu.tsx`
- [ ] Update `app/layout.tsx` to include Navbar + Footer

### Priority 4 — Landing Page (most important page)

- [ ] `components/landing/Hero.tsx`
- [ ] `components/landing/Problem.tsx`
- [ ] `components/landing/Solution.tsx`
- [ ] `components/landing/HowItWorks.tsx`
- [ ] `components/landing/CoursesPreview.tsx`
- [ ] `components/landing/Stats.tsx`
- [ ] `components/landing/Testimonials.tsx`
- [ ] `components/landing/CallToAction.tsx`
- [ ] Assemble all in `app/page.tsx`

### Priority 5 — Supporting Pages

- [ ] `app/about/page.tsx`
- [ ] `app/contact/page.tsx` + contact form + `/api/contact` route
- [ ] `app/docs/page.tsx` + sidebar layout + first doc "What is blockchain?"

### Priority 6 — Auth (needed before course access)

- [ ] Install and configure Supabase
- [ ] `app/auth/signup/page.tsx`
- [ ] `app/auth/login/page.tsx`
- [ ] `middleware.ts` protecting /dashboard and /learn

---

## Prompting Guide — How to Use Claude Code Effectively

### Start every session with this header:

```
We are building Fundi3 — a bilingual (FR/EN) Web3 education platform
for francophone Africa. Read CLAUDE.md for full context.
Stack: Next.js 14, TypeScript, Tailwind, Supabase, Solana.
Brand: dark (#0A0F0E bg), green (#0F6E56 primary), amber (#EF9F27 secondary).
Today I want to build: [SPECIFIC THING].
```

### Good prompts for today:

**For the logo:**

```
Build components/brand/Logo.tsx. Create four SVG logo variants as named
exports: LogoMark, LogoFull, LogoFullLight, LogoFullDark.
The mark is a geometric F3 — F made of three stacked horizontal blocks
(blockchain metaphor), with 3 integrated on the right sharing the bottom bar.
Use brand colors from styles/brand.ts. Pure SVG, no images.
```

**For the Navbar:**

```
Build components/layout/Navbar.tsx. 64px tall. Transparent on hero,
#111915 on scroll (use framer-motion useScroll). Logo left (LogoFullLight).
Links center: Courses, About, Docs. Right: FR|EN toggle + "Get Started"
amber button. Mobile: hamburger → full-screen dark drawer with MobileMenu.
Sticky, z-50. Match Fundi3 brand from CLAUDE.md.
```

**For Hero section:**

```
Build components/landing/Hero.tsx. Dark bg #0A0F0E. Headline "Web3, Enfin
Clair." / "Web3, Finally Clear." (bilingual, use t() hook). Subheadline +
body copy from CLAUDE.md landing page spec. Two CTAs. Animated CSS gradient
orbs (green + amber, no JS). Subtle SVG grid overlay at 5% opacity.
Floating course player mockup on right (desktop). Scroll arrow at bottom.
Framer Motion entrance animations. Mobile first.
```

### Rules Claude Code must follow:

1. Always use the `t()` bilingual system — never hardcode text
2. All colors from `styles/brand.ts` — never random hex values
3. Dark theme only — background always `#0A0F0E`
4. Glassmorphism for cards: `bg-white/5 backdrop-blur-md border-white/10`
5. Mobile first — design 375px → scale up
6. Framer Motion for all animations
7. Lucide React for all icons
8. Space Grotesk for headings, Inter for body — always
9. Every component gets TypeScript props interface
10. No `any` types — strict TypeScript

---

## Environment Variables

Create `.env.local` with these (values to be filled in):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Privy (wallet)
NEXT_PUBLIC_PRIVY_APP_ID=

# Claude API (AI tutor)
ANTHROPIC_API_KEY=

# Resend (contact form emails)
RESEND_API_KEY=

# Solana
NEXT_PUBLIC_SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Launch Checklist (post-build)

- [ ] Test on real Android phone (Samsung Galaxy A-series level)
- [ ] Test on slow 3G connection (Chrome DevTools network throttle)
- [ ] All pages pass Lighthouse mobile score > 85
- [ ] French and English both render correctly everywhere
- [ ] Contact form sends real emails
- [ ] NFT certificate mints on Solana devnet
- [ ] All links work, no 404s
- [ ] OG image set for social sharing
- [ ] favicon shows correctly
- [ ] Privacy policy page exists (required for any signup form)

---

_Last updated: initial project setup_
_Next session: start with Priority 1 — Foundation_
