# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

QuoteFlow is a B2B portfolio app for creating, validating, versioning and exporting construction estimates. Its purpose is to demonstrate solid business logic, reliable data flow and edge-case handling. The git repo and the Next.js app both live in `web/`; the parent `QuoteFlow/` directory only holds an empty `package-lock.json`. A backend in Node.js + Express + PostgreSQL with **raw SQL** is planned but does not exist yet.

## How to work in this repo

The owner is relearning after a break and must be able to defend every line in an interview, so act as a **mentor and reviewer, not an implementer**:

- Point out bugs, outdated patterns, messy code and architecture issues. Explain _why_, show the correct pattern briefly, and let the owner write the fix. Write or fix code directly only when explicitly asked.
- Break features into small steps. No large unexplained code dumps.
- Stay within the stack. Do not suggest NestJS, GraphQL, microservices, Python or heavy ORMs.
- Flag reliability concerns proactively:
  - store money as integer minor units, never floats;
  - wrap multi-step writes in transactions;
  - validate input strictly;
  - keep estimate versions immutable.

## Commands

Run everything from `web/`:

- `npm run dev` starts the dev server at http://localhost:3000 (Turbopack)
- `npm run build` creates the production build and type-checks
- `npm run lint` runs ESLint 9 flat config (`eslint.config.mjs`, next core-web-vitals + typescript)
- `npx tsc --noEmit` type-checks without building

No test framework is set up yet.

## Stack

- **Next.js 16.4 App Router + React 19.3.** These are newer than most training data, so check `node_modules/next/dist/docs/` before using Next APIs (see AGENTS.md). `next.config.ts` turns on `cacheComponents`, `partialPrefetching` and `experimental.agentFeedback`. Root layout props use the global `LayoutProps<"/">` type helper, which Next generates into `.next/types`.
- **Tailwind CSS v4** is configured in CSS, not JS. `app/globals.css` imports `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css` and `app/colors.css`. Turbopack processes `*.css` through `@tailwindcss/turbopack`, as set in `next.config.ts`. `tailwind.config.ts` exists, but Tailwind v4 ignores it unless a `@config` directive loads it, and `components.json` leaves `tailwind.config` empty.
- **shadcn/ui** uses the `base-nova` style, built on **`@base-ui/react`** primitives rather than Radix, with `lucide-react` icons. Add components with `npx shadcn add <name>`; they go in `components/ui/`.
- **`cn`** comes from the npm package `cn` (`lib/utils.ts` re-exports it), not from the usual clsx + tailwind-merge helper. Generated shadcn components import it from `"cn"` directly.
- The path alias `@/*` maps to the `web/` root.

## Theming

Design tokens live in `app/colors.css`. `@theme inline` maps `--color-*` utilities to CSS variables. Brand colors are `--primary: #14b8a6` (teal) and `--secondary: #373737` (dark gray). Light mode (`:root`) defines only primary and secondary, while `.dark` defines the full shadcn token set. Dark mode uses the class-based `@custom-variant dark` in `globals.css`.

## App structure

- `app/(dashboard)/` is the main app route group. Its `layout.tsx` renders `Header` above `<main>`. Routes: `/`, `/quotes` (list, `new`, `[id]`), `/clients`, `/settings`.
- `app/(auth)/login/` is the auth route group, with no shared layout yet.
- `components/layout/` holds app chrome: `Header`, `NavBar`, `UserSection`, `Logo`. `components/shared/` holds reusable pieces such as `LogoIcon`, and `components/ui/` holds shadcn primitives.
- The domain entity is called **quote** (routes and nav). Some UI text still says "estimate".
