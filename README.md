# EduManager Pro

**Enterprise SaaS platform for private schools**

EduManager Pro helps private schools run academics, administration, and operations in one modern multi-tenant platform — with a polished web app, secure NestJS API, and PostgreSQL at the core.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-brightgreen.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15-orange.svg)](https://pnpm.io/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-API-E0234E.svg)](https://nestjs.com/)

---

## Features

- **Multi-tenant school isolation** — JWT auth with membership selection and role-based access (RBAC)
- **Students module** — search, filters, pagination, create/edit/delete, and detailed profiles
- **Dashboard** — KPIs, charts, activity, notifications, and quick actions
- **Internationalization** — French / English with browser language detection
- **Responsive UI** — mobile, tablet, laptop, and desktop layouts
- **Design system** — shared `@edumanager/ui` components (Radix + Tailwind v4)
- **Dark / light theme** — system-aware theme switching

---

## Tech Stack

| Layer | Stack |
|-------|--------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS v4, TanStack Query, Zod, Recharts |
| **Backend** | NestJS, Prisma, PostgreSQL, JWT + refresh tokens |
| **Monorepo** | pnpm workspaces + Turborepo |
| **Shared** | `@edumanager/ui`, `@edumanager/types`, ESLint & TS configs |

---

## Repository Structure

```text
EduManager-Pro/
├── apps/
│   ├── web/                 # Next.js frontend (port 3000)
│   └── api/                 # NestJS API (port 4000)
├── packages/
│   ├── ui/                  # Shared UI component library
│   ├── types/               # Shared Zod schemas & TypeScript types
│   ├── eslint-config/
│   └── ts-config/
├── database/
│   ├── prisma/              # Prisma schema & migrations
│   └── seed/                # Auth & students seed scripts
├── docs/                    # Architecture & product docs
├── infrastructure/          # Docker, nginx, scripts
└── .github/                 # CI/CD workflows
```

---

## Prerequisites

- **Node.js** 20 LTS or later
- **pnpm** 9+ (`corepack enable` recommended)
- **PostgreSQL** 16+ (17 supported)
- **Git**

Optional for full local infra: Docker, Redis, MinIO (see `.env.example`).

---

## Getting Started

### 1. Clone

```bash
git clone https://github.com/Rayen-Taghouti-Dev/EduManeger.git
cd EduManeger
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment

```bash
cp .env.example .env
```

Configure at least:

- `DATABASE_URL`
- `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET`
- `NEXT_PUBLIC_API_URL` (default `http://localhost:4000/api/v1`)
- `CORS_ORIGIN` (default `http://localhost:3000`)

### 4. Database

```bash
# Generate Prisma client
pnpm db:generate

# Apply migrations (or use db:push in early local setup)
pnpm db:migrate

# Seed demo auth users & students
pnpm db:seed:auth
pnpm db:seed:students
```

### 5. Run locally

```bash
# API — http://localhost:4000
pnpm --filter @edumanager/api dev

# Web — http://localhost:3000
pnpm --filter @edumanager/web dev
```

Or run the whole monorepo:

```bash
pnpm dev
```

---

## Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| `admin@greenwood.edu` | `ChangeMe123!` | School Admin |
| `superadmin@edumanager.pro` | `ChangeMe123!` | Super Admin |

> Change these credentials before any shared or production deployment.

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development |
| `pnpm build` | Build the monorepo |
| `pnpm lint` | Lint packages |
| `pnpm typecheck` | TypeScript checks |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:seed:auth` | Seed authentication users |
| `pnpm db:seed:students` | Seed sample students |
| `pnpm db:studio` | Open Prisma Studio |

---

## Documentation

| Document | Description |
|----------|-------------|
| [PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md) | Vision, goals, and scope |
| [TECH_STACK.md](./docs/TECH_STACK.md) | Technology decisions |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System architecture |
| [DATABASE_ARCHITECTURE.md](./docs/DATABASE_ARCHITECTURE.md) | Data model overview |
| [DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) | UI tokens and guidelines |
| [ROADMAP.md](./docs/ROADMAP.md) | Phased delivery plan |

---

## Design Tokens

| Token | Value |
|-------|-------|
| Primary | `#5B5BD6` |
| Secondary | `#2563EB` |
| Success | `#16A34A` |
| Warning | `#D97706` |
| Danger | `#DC2626` |
| Background | `#FAFAFA` |
| Foreground | `#09090B` |

UI direction: clean enterprise SaaS — inspired by Stripe, Linear, Notion, and Vercel.

---

## Contributing

1. Create a feature branch from `main`
2. Use [Conventional Commits](https://www.conventionalcommits.org/)
3. Run `pnpm typecheck` and `pnpm lint` before opening a PR
4. Keep secrets out of git — never commit `.env`

---

## Security

- Do not commit real secrets or production credentials
- Rotate JWT secrets and seed passwords for any non-local environment
- Enforce RBAC and tenant (`schoolId`) isolation on every write path

---

## License

This project is licensed under the **MIT License**.

See [LICENSE](./LICENSE) for the full text.

---

## Author

**Rayen Taghouti**  
GitHub: [@Rayen-Taghouti-Dev](https://github.com/Rayen-Taghouti-Dev)  
Email: [rayen.taghouti.dev@gmail.com](mailto:rayen.taghouti.dev@gmail.com)

Repository: [github.com/Rayen-Taghouti-Dev/EduManeger](https://github.com/Rayen-Taghouti-Dev/EduManeger)
