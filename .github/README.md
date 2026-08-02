# GitHub Configuration — EduManager Pro

This directory contains GitHub-specific configuration for the **EduManager Pro** monorepo: Actions workflows, automation, and repository metadata helpers.

> Looking for the full project documentation?  
> Start at the root **[README.md](../README.md)**.

---

## Purpose

| Path | Role |
|------|------|
| `workflows/` | CI/CD pipeline definitions (GitHub Actions) |
| `README.md` | Notes for contributors working on automation |

---

## Planned Workflows

These workflows are part of the enterprise hardening phase and will live under `.github/workflows/`:

| File | Trigger | Responsibility |
|------|---------|----------------|
| `ci.yml` | Pull requests | Lint, type-check, unit tests, build verification |
| `cd.yml` | Push / merge to `main` | Build artifacts and deploy to staging/production |
| `security.yml` | Schedule + PRs | Dependency audit, secret scanning, vulnerability checks |

### Suggested CI checks

1. `pnpm install --frozen-lockfile`
2. `pnpm typecheck`
3. `pnpm lint`
4. `pnpm build`
5. Optional: API e2e tests against an ephemeral PostgreSQL service

---

## Local Development Reminder

GitHub Actions are not required to run EduManager Pro locally. For day-to-day development:

```bash
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm --filter @edumanager/api dev
pnpm --filter @edumanager/web dev
```

See the root [Getting Started](../README.md#getting-started) guide for full setup instructions.

---

## Related Documentation

- [ROADMAP.md](../ROADMAP.md) — delivery phases including CI/CD hardening
- [ARCHITECTURE.md](../ARCHITECTURE.md) — system design
- [TECH_STACK.md](../TECH_STACK.md) — technology decisions

---

**Maintainer:** [Rayen Taghouti](https://github.com/Rayen-Taghouti-Dev) · MIT License
