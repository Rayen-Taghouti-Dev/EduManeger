# Architecture — EduManager Pro

This document describes the system architecture, monorepo layout, communication patterns, and development conventions for EduManager Pro.

---

## High-Level Architecture

```
                                    ┌──────────────┐
                                    │   Browser    │
                                    │  (Parents,   │
                                    │  Staff, etc) │
                                    └──────┬───────┘
                                           │
                                    HTTPS / WSS
                                           │
                              ┌────────────▼────────────┐
                              │        Nginx            │
                              │  (SSL, Reverse Proxy)   │
                              └────────────┬────────────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
           ┌────────▼────────┐    ┌────────▼────────┐    ┌───────▼───────┐
           │   apps/web      │    │   apps/api      │    │  Static Assets│
           │   Next.js 15    │    │   NestJS        │    │  (MinIO CDN)  │
           │   Port: 3000    │    │   Port: 4000    │    └───────────────┘
           └────────┬────────┘    └────────┬────────┘
                    │                      │
                    │    REST / GraphQL    │
                    │    WebSocket         │
                    └──────────┬───────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
┌───────▼───────┐    ┌─────────▼─────────┐    ┌───────▼───────┐
│  PostgreSQL   │    │      Redis        │    │     MinIO     │
│  (Primary DB) │    │  (Cache / PubSub) │    │  (Object Store)│
└───────────────┘    └───────────────────┘    └───────────────┘
```

---

## Monorepo Structure

EduManager Pro uses a **monorepo** pattern to colocate applications, shared packages, database assets, and infrastructure in a single repository.

```
EduManager-Pro/
│
├── apps/                          # Deployable applications
│   ├── web/                       # Frontend — Next.js 15
│   └── api/                       # Backend — NestJS
│
├── packages/                      # Shared libraries (not deployed standalone)
│   ├── ui/                        # Shadcn/UI component library
│   ├── types/                     # Shared TypeScript types & Zod schemas
│   ├── eslint-config/             # ESLint presets (base, react, nest)
│   └── ts-config/                 # TypeScript config bases
│
├── database/                      # Database layer (cross-cutting)
│   ├── prisma/                    # schema.prisma, Prisma client generation
│   ├── migrations/                # SQL migration history (if not using Prisma migrate)
│   └── seed/                      # Development seed scripts
│
├── infrastructure/                # DevOps & deployment
│   ├── docker/                    # Dockerfiles, docker-compose.yml
│   ├── nginx/                     # nginx.conf, SSL configs
│   └── scripts/                   # Setup, backup, migration helpers
│
├── docs/                          # Project documentation
│
├── .github/                       # GitHub Actions workflows
│
├── .env.example                   # Environment variable template
├── .gitignore
├── LICENSE
└── README.md
```

---

## Application Layers

### `apps/web` — Frontend

| Concern | Location (planned) |
|---------|-------------------|
| Pages & layouts | `apps/web/src/app/` |
| Feature modules | `apps/web/src/features/` |
| Shared hooks | `apps/web/src/hooks/` |
| API client | `apps/web/src/lib/api/` |
| Auth context | `apps/web/src/lib/auth/` |
| Global styles | `apps/web/src/styles/` |

**Responsibilities:**

- Server and client rendering via Next.js App Router
- User interface and UX
- Client-side form validation (Zod + React Hook Form)
- Server state via TanStack Query
- WebSocket client for real-time features
- Role-based UI rendering

**Does NOT:**

- Contain business logic that belongs in the API
- Directly access the database
- Store secrets

---

### `apps/api` — Backend

| Concern | Location (planned) |
|---------|-------------------|
| Feature modules | `apps/api/src/modules/` |
| Common utilities | `apps/api/src/common/` |
| Guards & decorators | `apps/api/src/common/guards/` |
| Configuration | `apps/api/src/config/` |
| WebSocket gateway | `apps/api/src/gateways/` |

**Responsibilities:**

- RESTful API endpoints
- Authentication (JWT) and authorization (RBAC)
- Business logic and validation
- Database access via Prisma
- File upload orchestration (MinIO)
- Real-time events via Socket.IO
- PDF generation (PDFMake)
- AI integration (Gemini Flash Lite)

**Module structure (planned):**

```
apps/api/src/modules/
├── auth/
├── users/
├── schools/
├── academics/
├── admissions/
├── attendance/
├── finance/
├── communication/
├── reports/
└── ai/
```

Each module follows NestJS conventions:

```
module-name/
├── module-name.module.ts
├── module-name.controller.ts
├── module-name.service.ts
├── dto/
├── entities/          # Prisma model references
└── guards/            # Module-specific guards (if any)
```

---

## Shared Packages

### `packages/types`

Central source of truth for TypeScript interfaces, enums, and Zod schemas shared between `apps/web` and `apps/api`.

```
packages/types/src/
├── auth/
├── users/
├── schools/
├── academics/
└── index.ts
```

### `packages/ui`

Shared Shadcn/UI components, design tokens, and utility classes.

```
packages/ui/src/
├── components/        # Button, Input, Dialog, Table, etc.
├── hooks/
├── lib/               # cn() utility, etc.
└── styles/            # globals.css, tailwind config exports
```

### `packages/eslint-config`

```
packages/eslint-config/
├── base.js
├── react.js
└── nest.js
```

### `packages/ts-config`

