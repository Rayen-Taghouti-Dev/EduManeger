# EduManager Pro

**Enterprise SaaS platform for private schools**

EduManager Pro is a modern, multi-tenant school management platform designed to help private schools operate efficiently — from admissions and academics to finance, communication, and reporting.

---

## Overview

| Attribute | Value |
|-----------|-------|
| **Project** | EduManager Pro |
| **Type** | Enterprise SaaS |
| **Target** | Private Schools |
| **Architecture** | Monorepo (Turborepo-style) |
| **License** | MIT |

---

## Repository Structure

```
EduManager-Pro/
├── apps/
│   ├── web/              # Next.js 15 frontend application
│   └── api/              # NestJS backend API
├── packages/
│   ├── ui/               # Shared Shadcn/UI component library
│   ├── types/            # Shared TypeScript types & interfaces
│   ├── eslint-config/    # Shared ESLint configuration
│   └── ts-config/        # Shared TypeScript configuration
├── database/
│   ├── prisma/           # Prisma schema & client
│   ├── migrations/       # Database migration artifacts
│   └── seed/             # Seed scripts
├── infrastructure/
│   ├── docker/           # Docker & Compose definitions
│   ├── nginx/            # Reverse proxy configuration
│   └── scripts/          # DevOps & automation scripts
├── docs/                 # Project documentation
└── .github/              # GitHub Actions workflows
```

---

## Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn/UI |
| **State & Forms** | TanStack Query, React Hook Form, Zod |
| **Backend** | NestJS, TypeScript |
| **Database** | PostgreSQL, Prisma ORM |
| **Auth** | JWT, Refresh Tokens, RBAC |
| **Real-time** | Socket.IO |
| **Storage** | MinIO |
| **Cache** | Redis |
| **Charts** | Recharts |
| **PDF** | PDFMake |
| **AI** | Gemini Flash Lite |
| **DevOps** | Docker, Docker Compose, GitHub Actions |

See [docs/TECH_STACK.md](./docs/TECH_STACK.md) for full details.

---

## Documentation

| Document | Description |
|----------|-------------|
| [PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md) | Vision, goals, and scope |
| [TECH_STACK.md](./docs/TECH_STACK.md) | Technology decisions and rationale |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System architecture and folder conventions |
| [DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) | Visual identity and UI guidelines |
| [ROADMAP.md](./docs/ROADMAP.md) | Development phases and milestones |

---

## Getting Started

> **Note:** This repository is in the **foundation phase**. Application code, Docker services, and database schemas have not been implemented yet. Follow the roadmap for upcoming setup steps.

### Prerequisites (for future development)

- Node.js 20 LTS or later
- pnpm 9+ (recommended package manager)
- Docker & Docker Compose
- PostgreSQL 16+
- Redis 7+
- Git

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/EduManager-Pro.git
   cd EduManager-Pro
   ```

2. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

3. Fill in the required values in `.env` (see `.env.example` for descriptions).

4. Refer to [docs/ROADMAP.md](./docs/ROADMAP.md) for the implementation timeline.

---

## Development Standards

- **TypeScript** everywhere — strict mode enabled
- **Conventional Commits** for all commit messages
- **Feature branches** with pull request reviews
- **Shared packages** for types, UI, and tooling configs
- **Environment variables** never committed — use `.env.example` as reference
- **RBAC** enforced at API and UI layers
- **Multi-tenancy** by design — school-scoped data isolation

---

## Visual Identity

| Token | Value |
|-------|-------|
| Primary | `#4F46E5` |
| Secondary | `#3B82F6` |
| Success | `#22C55E` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |
| Background | `#F8FAFC` |
| Text | `#0F172A` |

UI style: Modern SaaS — clean, enterprise, professional. Inspired by Stripe, Notion, Vercel, and Linear.

See [docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) for complete design guidelines.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Contributing

Contributions are welcome once the development environment is fully scaffolded. Please read the documentation in `docs/` before opening a pull request.
