# Docker assets for EduManager Pro
#
# Production API image lives at apps/api/Dockerfile (Render build context = repo root).
# Build locally:
#   docker build -f apps/api/Dockerfile -t edumanager-api .
#   docker run --env-file .env -p 4000:4000 edumanager-api
#
# See render.yaml at the repository root for Render Blueprint settings.
