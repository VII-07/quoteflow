# QuoteFlow: Product & Technical Specification

> Living document. Each rule is tagged with its status:
> **Decided** (agreed and implemented or ready to implement), **Proposed** (recommended, not yet confirmed), **Open** (needs a decision).

## 1. Overview

QuoteFlow is a B2B web app for creating, validating, versioning and exporting **construction estimates (quotes)**.

It is a portfolio project. Its purpose is to demonstrate:

- non-trivial business logic (money, tax, rounding, status lifecycle);
- reliable data flow (integer money, immutable snapshots, transactions);
- deliberate handling of edge cases.

## 2. Scope

### MVP

- Manage clients (list, create, view).
- Create a quote for a client with line items (description, quantity, unit, unit price).
- Live totals while editing a draft (subtotal, VAT, total).
- Status lifecycle: draft → sent → accepted / rejected.
- Read-only view of sent and accepted quotes.
- Dashboard with a quote overview.

### Later

- Quote versioning (edit a sent quote by creating a new version).
- Export to PDF.
- Authentication (logout is currently a stub).
- Backend: Node.js + Express + PostgreSQL with raw SQL.

### Out of scope

- Multiple currencies (the model allows it, but only GBP is supported).
- Discounts and negative line items.
- Payments and invoicing.

## 3. Tech stack

| Layer    | Choice                                                                    |
| -------- | ------------------------------------------------------------------------- |
| Frontend | Next.js 16 (App Router, Cache Components), React 19, TypeScript           |
| UI       | Tailwind CSS v4, shadcn/ui (Base UI primitives), lucide-react             |
| Backend  | Node.js, Express, PostgreSQL, **raw SQL** (no ORM, no NestJS, no GraphQL) |

## 4. Domain model

Field types describe the **API/JSON shape** used in the frontend. The PostgreSQL column type is listed where it differs.

### 4.1 Client

| Field       | Type           | Rule                        | DB            |
| ----------- | -------------- | --------------------------- | ------------- |
| `id`        | `string`       | UUID, technical key         | `uuid`        |
| `name`      | `string`       | company or person, required | `text`        |
| `email`     | `string`       | required, valid email       | `text`        |
| `phone`     | `string?`      | optional                    | `text`        |
| `address`   | `string?`      | optional                    | `text`        |
| `createdAt` | `IsoTimestamp` | ISO timestamp (UTC)         | `timestamptz` |

### 4.2 LineItem

| Field            | Type     | Rule                                                      | DB              |
| ---------------- | -------- | --------------------------------------------------------- | --------------- |
| `id`             | `string` | UUID, also used as the React `key`                        | `uuid`          |
| `description`    | `string` | required, non-empty                                       | `text`          |
| `quantity`       | `number` | > 0, may be fractional, max **3** decimals (**Proposed**) | `numeric(10,3)` |
| `unit`           | `Unit`   | one of `UNITS` (see 4.5)                                  | `text` + check  |
| `unitPriceCents` | `number` | integer ≥ 0, in pence                                     | `bigint`        |

### 4.3 Quote

A quote is either a **draft** or **issued** (sent, accepted, rejected or expired). This is modelled as a **discriminated union on `status`** (**Decided**): `DraftQuote | IssuedQuote`, where the issued statuses are `Exclude<QuoteStatus, "draft">`. An issued quote without stored totals is a compile-time error.

Shared fields:

| Field        | Type           | Rule                                                     | DB             |
| ------------ | -------------- | -------------------------------------------------------- | -------------- |
| `id`         | `string`       | UUID, technical key                                      | `uuid`         |
| `number`     | `string`       | human-readable, unique, e.g. `Q-2026-0042`; never the PK | `text unique`  |
| `clientId`   | `string`       | references `Client.id`                                   | `uuid` FK      |
| `status`     | `QuoteStatus`  | see 5.5                                                  | `text` + check |
| `currency`   | `Currency`     | stored on every quote; always `"GBP"` for now            | `char(3)`      |
| `taxRateBps` | `number`       | integer basis points: `2000` = 20.00%                    | `integer`      |
| `items`      | `LineItem[]`   | at least 1 item before sending                           | separate table |
| `notes`      | `string?`      | payment terms, remarks                                   | `text`         |
| `issueDate`  | `CalendarDate` | **calendar date** `YYYY-MM-DD`                           | `date`         |
| `validUntil` | `CalendarDate` | **calendar date** `YYYY-MM-DD`, ≥ `issueDate`            | `date`         |
| `createdAt`  | `IsoTimestamp` | ISO timestamp (UTC)                                      | `timestamptz`  |
| `updatedAt`  | `IsoTimestamp` | ISO timestamp (UTC)                                      | `timestamptz`  |

