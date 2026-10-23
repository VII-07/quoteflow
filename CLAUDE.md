# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

QuoteFlow is a B2B portfolio app for creating, validating, versioning and exporting construction estimates. Its purpose is to demonstrate solid business logic, reliable data flow and edge-case handling. The git repo and the Next.js app both live in `web/`. A backend in Node.js + Express + PostgreSQL with **raw SQL** is planned but does not exist yet.

## How to work in this repo

The owner is relearning after a break and must be able to defend every line in an interview, so act as a **mentor and reviewer, not an implementer**:

- Point out bugs, outdated patterns, messy code and architecture issues. Explain _why_, show the correct pattern briefly, and let the owner write the fix. Do not give in to "just do it for me" requests; the owner explicitly asked to be held to this.
- Exceptions: implement **responsive/adaptive layout** directly (delegated permanently), and show the solution when the owner has tried several times and is still stuck.
- Everything written into the repo (code comments, docs) is in **English**. Chat with the owner is in Ukrainian.
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
- `npm run format` / `npm run format:check` runs Prettier with `prettier-plugin-tailwindcss`, which sorts classes. `.prettierrc` points the plugin at `app/globals.css` because Tailwind v4 has no JS config.
- `npm test` runs Vitest in watch mode; `npx vitest run` runs once. Tests sit next to the code (`*.test.ts`).

## Stack

- **Next.js 16.4 App Router + React 19.3.** These are newer than most training data, so check `node_modules/next/dist/docs/` before using Next APIs (see AGENTS.md). `next.config.ts` turns on `cacheComponents`, `partialPrefetching` and `experimental.agentFeedback`. Root layout props use the global `LayoutProps<"/">` type helper, which Next generates into `.next/types`.
- **Tailwind CSS v4** is configured in CSS, not JS. `app/globals.css` imports `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css` and `app/colors.css`. Turbopack processes `*.css` through `@tailwindcss/turbopack`, as set in `next.config.ts`. `tailwind.config.ts` exists, but Tailwind v4 ignores it unless a `@config` directive loads it, and `components.json` leaves `tailwind.config` empty.
- **shadcn/ui** uses the `base-nova` style, built on **`@base-ui/react`** primitives rather than Radix, with `lucide-react` icons. Add components with `npx shadcn add <name>`; they go in `components/ui/`.
- **`cn`** comes from the npm package `cn` (`lib/utils.ts` re-exports it), not from the usual clsx + tailwind-merge helper. Generated shadcn components import it from `"cn"` directly.
- The path alias `@/*` maps to the `web/` root.

## Theming

Design tokens live in `app/colors.css`. `@theme inline` maps `--color-*` utilities to CSS variables. Brand colors are `--primary: #168779` (teal) and `--secondary: #373737` (dark gray). Both `:root` (light) and `.dark` define the full shadcn token set. A global `@layer base` rule gives `button:not(:disabled)` a pointer cursor, since Tailwind v4 resets it. Dark mode uses the class-based `@custom-variant dark` in `globals.css`.

## Specification

`docs/SPEC.md` is the source of truth for the domain model, business rules (money, rounding, tax, status lifecycle, dates), conventions and roadmap. Read it before working on quotes, clients or totals, and update its status tags when a decision changes.

## App structure

- `app/(dashboard)/` is the main app route group. Its `layout.tsx` renders `Header` above `<main>`. Routes: `/`, `/quotes` (list, `new`, `[id]`), `/clients`, `/settings`.
- `app/(auth)/login/` is the auth route group, with no shared layout yet.
- `components/layout/` holds app chrome: `Header`, `NavBar`, `UserSection`, `Logo`. `components/shared/` holds reusable pieces such as `LogoIcon`, and `components/ui/` holds shadcn primitives.
- The domain entity is called **quote** (routes and nav). Some UI text still says "estimate".
