# Docker — EduManager Pro API (Render)

## Correct Render settings

| Setting | Value |
|---------|--------|
| **Root Directory** | *(empty)* — do **not** use `apps/api` |
| **Docker Build Context Directory** | `.` |
| **Dockerfile Path** | `./apps/api/Dockerfile` |
| **Health Check Path** | `/api/v1/health` |

## Why Root Directory must be empty

`apps/api/Dockerfile` is a **monorepo** build. Every host `COPY` is relative to the
**repository root**, for example:

- `COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./`
- `COPY packages/types/...`
- `COPY database/...`
- `COPY apps/api/docker-entrypoint.sh ...`

If Render **Root Directory** = `apps/api`, the build context becomes `apps/api/`
only. Then `COPY apps/api/docker-entrypoint.sh` looks for
`apps/api/apps/api/docker-entrypoint.sh` inside the context → **not found**.

## Local build

```bash
docker build -f apps/api/Dockerfile -t edumanager-api .
```

Context `.` is the repo root (same as Render `dockerContext: .` in `render.yaml`).
