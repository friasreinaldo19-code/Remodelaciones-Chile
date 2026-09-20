# Oficio Norte — Remodelaciones

Sitio web multipágina para un maestro de obra en Santiago, Chile, con servicios, proyectos Antes / Después, precios referenciales y contacto directo por WhatsApp.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/remodelaciones-chile run dev` — run the public website
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/remodelaciones-chile/src/App.tsx` — shared shell, routes, page content, WhatsApp links and editable placeholders
- `artifacts/remodelaciones-chile/src/index.css` — shared visual system, responsive layout, typography, motion and palette variables
- `artifacts/remodelaciones-chile/public/images/` — generated renovation imagery used by the static site
- `artifacts/remodelaciones-chile/public/robots.txt` — basic crawler policy

## Architecture decisions

- The public site is frontend-only and uses wouter for client-side page routing; no backend or database is needed for the current brochure experience.
- All pages use one shared header and footer so contact details and navigation remain consistent.
- WhatsApp is the primary conversion path; the contact form formats the visitor's message and opens WhatsApp with the details prefilled.
- Phone, location, imagery, and team photography are intentionally marked as replacement points in `App.tsx` for future customization.

## Product

The site includes Inicio, Servicios, Antes / Después, Nosotros, Precios and Contacto pages, plus a responsive hamburger menu, floating WhatsApp action, project gallery, service detail cards, price ranges and a contact handoff form.

## User preferences

The site should remain mobile-first, readable, editable and easy to expand with additional services, projects and team members.

## Gotchas

- The Vite config expects `PORT` and `BASE_PATH`; managed workflows provide them automatically. For a manual production build, set both variables.
- Replace the WhatsApp number before publishing; the current value is an intentional placeholder.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
