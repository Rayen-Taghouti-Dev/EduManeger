import { z } from 'zod';

export const studentStatusSchema = z.enum([
  'ACTIVE',
  'INACTIVE',
  'GRADUATED',
  'TRANSFERRED',
  'WITHDRAWN',
]);

export const genderSchema = z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']);

export const parentRelationshipSchema = z.enum(['FATHER', 'MOTHER', 'GUARDIAN', 'OTHER']);

export const studentSortFieldSchema = z.enum(['name', 'studentNumber', 'enrollmentDate']);

export const sortOrderSchema = z.enum(['asc', 'desc']);

export const classroomSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  gradeLevel: z.string(),
  section: z.string().nullable().optional(),
  academicYear: z.string(),
  roomNumber: z.string().nullable().optional(),
});

export const studentListItemSchema = z.object({
  id: z.string(),
  studentNumber: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  gender: genderSchema.nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  status: studentStatusSchema,
  enrollmentDate: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
  classroom: classroomSummarySchema.nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const studentParentSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable().optional(),
  relationship: parentRelationshipSchema,
  isPrimary: z.boolean(),
});

export const auditUserSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
});

export const studentAuditSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: auditUserSchema.nullable(),
  updatedBy: auditUserSchema.nullable(),
});

export const studentDetailSchema = studentListItemSchema.extend({
  address: z.string().nullable(),
  parents: z.array(studentParentSchema),
  audit: studentAuditSchema,
});

export const paginatedStudentsSchema = z.object({
  data: z.array(studentListItemSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
});

export const studentQuerySchema = z.object({
  search: z.string().optional(),
  classroomId: z.string().optional(),
  status: studentStatusSchema.optional(),
  gender: genderSchema.optional(),
  sortBy: studentSortFieldSchema.optional(),
  sortOrder: sortOrderSchema.optional(),
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().max(100).optional(),
});

export const studentParentInputSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Adresse e-mail invalide').optional().or(z.literal('')),
  phone: z.string().optional(),
  relationship: parentRelationshipSchema,
  isPrimary: z.boolean().optional(),
});

export const studentFormSchema = z.object({
  studentNumber: z.string().min(1, 'Le numéro d\'élève est requis'),
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  dateOfBirth: z.string().optional(),
  gender: genderSchema.optional(),
  email: z.string().email('Adresse e-mail invalide').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  enrollmentDate: z.string().optional(),
  status: studentStatusSchema,
  classroomId: z.string().optional(),
  parents: z.array(studentParentInputSchema).optional(),
});

export type StudentStatus = z.infer<typeof studentStatusSchema>;
export type Gender = z.infer<typeof genderSchema>;
export type ParentRelationship = z.infer<typeof parentRelationshipSchema>;
export type StudentSortField = z.infer<typeof studentSortFieldSchema>;
export type ClassroomSummary = z.infer<typeof classroomSummarySchema>;
export type StudentListItem = z.infer<typeof studentListItemSchema>;
export type StudentParent = z.infer<typeof studentParentSchema>;
export type StudentDetail = z.infer<typeof studentDetailSchema>;
export type PaginatedStudents = z.infer<typeof paginatedStudentsSchema>;
export type StudentQuery = z.infer<typeof studentQuerySchema>;
export type StudentParentInput = z.infer<typeof studentParentInputSchema>;
export type StudentFormValues = z.infer<typeof studentFormSchema>;