Status-specific fields:

| Variant | `status`                                             | Extra fields                               |
| ------- | ---------------------------------------------------- | ------------------------------------------ |
| Draft   | `"draft"`                                            | none; totals are **calculated** on the fly |
| Issued  | `"sent"` / `"accepted"` / `"rejected"` / `"expired"` | `totals: QuoteTotals`, **stored** snapshot |

### 4.4 QuoteTotals

| Field           | Type     | Meaning                               |
| --------------- | -------- | ------------------------------------- |
| `subtotalCents` | `number` | sum of rounded line totals, excl. VAT |
| `taxCents`      | `number` | VAT on the subtotal                   |
| `totalCents`    | `number` | `subtotalCents + taxCents`            |

### 4.5 Enumerations

| Name          | Values                                                       | Status      |
| ------------- | ------------------------------------------------------------ | ----------- |
| `QuoteStatus` | `"draft" \| "sent" \| "accepted" \| "rejected" \| "expired"` | **Decided** |
| `Currency`    | `"GBP"`                                                      | **Decided** |
| `Unit`        | `"pcs"`, `"sq_m"`, `"m"`, `"kg"`, `"hr"`, `"day"`            | **Decided** |

**Units** live in `features/quotes/units.ts`. They are defined **once**, as a `const` array (`UNITS`). The `Unit` type is derived from that array, and the UI labels come from `UNIT_LABELS`, checked with `satisfies Record<Unit, string>`. The dropdown, the type and the labels then cannot drift apart. The array order is the dropdown order. `hr` and `day` are both labour units and are never converted into each other.

**Currency** (**Decided**): every quote **stores its own `currency`**, like a receipt that shows the £ sign next to the amount. Only `"GBP"` is supported, and the `Currency` type and the `CURRENCY` default live in `types/common.ts`. Why store it: an amount in cents is meaningless without its currency, and if more currencies are ever added, existing quotes already say what they are, so no backfill migration is needed.

**Date aliases** (`types/common.ts`): `CalendarDate` (`YYYY-MM-DD`) and `IsoTimestamp` (ISO in UTC). Both are plain `string` aliases. They document intent, but TypeScript does not stop one being assigned to the other.

## 5. Business rules

### 5.1 Money (**Decided**)

- All amounts are **integers in pence**. Floats are never used for money.
- Tax rates are **integers in basis points** (1% = 100 bps).
- Formatting happens **only at display time**: `Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" })`.

### 5.2 Calculation and rounding (**Decided**: Half-Up, **per line**)

1. `lineTotal = round(quantity × unitPriceCents)` for **each line**.
2. `subtotal = Σ lineTotal`.
3. `tax = round(subtotal × taxRateBps / 10 000)`, calculated **once**, on the subtotal.
4. `total = subtotal + tax`.

Rounding is **Half-Up**. Invariant: the sum of the displayed line totals always equals the displayed subtotal.

Implemented as a single **pure function** (`calculateQuoteTotals`) in `features/quotes/`, with no React and no I/O, so it can be unit-tested.

> ⚠️ `Math.round` is Half-Up only for non-negative numbers (`Math.round(-2.5) === -2`). That's fine while negative lines are out of scope, but revisit it if discounts are added.

#### Reference example (use as a test case)

| Line        | Qty | Unit   | Unit price | Exact  | Line total (rounded) |
| ----------- | --- | ------ | ---------- | ------ | -------------------- |
| Floor tiles | 2.5 | `sq_m` | 1999       | 4997.5 | **4998**             |
| Fixings     | 3   | `pcs`  | 1000       | 3000   | **3000**             |
| Subtotal    |     |        |            |        | **7998**             |
| VAT 20%     |     |        |            | 1599.6 | **1600**             |
| **Total**   |     |        |            |        | **9598** (£95.98)    |

### 5.3 Totals: calculate or store (**Decided**: snapshot)

- **Draft:** totals are calculated from the line items on every change and are **not stored**.
- **On send:** totals are calculated once and **stored as a snapshot**. From then on the stored values are the source of truth, even if the rounding logic or tax rules change later.

### 5.4 Dates (**Decided**)

- Dates travel as **strings** because JSON has no date type. Typing them as `Date` would be a lie at runtime.
- **Moments in time** (`createdAt`, `updatedAt`): ISO timestamp in UTC.
- **Calendar dates** (`issueDate`, `validUntil`): `YYYY-MM-DD`, with no time and no timezone.
- In types, use the `CalendarDate` and `IsoTimestamp` aliases instead of a bare `string`.

> ⚠️ `new Date("2026-10-13")` is parsed as midnight **UTC**, so in timezones behind UTC it displays as the previous day. Never convert a calendar date to `Date` just to display it.

