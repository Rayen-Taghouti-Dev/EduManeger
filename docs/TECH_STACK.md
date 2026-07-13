# Technology Stack — EduManager Pro

This document defines the official technology stack for EduManager Pro, including rationale for each choice and version targets.

---

## Stack Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
│  Next.js 15 · React 19 · TypeScript · Tailwind · Shadcn/UI │
│  TanStack Query · React Hook Form · Zod · Recharts          │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS / WebSocket
┌─────────────────────────▼───────────────────────────────────┐
│                        API LAYER                              │
│  NestJS · TypeScript · JWT · RBAC · Socket.IO                │
└──────┬──────────────┬──────────────┬─────────────────────────┘
       │              │              │
┌──────▼──────┐ ┌─────▼─────┐ ┌─────▼─────┐ ┌──────────────────┐
│ PostgreSQL  │ │   Redis   │ │   MinIO   │ │ Gemini Flash Lite│
│  + Prisma   │ │  (Cache)  │ │ (Storage) │ │      (AI)        │
└─────────────┘ └───────────┘ └───────────┘ └──────────────────┘
```

---

## Frontend

### Next.js 15

| Attribute | Detail |
|-----------|--------|
| **Version** | 15.x |
| **Rendering** | App Router, Server Components, SSR/SSG where appropriate |
| **Rationale** | Industry-standard React framework with excellent DX, built-in routing, API routes for BFF patterns, and strong Vercel deployment story |

### React 19

| Attribute | Detail |
|-----------|--------|
| **Version** | 19.x |
| **Rationale** | Latest stable React with improved concurrent features, Actions, and form handling — pairs natively with Next.js 15 |

### TypeScript

| Attribute | Detail |
|-----------|--------|
| **Version** | 5.x |
| **Mode** | Strict (`strict: true`) |
| **Rationale** | Type safety across the entire monorepo; shared types between frontend and backend via `packages/types` |

### Tailwind CSS

| Attribute | Detail |
|-----------|--------|
| **Version** | 4.x (or latest stable) |
| **Rationale** | Utility-first CSS for rapid, consistent UI development; integrates seamlessly with Shadcn/UI |

### Shadcn/UI

| Attribute | Detail |
|-----------|--------|
| **Location** | `packages/ui` |
| **Rationale** | Accessible, customizable component primitives built on Radix UI — not a black-box dependency; components are copied and owned |

### TanStack Query (React Query)

| Attribute | Detail |
|-----------|--------|
| **Version** | 5.x |
| **Rationale** | Server state management — caching, background refetch, optimistic updates, and pagination for API data |

### React Hook Form

| Attribute | Detail |
|-----------|--------|
| **Version** | 7.x |
| **Rationale** | Performant form library with minimal re-renders; pairs with Zod for schema validation |

### Zod

| Attribute | Detail |
|-----------|--------|
| **Version** | 3.x |
| **Rationale** | Runtime schema validation shared between frontend forms and API DTOs via `packages/types` |

### Recharts

| Attribute | Detail |
|-----------|--------|
| **Version** | 2.x |
| **Rationale** | Composable React charting library for dashboards — enrollment trends, revenue, attendance analytics |

---

## Backend

### NestJS

| Attribute | Detail |
|-----------|--------|
| **Version** | 11.x |
| **Location** | `apps/api` |
| **Rationale** | Enterprise-grade Node.js framework with modular architecture, dependency injection, guards, interceptors, and first-class TypeScript support — ideal for large APIs |

### TypeScript

Shared strict configuration via `packages/ts-config`.

---

## Database

### PostgreSQL

| Attribute | Detail |
|-----------|--------|
| **Version** | 16+ |
| **Rationale** | ACID-compliant, mature relational database with JSON support, full-text search, and excellent multi-tenant patterns (schema-per-tenant or row-level isolation) |

### Prisma ORM

| Attribute | Detail |
|-----------|--------|
| **Version** | 6.x |
| **Location** | `database/prisma` |
| **Rationale** | Type-safe database client, declarative schema, migration tooling, and excellent NestJS integration |

---

## Authentication & Authorization

### JWT (JSON Web Tokens)

- Short-lived access tokens (15 minutes default)
- Stateless API authentication
- Signed with RS256 or HS256 (configurable)

### Refresh Tokens

- Long-lived refresh tokens (7 days default)
- Stored securely (httpOnly cookie or database-backed revocation list)
- Rotation on use to prevent replay attacks

### RBAC (Role-Based Access Control)

| Layer | Implementation |
|-------|---------------|
| **API** | NestJS Guards + custom decorators (`@Roles()`, `@Permissions()`) |
| **Database** | Role and permission tables per tenant |
| **Frontend** | Route guards + conditional UI rendering |

**Default Roles (planned):**

- `super_admin` — Platform operator
- `school_admin` — School-level administrator
- `teacher` — Academic staff
- `student` — Enrolled student
- `parent` — Guardian / parent portal
- `finance` — Billing and payments
- `staff` — Non-teaching staff

---

## Real-Time

### Socket.IO

| Attribute | Detail |
|-----------|--------|
| **Version** | 4.x |
| **Use Cases** | Live notifications, messaging, attendance updates, dashboard refreshes |
| **Rationale** | Battle-tested WebSocket library with fallback transports and room-based broadcasting per tenant |

---

## Storage

### MinIO

| Attribute | Detail |
|-----------|--------|
| **Protocol** | S3-compatible API |
| **Use Cases** | Student documents, report cards, school logos, media uploads |
| **Rationale** | Self-hosted object storage with S3 compatibility — no vendor lock-in; works in Docker Compose for local dev |

---

## Cache

### Redis

| Attribute | Detail |
|-----------|--------|
| **Version** | 7+ |
| **Use Cases** | Session cache, rate limiting, pub/sub for Socket.IO scaling, query result caching |
| **Rationale** | In-memory data store with sub-millisecond latency; essential for session management and horizontal scaling |

---

## PDF Generation

### PDFMake

| Attribute | Detail |
|-----------|--------|
| **Use Cases** | Report cards, invoices, receipts, enrollment letters |
| **Rationale** | Client and server-side PDF generation with declarative document definitions |

---

## AI

### Gemini Flash Lite

| Attribute | Detail |
|-----------|--------|
| **Provider** | Google AI |
| **Use Cases** | Smart summaries, draft parent communications, attendance anomaly detection, natural language queries |
| **Rationale** | Fast, cost-effective model suitable for high-volume school operations; low latency for real-time assistance |

---

## DevOps & Infrastructure

### Docker

Containerized services for consistent development and production environments.

### Docker Compose

Local orchestration of PostgreSQL, Redis, MinIO, API, and Web services.

### GitHub Actions

| Workflow | Purpose |
|----------|---------|
| **CI** | Lint, type-check, test on pull requests |
| **CD** | Build and deploy on merge to `main` |
| **Security** | Dependency audit, secret scanning |

### Nginx

Reverse proxy, SSL termination, static asset serving, and load balancing in production.

---

## Monorepo Tooling

| Tool | Purpose |
|------|---------|
| **pnpm** | Fast, disk-efficient package manager with workspace support |
| **Turborepo** (planned) | Build orchestration and caching across apps and packages |
| **packages/eslint-config** | Shared lint rules |
| **packages/ts-config** | Shared `tsconfig` bases |
| **packages/types** | Shared interfaces, enums, Zod schemas |
| **packages/ui** | Shared Shadcn/UI components |

---

## Version Policy

| Category | Policy |
|----------|--------|
| **Major frameworks** | Pin to LTS; upgrade quarterly with regression testing |
| **Security patches** | Apply within 48 hours |
| **Dependencies** | Renovate bot or manual weekly review |
| **Node.js** | 20 LTS minimum |

---

## Environment Variables

All secrets and configuration are managed via environment variables. See `.env.example` at the repository root for the complete list.

**Never commit:**

- `.env`
- API keys
- Database credentials
- JWT secrets

---

## Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — How technologies connect
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — Frontend UI stack details
- [ROADMAP.md](./ROADMAP.md) — When each technology gets implemented
