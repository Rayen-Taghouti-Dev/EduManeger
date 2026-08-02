'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { GraduationCap, Phone, User, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { ParentRelationship, StudentDetail, StudentFormValues } from '@edumanager/types';
import { studentFormSchema } from '@edumanager/types';

import {
  StudentFormField,
  StudentFormSection,
  studentFormControlClassName,
  studentFormSelectTriggerClassName,
} from '@/components/students/student-form-section';
import {
  GENDER_OPTIONS,
  PARENT_RELATIONSHIP_OPTIONS,
  STUDENT_STATUS_OPTIONS,
} from '@/lib/students/constants';
import { useClassroomsQuery } from '@/lib/students/queries';
import { useI18n } from '@/providers/locale-provider';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@edumanager/ui';

interface StudentFormProps {
  defaultValues?: Partial<StudentFormValues>;
  submitLabel: string;
  isSubmitting?: boolean;
  onSubmit: (values: StudentFormValues) => Promise<void>;
  onCancel?: () => void;
  formId?: string;
  showActions?: boolean;
}

function mapStudentToFormValues(student?: StudentDetail): Partial<StudentFormValues> {
  if (!student) {
    return {
      status: 'ACTIVE',
      parents: [
        {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          relationship: 'FATHER',
          isPrimary: true,
        },
      ],
    };
  }

  return {
    studentNumber: student.studentNumber,
    firstName: student.firstName,
    lastName: student.lastName,
    dateOfBirth: student.dateOfBirth?.slice(0, 10) ?? '',
    gender: student.gender ?? undefined,
    email: student.email ?? '',
    phone: student.phone ?? '',
    address: student.address ?? '',
    enrollmentDate: student.enrollmentDate?.slice(0, 10) ?? '',
    status: student.status,
    classroomId: student.classroom?.id ?? '',
    parents:
      student.parents.length > 0
        ? student.parents.map((parent: StudentDetail['parents'][number]) => ({
            firstName: parent.firstName,
            lastName: parent.lastName,
            email: parent.email ?? '',
            phone: parent.phone ?? '',
            relationship: parent.relationship,
            isPrimary: parent.isPrimary,
          }))
        : undefined,
  };
}