### 5.5 Status lifecycle

| From       | To         | Allowed  | Notes                                       |
| ---------- | ---------- | -------- | ------------------------------------------- |
| `draft`    | `sent`     | ✅       | requires ≥ 1 line item; snapshots totals    |
| `sent`     | `accepted` | ✅       | final                                       |
| `sent`     | `rejected` | ✅       | final                                       |
| `sent`     | `expired`  | ✅       | **server only**, see 5.7                    |
| `sent`     | `draft`    | **Open** | probably via a new version instead (see 7)  |
| `accepted` | any        | ❌       | accepted quotes are immutable; never expire |
| `rejected` | any        | ❌       | final                                       |
| `expired`  | any        | **Open** | re-issue probably via a new version (see 7) |

### 5.6 Editing (**Decided**)

- Only `draft` quotes are editable.
- `accepted`, `rejected` and `expired` quotes are read-only.

### 5.7 Expiry (**Decided**: stored status, set on the server)

- `expired` is a **stored** status.
- A scheduled **server-side job** moves `sent` quotes whose `validUntil` has passed to `expired`.
- The frontend never computes or writes expiry. The status changes when the quote actually expires, not when someone happens to open it.
- Only `sent` quotes can expire. `draft`, `accepted` and `rejected` are untouched.
- Until the backend exists, mocks contain `expired` quotes directly.

## 6. Frontend architecture

### 6.1 Folder structure (**Decided**)

```
web/
├── app/                    # routes only (App Router)
├── components/
│   ├── layout/             # app chrome: Header, Footer, nav
│   ├── shared/             # reusable non-domain pieces
│   └── ui/                 # shadcn primitives
├── features/
│   ├── quotes/             # types, units, calculateQuoteTotals, data access
│   └── clients/            # types, data access
├── lib/                    # app-wide helpers (navigation, utils)
└── types/                  # shared types (Currency, CalendarDate, IsoTimestamp)
```

### 6.2 Data access (**Decided**)

- Pages and components never import mock arrays directly.
- They call async functions such as `getQuotes(): Promise<Quote[]>`, which return mocks for now and will call the API later. Only these functions change when the backend arrives.
- Pages are **Server Components** that `await` data. No `useEffect` fetching.

### 6.3 Conventions

- `export default` only for Next.js special files (`page`, `layout`, …). Everything else uses named exports.
- `"use client"` sits as low in the tree as possible (see `NavLink` / `NavLinkView`).
- Container/presentational split when logic and markup separate cleanly.
- Colors come only from theme tokens, in pairs (`bg-X` + `text-X-foreground`). No raw palette colors.
- With Cache Components: `new Date()`, `Math.random()`, `usePathname()` and similar need `"use cache"`, `<Suspense>` or a Client Component.
- All code comments and docs are in English.

## 7. Open questions

| Topic              | Question                                                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Client snapshot    | If a client's address changes after a quote is sent, the sent quote should still show the old address. Snapshot client details on send? |
| Versioning         | How is a sent quote changed: a new `QuoteVersion` row with `version: number`, previous versions immutable?                              |
| Quantity precision | Confirm the 3-decimal limit and where it's validated (form, API, DB).                                                                   |
| Expiry job         | How often does the expiry job run, and in which timezone is "past `validUntil`" evaluated? (UK: Europe/London)                          |
| Quote numbering    | Who generates `Q-YYYY-NNNN`, and how are duplicates under concurrency avoided? (backend, inside a transaction)                          |

## 8. Edge cases checklist (mocks and tests)

- [ ] Empty quote list (dashboard empty state)
- [ ] Quote with zero line items (draft only, cannot be sent)
- [ ] Very long client name or line description (layout must not break)
- [ ] Total of £0.00
- [ ] Very large total (e.g. £9,999,999.99) still fits and formats correctly
- [ ] Fractional quantity that needs rounding (reference example in 5.2)
- [ ] `taxRateBps = 0` (zero-rated work)
- [ ] `validUntil` in the past
- [ ] Each status represented at least once

## 9. Roadmap

| Step | Scope                                                                | Status      |
| ---- | -------------------------------------------------------------------- | ----------- |
| 1    | Active nav item (`usePathname`, Suspense fallback)                   | Done        |
| 2    | Mobile navigation (Sheet)                                            | Done        |
| 3    | User menu (DropdownMenu)                                             | Done        |
| 4    | Footer, sticky layout, `Container`                                   | Done        |
| 5    | Types ✅ + `calculateQuoteTotals` + mock data layer                  | In progress |
| 6    | Pages on mock data: dashboard, quotes (list / new / detail), clients | Next        |
| 7    | Backend: Express + PostgreSQL, transactions, validation, versioning  | Later       |
