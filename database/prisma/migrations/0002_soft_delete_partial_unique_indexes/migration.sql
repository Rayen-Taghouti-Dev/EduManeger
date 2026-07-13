-- Soft-delete aware partial unique indexes
-- Allows reusing business keys (student_number, invoice_number, etc.) after soft delete.
-- Prisma @@unique constraints remain as a baseline; these partial indexes enforce
-- uniqueness only among active (non-deleted) records.

-- Schools
DROP INDEX IF EXISTS "schools_slug_key";
CREATE UNIQUE INDEX "schools_slug_active_key" ON "schools" ("slug") WHERE "deleted_at" IS NULL;

-- Users
DROP INDEX IF EXISTS "users_email_key";
CREATE UNIQUE INDEX "users_email_active_key" ON "users" ("email") WHERE "deleted_at" IS NULL;

-- Roles (per-school slug uniqueness among active roles)
DROP INDEX IF EXISTS "roles_school_id_slug_key";
CREATE UNIQUE INDEX "roles_school_id_slug_active_key" ON "roles" ("school_id", "slug") WHERE "deleted_at" IS NULL;

-- Students
DROP INDEX IF EXISTS "students_school_id_student_number_key";
CREATE UNIQUE INDEX "students_school_id_student_number_active_key" ON "students" ("school_id", "student_number") WHERE "deleted_at" IS NULL;

-- Teachers
DROP INDEX IF EXISTS "teachers_school_id_employee_number_key";
CREATE UNIQUE INDEX "teachers_school_id_employee_number_active_key" ON "teachers" ("school_id", "employee_number") WHERE "deleted_at" IS NULL;

-- Classrooms
DROP INDEX IF EXISTS "classrooms_school_id_name_academic_year_key";
CREATE UNIQUE INDEX "classrooms_school_id_name_academic_year_active_key" ON "classrooms" ("school_id", "name", "academic_year") WHERE "deleted_at" IS NULL;

-- Subjects
DROP INDEX IF EXISTS "subjects_school_id_code_key";
CREATE UNIQUE INDEX "subjects_school_id_code_active_key" ON "subjects" ("school_id", "code") WHERE "deleted_at" IS NULL;

-- Grades
DROP INDEX IF EXISTS "grades_school_id_student_id_subject_id_term_academic_year_key";
CREATE UNIQUE INDEX "grades_school_id_student_id_subject_id_term_academic_year_active_key"
  ON "grades" ("school_id", "student_id", "subject_id", "term", "academic_year")
  WHERE "deleted_at" IS NULL;

-- Attendance
DROP INDEX IF EXISTS "attendances_school_id_student_id_date_key";
CREATE UNIQUE INDEX "attendances_school_id_student_id_date_active_key"
  ON "attendances" ("school_id", "student_id", "date")
  WHERE "deleted_at" IS NULL;

-- Invoices
DROP INDEX IF EXISTS "invoices_school_id_invoice_number_key";
CREATE UNIQUE INDEX "invoices_school_id_invoice_number_active_key"
  ON "invoices" ("school_id", "invoice_number")
  WHERE "deleted_at" IS NULL;
