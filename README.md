# EduManager Pro

### The operating system for modern private schools

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-brightgreen.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15-orange.svg)](https://pnpm.io/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E.svg)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16%2B-336791.svg)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6.svg)](https://www.typescriptlang.org/)

**EduManager Pro** is an enterprise-grade, multi-tenant SaaS platform built for private schools. It unifies academic operations, administration, student management, and analytics into one secure, modern web application — replacing fragmented spreadsheets and disconnected tools.

> **Repository:** [github.com/Rayen-Taghouti-Dev/EduManeger](https://github.com/Rayen-Taghouti-Dev/EduManeger)

---

## Table of Contents

- [Why EduManager Pro](#why-edumanager-pro)
- [Key Features](#key-features)
- [Product Screens](#product-screens)
- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Demo Accounts](#demo-accounts)
- [Available Scripts](#available-scripts)
- [API Overview](#api-overview)
- [Internationalization](#internationalization)
- [Design System](#design-system)
- [Security & Multi-Tenancy](#security--multi-tenancy)
- [Roadmap](#roadmap)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Author](#author)

---

## Why EduManager Pro

Private schools often operate with disconnected tools: spreadsheets for enrollments, separate billing software, email threads for parent communication, and no single source of truth.

EduManager Pro is designed to be that single source of truth:

| Challenge | How EduManager Pro helps |
|-----------|--------------------------|
| Fragmented student records | Centralized student profiles, parents, and classroom assignments |
| Weak access control | JWT authentication + RBAC (Super Admin, School Admin, Teacher, …) |
| No school isolation | Strict multi-tenant data scoping by `schoolId` |
| Poor UX for staff | Premium SaaS UI inspired by Stripe, Linear, Notion, and Vercel |
| Limited language support | Built-in French / English with automatic browser detection |
| Desktop-only tools | Fully responsive layouts for phone, tablet, laptop, and desktop |

---

## Key Features

### Authentication & Access Control
- Secure login with JWT access tokens and refresh-token rotation
- Multi-membership selection when a user belongs to several schools
- Role-based access control enforced on both API and UI layers
- Soft session handling with protected dashboard routes

### Students Management (Production CRUD)
- Search by student number, first name, or last name
- Filters by classroom, status, and gender
- Sortable columns and paginated results
- Create / edit / soft-delete student records
- Parent / guardian and emergency contact data
- Detailed student profile page with audit metadata

### Dashboard & Insights
- KPI cards (students, teachers, classes, attendance)
- Enrollment trend, attendance, performance, and revenue charts
- Recent activity feed, notifications panel, and quick actions
- Fully localized dashboard content (FR / EN)

### Platform Experience
- Public marketing landing page
- Dark / light / system theme switching
- Branded favicon and consistent visual identity
- Mobile drawer navigation and tablet-optimized layouts
- Accessible dialogs, selects, and focus management

---

## Product Screens

| Area | Route | Description |
|------|-------|-------------|
| Landing | `/landing` | Public marketing page (features, pricing, FAQ) |
| Login | `/login` | Authentication + school membership selection |
| Dashboard | `/dashboard` | Operational overview and analytics widgets |
| Students | `/students` | Student directory with filters and actions |
| Student profile | `/students/[id]` | Detailed student record and contacts |
| Modules (placeholders) | `/teachers`, `/classes`, `/finance`, … | Ready for upcoming business modules |

---

## Architecture Overview

EduManager Pro is a **pnpm + Turborepo monorepo** with clear separation between applications and shared packages.

```text
┌──────────────────────────┐       ┌──────────────────────────┐
│   apps/web (Next.js 15)  │──────▶│   apps/api (NestJS 11)   │
│   React 19 · Tailwind 4  │ HTTP  │   JWT · RBAC · Prisma    │
└──────────────────────────┘       └────────────┬─────────────┘
                                               │
                                               ▼
                                    ┌──────────────────────┐
                                    │  PostgreSQL + Prisma │
                                    │  Multi-tenant schema │
                                    └──────────────────────┘

Shared packages:
  @edumanager/ui      → Design system / Radix components
  @edumanager/types  → Shared Zod schemas & TypeScript types
```

### Design principles

1. **Tenant isolation first** — every school-scoped query filters by `schoolId`
2. **Type safety end-to-end** — shared schemas between API and web
3. **Composable UI** — one design system package used across the product
4. **Progressive modules** — ship core flows first (auth, students), then expand

---

## Technology Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4 |
| **UI Kit** | Radix UI primitives, Lucide icons, custom `@edumanager/ui` |
| **Data / Forms** | TanStack Query, React Hook Form, Zod |
| **Charts** | Recharts |
| **Backend** | NestJS 11, Passport JWT, class-validator |
| **Database** | PostgreSQL 16+, Prisma ORM |
| **Auth** | Access JWT + HTTP-only refresh cookie |
| **Monorepo** | pnpm workspaces, Turborepo |
| **Tooling** | ESLint, Prettier, TypeScript project references |

Planned / optional infrastructure (see `.env.example`): Redis, MinIO, Socket.IO, SMTP, Gemini AI.

---

## Repository Structure

```text
EduManeger/
├── apps/
│   ├── web/                     # Next.js frontend (http://localhost:3000)
│   │   └── src/
│   │       ├── app/             # App Router pages & layouts
│   │       ├── components/      # Feature UI (shell, dashboard, students, …)
│   │       ├── i18n/            # FR / EN translation dictionaries
│   │       ├── lib/             # API clients, helpers, demo data
│   │       ├── providers/       # Auth, locale, query, toast
│   │       └── stores/          # Zustand stores (shell, locale)
│   └── api/                     # NestJS backend (http://localhost:4000)
│       └── src/
│           ├── modules/         # Auth, students, …
│           ├── common/          # Guards, decorators, enums
│           └── prisma/          # Prisma service
├── packages/
│   ├── ui/                      # Shared component library + design tokens
│   ├── types/                   # Shared Zod schemas & DTOs
│   ├── eslint-config/
│   └── ts-config/
├── database/
│   ├── prisma/                  # schema.prisma + migrations
│   └── seed/                    # Auth & students seed scripts
├── docs/                        # Architecture & product documentation
├── infrastructure/              # Docker, nginx, automation scripts
├── .github/                     # GitHub Actions configuration
├── .env.example                 # Environment template
├── LICENSE                      # MIT
└── README.md
```

---

## Prerequisites

Install the following before running the project locally:

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | **20 LTS+** | Required by engines |
| pnpm | **9.15+** | `corepack enable` then `corepack prepare pnpm@9.15.9 --activate` |
| PostgreSQL | **16+** (17 OK) | Local service or Docker |
| Git | latest | Version control |

Optional:

- Docker & Docker Compose (full local infra)
- Redis / MinIO (cache & object storage — future modules)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Rayen-Taghouti-Dev/EduManeger.git
cd EduManeger
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Update `.env` with your local PostgreSQL credentials and strong JWT secrets.

### 4. Prepare the database

```bash
# Generate Prisma Client
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Seed authentication users
pnpm db:seed:auth

# Seed sample students & classrooms
pnpm db:seed:students
```

### 5. Start development servers

Open two terminals (recommended):

```bash
# Terminal 1 — API on http://localhost:4000
pnpm --filter @edumanager/api dev

# Terminal 2 — Web on http://localhost:3000
pnpm --filter @edumanager/web dev
```

Or start the whole workspace:

```bash
pnpm dev
```

Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## Environment Variables

Critical variables (see `.env.example` for the full list):

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/edumanager_pro` |
| `API_PORT` | NestJS listen port | `4000` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:3000` |
| `JWT_ACCESS_SECRET` | Access token signing secret | *(long random string)* |
| `JWT_REFRESH_SECRET` | Refresh token signing secret | *(long random string)* |
| `NEXT_PUBLIC_API_URL` | Frontend API base URL | `http://localhost:4000/api/v1` |
| `AUTH_SEED_PASSWORD` | Password used by auth seed | `ChangeMe123!` |

> **Never commit `.env`**. Only `.env.example` belongs in version control.

---

## Demo Accounts

After seeding, you can sign in with:

| Email | Password | Role |
|-------|----------|------|
| `admin@greenwood.edu` | `ChangeMe123!` | `SCHOOL_ADMIN` |
| `superadmin@edumanager.pro` | `ChangeMe123!` | `SUPER_ADMIN` |

These credentials are for **local development only**. Rotate them before any shared, staging, or production deployment.

---

## Available Scripts

### Root workspace

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all workspace dependencies |
| `pnpm dev` | Run apps in development mode via Turborepo |
| `pnpm build` | Build all packages and applications |
| `pnpm lint` | Lint the monorepo |
| `pnpm typecheck` | Run TypeScript checks |
| `pnpm format` | Format files with Prettier |
| `pnpm db:generate` | Generate Prisma Client |
| `pnpm db:migrate` | Run Prisma migrations (dev) |
| `pnpm db:migrate:deploy` | Deploy migrations (CI / prod) |
| `pnpm db:push` | Push schema without migration files |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:seed:auth` | Seed auth users & roles |
| `pnpm db:seed:students` | Seed classrooms & students |

### App-specific

```bash
pnpm --filter @edumanager/web dev
pnpm --filter @edumanager/web build
pnpm --filter @edumanager/api dev
pnpm --filter @edumanager/api build
pnpm --filter @edumanager/ui typecheck
```

---

## API Overview

Base URL (local): `http://localhost:4000/api/v1`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/login` | Authenticate user | Public |
| `POST` | `/auth/select-membership` | Choose school membership | Session |
| `POST` | `/auth/refresh` | Rotate tokens | Cookie |
| `POST` | `/auth/logout` | End session | Auth |
| `GET` | `/students` | List students (filters + pagination) | Auth + RBAC |
| `POST` | `/students` | Create student | Admin roles |
| `GET` | `/students/:id` | Student detail | Auth + RBAC |
| `PATCH` | `/students/:id` | Update student | Admin roles |
| `DELETE` | `/students/:id` | Soft-delete student | Admin roles |
| `GET` | `/students/classrooms` | List classrooms for filters | Auth + RBAC |

All school-scoped endpoints enforce tenant isolation via the authenticated user's `schoolId`.

---

## Internationalization

EduManager Pro ships with first-class **French** and **English** support.

- Dictionaries live in `apps/web/src/i18n/locales/`
- Browser / console language is detected on first visit
- Users can switch language anytime with the **FR | EN** control
- Preference is persisted in `localStorage`
- Covered surfaces include landing, auth, shell navigation, dashboard, and students

---

## Design System

Shared UI is published as `@edumanager/ui` and consumed by the web app.

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#5B5BD6` | Buttons, active nav, brand accents |
| Secondary | `#2563EB` | Supporting actions / charts |
| Success | `#16A34A` | Positive states |
| Warning | `#D97706` | Attention states |
| Danger | `#DC2626` | Destructive actions |
| Background | `#FAFAFA` | App canvas |
| Surface | `#FFFFFF` | Cards / dialogs |
| Foreground | `#09090B` | Primary text |

Principles:

- Clean enterprise SaaS aesthetic
- Consistent spacing and control heights
- Accessible focus rings and keyboard navigation
- Responsive-first layouts (drawer nav on mobile, sidebar on desktop)

Full guidelines: [docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md)

---

## Security & Multi-Tenancy

EduManager Pro is built with security and isolation as defaults:

- **JWT access tokens** for API authorization
- **Refresh tokens** delivered via HTTP-only cookies
- **RBAC guards** on NestJS controllers
- **Tenant scoping** — queries always constrained by `schoolId`
- **Soft deletes** for recoverable student records
- **Audit fields** (`createdBy`, `updatedBy`, timestamps) on core entities
- **No secrets in git** — `.env` is ignored; use `.env.example`

Recommended before production:

1. Generate unique JWT secrets (32+ characters)
2. Enable HTTPS and secure cookies (`AUTH_COOKIE_SECURE=true`)
3. Rotate seed passwords
4. Add rate limiting, monitoring, and automated backups

---

## Roadmap

| Phase | Focus | Status |
|-------|-------|--------|
| **0 — Foundation** | Docs, monorepo, design system | Done |
| **1 — Infrastructure & Auth** | NestJS auth, JWT, app shell | Done |
| **2 — MVP Core** | Students module, dashboard UX | In progress |
| **3 — Business Modules** | Teachers, classes, finance, grades | Planned |
| **4 — Intelligence** | Advanced analytics, AI assistant | Planned |
| **5 — Enterprise Hardening** | CI/CD, observability, scaling | Planned |

Detailed timeline: [docs/ROADMAP.md](./docs/ROADMAP.md)

---

## Documentation

| Document | Description |
|----------|-------------|
| [PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md) | Vision, mission, personas, and scope |
| [TECH_STACK.md](./docs/TECH_STACK.md) | Technology choices and rationale |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System architecture & conventions |
| [DATABASE_ARCHITECTURE.md](./docs/DATABASE_ARCHITECTURE.md) | Data model and Prisma strategy |
| [DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) | Visual identity and UI rules |
| [ROADMAP.md](./docs/ROADMAP.md) | Phased delivery plan |

---

## Contributing

Contributions are welcome.

1. Fork the repository and create a feature branch from `main`
2. Follow [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `feat:`, `fix:`, `docs:`)
3. Keep changes focused and documented
4. Run quality checks before opening a PR:

```bash
pnpm typecheck
pnpm lint
```

5. Open a pull request describing **what** changed and **why**

Please do not commit:

- `.env` or secrets
- `node_modules`, `.next`, or build artifacts
- Personal credentials or production dump files

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| API returns 500 on login | PostgreSQL stopped | Start PostgreSQL service and verify `DATABASE_URL` |
| Web shows Internal Server Error | Stale Next.js cache | Delete `apps/web/.next` and restart `pnpm --filter @edumanager/web dev` |
| CORS errors in browser | Origin mismatch | Align `CORS_ORIGIN` with the web URL |
| Empty students list | Seed not run / wrong school | Run `pnpm db:seed:students` and login as school admin |
| Language not switching | Cache / old bundle | Hard refresh (`Ctrl+F5`) after pull |

---

## License

This project is released under the **MIT License**.

```text
Copyright (c) 2026 Rayen Taghouti
```

You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, subject to the conditions in [LICENSE](./LICENSE).

---

## Author

**Rayen Taghouti**  
Full-stack developer · EduManager Pro

- GitHub: [@Rayen-Taghouti-Dev](https://github.com/Rayen-Taghouti-Dev)
- Email: [rayen.taghouti.dev@gmail.com](mailto:rayen.taghouti.dev@gmail.com)
- Project: [EduManeger on GitHub](https://github.com/Rayen-Taghouti-Dev/EduManeger)

---

<p align="center">
  <b>EduManager Pro</b> — Built for private schools that deserve better software.
  <br />
  <sub>MIT Licensed · Made with care</sub>
</p>
