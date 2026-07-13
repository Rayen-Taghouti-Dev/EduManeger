-- CreateTable
CREATE TABLE "auth_sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "user_role_id" TEXT NOT NULL,
    "refresh_token_hash" TEXT NOT NULL,
    "token_family" TEXT NOT NULL,
    "rotated_from_id" TEXT,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "last_used_at" TIMESTAMP(3),
    "revoked_at" TIMESTAMP(3),
    "revoked_reason" TEXT,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_sessions_refresh_token_hash_key" ON "auth_sessions"("refresh_token_hash");

-- CreateIndex
CREATE INDEX "auth_sessions_user_id_idx" ON "auth_sessions"("user_id");

-- CreateIndex
CREATE INDEX "auth_sessions_school_id_idx" ON "auth_sessions"("school_id");

-- CreateIndex
CREATE INDEX "auth_sessions_user_role_id_idx" ON "auth_sessions"("user_role_id");

-- CreateIndex
CREATE INDEX "auth_sessions_token_family_idx" ON "auth_sessions"("token_family");

-- CreateIndex
CREATE INDEX "auth_sessions_expires_at_idx" ON "auth_sessions"("expires_at");

-- CreateIndex
CREATE INDEX "auth_sessions_revoked_at_idx" ON "auth_sessions"("revoked_at");

-- CreateIndex
CREATE INDEX "auth_sessions_user_id_revoked_at_idx" ON "auth_sessions"("user_id", "revoked_at");

-- CreateIndex
CREATE INDEX "auth_sessions_school_id_revoked_at_idx" ON "auth_sessions"("school_id", "revoked_at");

-- CreateIndex
CREATE INDEX "auth_sessions_school_id_user_id_revoked_at_idx" ON "auth_sessions"("school_id", "user_id", "revoked_at");

-- AddForeignKey
ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "user_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_rotated_from_id_fkey" FOREIGN KEY ("rotated_from_id") REFERENCES "auth_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