export function StudentForm({
  defaultValues,
  submitLabel,
  isSubmitting,
  onSubmit,
  onCancel,
  formId,
  showActions = true,
}: StudentFormProps) {
  const { t } = useI18n();
  const classroomsQuery = useClassroomsQuery();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      ...mapStudentToFormValues(),
      ...defaultValues,
    },
  });

  const gender = watch('gender');
  const status = watch('status');
  const classroomId = watch('classroomId');
  const parentRelationship = watch('parents.0.relationship');

  return (
    <form id={formId} className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <StudentFormSection
        icon={User}
        title={t('students.personalTitle')}
        description={t('students.personalDesc')}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <StudentFormField
            label={t('students.studentNumber')}
            htmlFor="studentNumber"
            helper={t('students.studentNumberHelper')}
            error={errors.studentNumber?.message}
          >
            <Input
              id="studentNumber"
              className={studentFormControlClassName}
              placeholder="GW-2026-001"
              {...register('studentNumber')}
            />
          </StudentFormField>

          <StudentFormField label={t('students.status')} htmlFor="status">
            <Select
              value={status}
              onValueChange={(value) => setValue('status', value as StudentFormValues['status'])}
            >
              <SelectTrigger id="status" className={studentFormSelectTriggerClassName}>
                <SelectValue placeholder={t('common.select')} />
              </SelectTrigger>
              <SelectContent>
                {STUDENT_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(option.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </StudentFormField>

          <StudentFormField
            label={t('students.firstName')}
            htmlFor="firstName"
            error={errors.firstName?.message}
          >
            <Input id="firstName" className={studentFormControlClassName} {...register('firstName')} />
          </StudentFormField>

          <StudentFormField label={t('students.lastName')} htmlFor="lastName" error={errors.lastName?.message}>
            <Input id="lastName" className={studentFormControlClassName} {...register('lastName')} />
          </StudentFormField>

          <StudentFormField label={t('students.dateOfBirth')} htmlFor="dateOfBirth">
            <Input
              id="dateOfBirth"
              type="date"
              className={studentFormControlClassName}
              {...register('dateOfBirth')}
            />
          </StudentFormField>

          <StudentFormField label={t('students.gender')} htmlFor="gender">
            <Select
              value={gender ?? ''}
              onValueChange={(value) =>
                setValue('gender', value as StudentFormValues['gender'], { shouldValidate: true })
              }
            >
              <SelectTrigger id="gender" className={studentFormSelectTriggerClassName}>
                <SelectValue placeholder={t('common.select')} />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(option.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </StudentFormField>

          <StudentFormField
            label={t('students.email')}
            htmlFor="email"
            helper={t('students.emailHelper')}
            error={errors.email?.message}
          >
            <Input
              id="email"
              type="email"
              className={studentFormControlClassName}
              placeholder="eleve@ecole.edu"
              {...register('email')}
            />
          </StudentFormField>

          <StudentFormField label={t('students.phone')} htmlFor="phone" helper={t('students.phoneOptional')}>
            <Input
              id="phone"
              className={studentFormControlClassName}
              placeholder="+216 ..."
              {...register('phone')}
            />
          </StudentFormField>

          <StudentFormField label={t('students.address')} htmlFor="address" className="sm:col-span-2">
            <Textarea
              id="address"
              rows={2}
              className="min-h-[5rem] w-full resize-none transition-colors duration-150"
              placeholder={t('students.addressPlaceholder')}
              {...register('address')}
            />
          </StudentFormField>
        </div>
      </StudentFormSection>

      <StudentFormSection
        icon={GraduationCap}
        title={t('students.schoolTitle')}
        description={t('students.schoolDesc')}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <StudentFormField label={t('students.classroom')} htmlFor="classroomId">
            <Select
              value={classroomId ?? ''}
              onValueChange={(value) => setValue('classroomId', value)}
            >
              <SelectTrigger id="classroomId" className={studentFormSelectTriggerClassName}>
                <SelectValue placeholder={t('students.selectClassroom')} />
              </SelectTrigger>
              <SelectContent>
                {(classroomsQuery.data?.data ?? []).map((classroom) => (
                  <SelectItem key={classroom.id} value={classroom.id}>
                    {classroom.name} · {classroom.academicYear}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </StudentFormField>

          <StudentFormField
            label={t('students.enrollmentDate')}
            htmlFor="enrollmentDate"
            helper={t('students.enrollmentHelper')}
          >
            <Input
              id="enrollmentDate"
              type="date"
              className={studentFormControlClassName}
              {...register('enrollmentDate')}
            />
          </StudentFormField>
        </div>
      </StudentFormSection>

      <StudentFormSection
        icon={Users}
        title={t('students.parentsTitle')}
        description={t('students.parentsDesc')}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <StudentFormField label={t('students.firstName')} htmlFor="parentFirstName">
            <Input
              id="parentFirstName"
              className={studentFormControlClassName}
              {...register('parents.0.firstName')}
            />
          </StudentFormField>

          <StudentFormField label={t('students.lastName')} htmlFor="parentLastName">
            <Input
              id="parentLastName"
              className={studentFormControlClassName}
              {...register('parents.0.lastName')}
            />
          </StudentFormField>

          <StudentFormField label={t('students.relationship')} htmlFor="parentRelationship" className="sm:col-span-2">
            <Select
              value={parentRelationship ?? 'FATHER'}
              onValueChange={(value) =>
                setValue('parents.0.relationship', value as ParentRelationship)
              }
            >
              <SelectTrigger id="parentRelationship" className={studentFormSelectTriggerClassName}>
                <SelectValue placeholder={t('common.select')} />
              </SelectTrigger>
              <SelectContent>
                {PARENT_RELATIONSHIP_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(option.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </StudentFormField>
        </div>
      </StudentFormSection>

      <StudentFormSection
        icon={Phone}
        title={t('students.emergencyTitle')}
        description={t('students.emergencyDesc')}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <StudentFormField
            label={t('students.contactEmail')}
            htmlFor="parentEmail"
            helper={t('students.contactEmailHelper')}
          >
            <Input
              id="parentEmail"
              type="email"
              className={studentFormControlClassName}
              placeholder="parent@email.tn"
              {...register('parents.0.email')}
            />
          </StudentFormField>

          <StudentFormField
            label={t('students.contactPhone')}
            htmlFor="parentPhone"
            helper={t('students.contactPhoneHelper')}
          >
            <Input
              id="parentPhone"
              className={studentFormControlClassName}
              placeholder="+216 ..."
              {...register('parents.0.phone')}
            />
          </StudentFormField>
        </div>
      </StudentFormSection>

      {showActions ? (
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          {onCancel ? (
            <Button
              type="button"
              variant="outline"
              className="h-10 transition-all duration-150 active:scale-[0.98]"
              onClick={onCancel}
            >
              {t('common.cancel')}
            </Button>
          ) : null}
          <Button
            type="submit"
            className="h-10 transition-all duration-150 active:scale-[0.98]"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('students.saving') : submitLabel}
          </Button>
        </div>
      ) : null}
    </form>
  );
}
