#!/bin/sh
set -eu

cd /app

if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
  echo "[entrypoint] Running prisma migrate deploy..."
  if [ -z "${DATABASE_URL:-}" ]; then
    echo "[entrypoint] ERROR: DATABASE_URL is required for migrations." >&2
    exit 1
  fi
  if [ -z "${DIRECT_URL:-}" ]; then
    echo "[entrypoint] WARNING: DIRECT_URL is unset; defaulting to DATABASE_URL for migrations."
    export DIRECT_URL="$DATABASE_URL"
  fi
  pnpm exec prisma migrate deploy --schema database/prisma/schema.prisma
  echo "[entrypoint] Migrations complete."
else
  echo "[entrypoint] Skipping migrations (RUN_MIGRATIONS=${RUN_MIGRATIONS})."
fi

cd /app/apps/api
echo "[entrypoint] Starting API: $*"
exec "$@"
