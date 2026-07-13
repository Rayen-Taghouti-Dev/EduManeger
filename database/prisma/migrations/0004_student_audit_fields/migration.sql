-- AlterTable
ALTER TABLE "students" ADD COLUMN "created_by_id" TEXT;
ALTER TABLE "students" ADD COLUMN "updated_by_id" TEXT;

-- CreateIndex
CREATE INDEX "students_created_by_id_idx" ON "students"("created_by_id");
CREATE INDEX "students_updated_by_id_idx" ON "students"("updated_by_id");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "students" ADD CONSTRAINT "students_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
