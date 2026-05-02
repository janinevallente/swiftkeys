# Next.js Boilerplate

A personal Next.js starter that works for both **marketing/portfolio sites** and **full web apps** — with auth scaffolding, API routes, middleware, global state, and reusable animation primitives baked in.

## Tech stack

| Layer | Library |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| State | Context + useReducer (swap for Zustand/Jotai) |

---

## Getting started

```bash
cp .env.example .env.local   # fill in your values
npm install
npm run dev
```

---

## Project structure

```
src/
├── app/
│   ├── (auth)/               # Unauthenticated pages
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (app)/                # Authenticated app shell
│   │   ├── layout.tsx        # Sidebar / top nav wrapper
│   │   └── dashboard/page.tsx
│   ├── (marketing)/          # Public site pages (optional group)
│   │   └── layout.tsx
│   ├── api/
│   │   └── auth/             # Auth API routes
│   │       ├── route.ts      # POST /api/auth  (login)
│   │       ├── me/           # GET  /api/auth/me
│   │       ├── logout/       # POST /api/auth/logout
│   │       └── register/     # POST /api/auth/register
│   ├── globals.css
│   ├── layout.tsx            # Root layout + AppProvider
│   └── page.tsx              # Landing / home page
├── components/
│   ├── animations/           # Framer Motion wrappers
│   ├── layout/               # Navbar, Footer
│   └── ui/                   # Preloader, shared UI primitives
├── hooks/
│   ├── useAuth.ts            # Client-side auth state
│   ├── useFetch.ts           # Generic data-fetching hook
│   └── useLocalStorage.ts    # SSR-safe localStorage hook
├── lib/
│   ├── api.ts                # Typed fetch wrapper (apiFetch)
│   ├── auth.ts               # Server-side session helper
│   ├── constants.ts          # Routes, cookie names, page sizes
│   ├── data.ts               # Site config (name, nav, footer)
│   ├── db.ts                 # DB client singleton (swap as needed)
│   ├── utils.ts              # cn(), formatDate(), truncate(), etc.
│   └── validations.ts        # Form validation helpers
├── middleware.ts             # Auth guard + security headers
├── services/
│   └── userService.ts        # Server-side DB access layer
├── store/
│   ├── index.ts
│   └── AppProvider.tsx       # Global state (Context + useReducer)
└── types/
    └── index.ts              # Shared TypeScript types
```

---

## Customise for a new project

### 1. Site config — `src/lib/data.ts`
Update `site`, `meta`, `footer`, and `navLinks`.

### 2. Environment — `.env.local`
Copy `.env.example` → `.env.local` and fill in your DB URL, JWT secret, and any third-party keys.

### 3. Database — `src/lib/db.ts`
Uncomment and configure your preferred ORM: **Prisma**, **Drizzle**, **Supabase**, or **Mongoose**.

### 4. Auth — `src/lib/auth.ts`
Replace the `getSession()` stub with your auth provider's session helper (NextAuth `auth()`, Clerk `currentUser()`, or custom JWT validation).

### 5. Sections / pages
- **Landing site**: edit `src/app/page.tsx` and add sections there.
- **Web app**: add routes under `src/app/(app)/` — they automatically use the app-shell layout and are protected by middleware.

### 6. Global state — `src/store/AppProvider.tsx`
Extend the `AppState` interface and `Action` union for new slices. Or swap the whole store for **Zustand** / **Jotai** if the app grows.

---

## Auth flow

```
Request → middleware.ts
  ├─ Public route?  → pass through
  ├─ No token?      → redirect /login?callbackUrl=...
  └─ Has token?     → pass through to route handler
                       └─ server components call getSession()
```

Middleware protects every route not listed in `PUBLIC_ROUTES` (see `src/lib/constants.ts`).

---

## Animation primitives (`src/components/animations/`)

| Component | Use |
|---|---|
| `FadeUp` | Scroll-triggered fade + slide-up |
| `SectionReveal` | Clip-path reveal (`up` / `left` / `fade` / `scale`) |
| `WordReveal` | Word-by-word stagger |
| `PageTransition` | Full-screen curtain wipe between routes |
| `ScrollToSection` | Reads `?scrollTo=id` and smooth-scrolls after navigation |

---

## Toggle the preloader

In `src/app/page.tsx`:

```ts
const ENABLE_PRELOADER = false; // disable entirely
```

---

## Recommended additions (not included)

These are intentionally left out to keep the template lean. Add what you need:

- **`npm i zod`** — schema validation
- **`npm i @prisma/client prisma`** — database ORM
- **`npm i next-auth`** or **`npm i @clerk/nextjs`** — managed auth
- **`npm i zustand`** — simpler global state
- **`npm i react-query`** or **`npm i swr`** — server-state / caching
- **`npm i stripe`** — payments
