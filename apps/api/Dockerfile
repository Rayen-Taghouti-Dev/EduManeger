# EduManager Pro API — production image for Render (Docker)
#
# CRITICAL — Docker build context MUST be the monorepo repository root.
#   Correct local build:
#     docker build -f apps/api/Dockerfile -t edumanager-api .
#
# CRITICAL — Render dashboard (manual Web Service):
#   Root Directory:            (leave EMPTY — do NOT set apps/api)
#   Docker Build Context:      .
#   Dockerfile Path:           ./apps/api/Dockerfile
#
# If Root Directory is set to apps/api, Render scopes the context to apps/api/
# and every COPY of package.json / packages/* / database/* / apps/api/* will fail.
#
# Runtime:
#   - listens on 0.0.0.0:$PORT (Render injects PORT)
#   - health: GET /api/v1/health
#   - entrypoint runs `prisma migrate deploy` then starts Nest

ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-bookworm-slim AS base
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
WORKDIR /app

# ─── Install workspace dependencies ───────────────────────────────────────────
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/ts-config ./packages/ts-config
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY database/prisma ./database/prisma

RUN pnpm install --frozen-lockfile --filter @edumanager/api...

# ─── Build types + API ────────────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app /app
COPY apps/api ./apps/api
COPY packages/types ./packages/types
COPY packages/ts-config ./packages/ts-config
COPY packages/eslint-config ./packages/eslint-config
COPY database ./database

RUN pnpm --filter @edumanager/types build \
  && pnpm --filter @edumanager/api build

# ─── Production runtime ───────────────────────────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production
ENV RUN_MIGRATIONS=true

COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/turbo.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/packages/types/package.json ./packages/types/package.json
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/packages/types/node_modules ./packages/types/node_modules
COPY --from=builder /app/packages/ts-config ./packages/ts-config
COPY --from=builder /app/database ./database
COPY apps/api/docker-entrypoint.sh /app/apps/api/docker-entrypoint.sh

RUN chmod +x /app/apps/api/docker-entrypoint.sh \
  && ln -sf /app/node_modules/.bin/prisma /usr/local/bin/prisma || true

WORKDIR /app/apps/api
EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||process.env.API_PORT||4000)+'/api/v1/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "dist/main.js"]