```
packages/ts-config/
├── base.json
├── nextjs.json
├── nestjs.json
└── react-library.json
```

---

## Database Layer

### `database/prisma`

- `schema.prisma` — Single source of truth for data models
- Prisma Client generated into `node_modules/.prisma/client`
- Used by `apps/api` via import

### Multi-Tenancy Strategy

**Approach:** Row-level tenant isolation with `schoolId` foreign key on all tenant-scoped tables.

| Aspect | Implementation |
|--------|---------------|
| **Tenant identifier** | `schoolId` on every tenant-scoped record |
| **API enforcement** | Middleware extracts tenant from JWT claims |
| **Query scoping** | Prisma middleware auto-filters by `schoolId` |
| **Super admin** | Cross-tenant access with explicit audit logging |

Alternative (enterprise tier): Schema-per-tenant for maximum isolation.

### `database/migrations`

Holds migration artifacts. Primary migration tool: **Prisma Migrate** (`prisma migrate dev`).

### `database/seed`

Development seed scripts for local testing (no fake production data in repo).

---

## Infrastructure Layer

### `infrastructure/docker`

| File (planned) | Purpose |
|----------------|---------|
| `docker-compose.yml` | Local dev stack (postgres, redis, minio, api, web) |
| `docker-compose.prod.yml` | Production overrides |
| `Dockerfile.api` | NestJS production image |
| `Dockerfile.web` | Next.js production image |

### `infrastructure/nginx`

| File (planned) | Purpose |
|----------------|---------|
| `nginx.conf` | Reverse proxy rules |
| `ssl/` | Certificate placeholders (not committed) |

### `infrastructure/scripts`

| Script (planned) | Purpose |
|------------------|---------|
| `setup.sh` | First-time dev environment setup |
| `migrate.sh` | Run database migrations |
| `seed.sh` | Seed development data |
| `backup.sh` | Database backup utility |

---

## Communication Patterns

### REST API

- Base URL: `/api/v1`
- JSON request/response bodies
- Standard HTTP status codes
- Pagination: `?page=1&limit=20`
- Filtering: query parameters
- Sorting: `?sort=createdAt&order=desc`

### WebSocket (Socket.IO)

- Namespace per tenant: `/school/{schoolId}`
- Events: `notification`, `message`, `attendance:update`
- Authentication via JWT in handshake

### Error Response Format

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Invalid email format" }
  ],
  "timestamp": "2026-06-21T10:00:00.000Z",
  "path": "/api/v1/users"
}
```

---

## Security Architecture

| Layer | Mechanism |
|-------|-----------|
| **Transport** | HTTPS everywhere (TLS 1.2+) |
| **Authentication** | JWT access tokens + refresh token rotation |
| **Authorization** | RBAC guards on every protected endpoint |
| **Input validation** | Zod/class-validator on all DTOs |
| **Rate limiting** | Redis-backed rate limiter |
| **CORS** | Whitelist frontend origin only |
| **Helmet** | Security headers on API |
| **Audit log** | Sensitive actions logged with user, tenant, timestamp |

---

## Caching Strategy

| Data | Cache | TTL |
|------|-------|-----|
| User session | Redis | Token lifetime |
| School settings | Redis | 5 minutes |
| Dashboard aggregates | Redis | 1 minute |
| Static assets | CDN / Nginx | Long-lived |
| API responses | TanStack Query (client) | Stale-while-revalidate |

---

## File Storage Flow

```
Client → API (presigned URL or multipart upload) → MinIO bucket
                                                  └── school-{id}/
                                                      ├── documents/
                                                      ├── media/
                                                      └── reports/
```

- Buckets scoped per school
- Presigned URLs for secure direct upload/download
- File metadata stored in PostgreSQL

---

## CI/CD Pipeline (Planned)

```
Push/PR → GitHub Actions
           ├── Lint (ESLint)
           ├── Type Check (tsc)
           ├── Unit Tests (Jest)
           ├── Integration Tests
           └── Build (Docker images)
                └── Deploy (on merge to main)
```

Workflow files location: `.github/workflows/`

---

## Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Files (TS) | kebab-case | `user-profile.service.ts` |
| Classes | PascalCase | `UserProfileService` |
| Interfaces | PascalCase with `I` prefix optional | `CreateUserDto` |
| Database tables | snake_case | `school_users` |
| API routes | kebab-case | `/api/v1/report-cards` |
| Env variables | SCREAMING_SNAKE_CASE | `DATABASE_URL` |
| React components | PascalCase | `StudentTable.tsx` |
| Git branches | kebab-case | `feature/user-auth` |
| Commits | Conventional Commits | `feat(auth): add refresh token rotation` |

---

## Development Workflow

1. Create feature branch from `develop`
2. Implement in appropriate `apps/` or `packages/` directory
3. Update shared types in `packages/types` if API contract changes
4. Run lint and type-check locally
5. Open pull request → CI runs
6. Code review → merge to `develop`
7. Release branch → merge to `main` → deploy

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code |
| `develop` | Integration branch |
| `feature/*` | New features |
| `fix/*` | Bug fixes |
| `release/*` | Release preparation |

---

## Related Documentation

- [TECH_STACK.md](./TECH_STACK.md) — Technology details
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — UI architecture
- [ROADMAP.md](./ROADMAP.md) — Implementation timeline
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) — Product vision
