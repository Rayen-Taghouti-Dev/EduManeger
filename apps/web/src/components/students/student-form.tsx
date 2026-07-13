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
        title="Informations personnelles"
        description="Identité, coordonnées et statut administratif de l'élève."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <StudentFormField
            label="Numéro d'élève"
            htmlFor="studentNumber"
            helper="Identifiant unique au sein de l'établissement."
            error={errors.studentNumber?.message}
          >
            <Input
              id="studentNumber"
              className={studentFormControlClassName}
              placeholder="GW-2026-001"
              {...register('studentNumber')}
            />
          </StudentFormField>

          <StudentFormField label="Statut" htmlFor="status">
            <Select
              value={status}
              onValueChange={(value) => setValue('status', value as StudentFormValues['status'])}
            >
              <SelectTrigger id="status" className={studentFormSelectTriggerClassName}>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                {STUDENT_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </StudentFormField>

          <StudentFormField
            label="Prénom"
            htmlFor="firstName"
            error={errors.firstName?.message}
          >
            <Input id="firstName" className={studentFormControlClassName} {...register('firstName')} />
          </StudentFormField>

          <StudentFormField label="Nom" htmlFor="lastName" error={errors.lastName?.message}>
            <Input id="lastName" className={studentFormControlClassName} {...register('lastName')} />
          </StudentFormField>

          <StudentFormField label="Date de naissance" htmlFor="dateOfBirth">
            <Input
              id="dateOfBirth"
              type="date"
              className={studentFormControlClassName}
              {...register('dateOfBirth')}
            />
          </StudentFormField>

          <StudentFormField label="Genre" htmlFor="gender">
            <Select
              value={gender ?? ''}
              onValueChange={(value) =>
                setValue('gender', value as StudentFormValues['gender'], { shouldValidate: true })
              }
            >
              <SelectTrigger id="gender" className={studentFormSelectTriggerClassName}>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </StudentFormField>

          <StudentFormField
            label="E-mail"
            htmlFor="email"
            helper="Optionnel — adresse de l'élève."
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

          <StudentFormField label="Téléphone" htmlFor="phone" helper="Optionnel.">
            <Input
              id="phone"
              className={studentFormControlClassName}
              placeholder="+216 ..."
              {...register('phone')}
            />
          </StudentFormField>

          <StudentFormField label="Adresse" htmlFor="address" className="sm:col-span-2">
            <Textarea
              id="address"
              rows={2}
              className="min-h-[5rem] w-full resize-none transition-colors duration-150"
              placeholder="Adresse complète"
              {...register('address')}
            />
          </StudentFormField>
        </div>
      </StudentFormSection>

      <StudentFormSection
        icon={GraduationCap}
        title="Informations scolaires"
        description="Affectation de classe et date d'inscription."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <StudentFormField label="Classe" htmlFor="classroomId">
            <Select
              value={classroomId ?? ''}
              onValueChange={(value) => setValue('classroomId', value)}
            >
              <SelectTrigger id="classroomId" className={studentFormSelectTriggerClassName}>
                <SelectValue placeholder="Sélectionner une classe" />
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
            label="Date d'inscription"
            htmlFor="enrollmentDate"
            helper="Date d'entrée dans l'établissement."
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
        title="Parents / tuteurs"
        description="Responsable légal ou tuteur principal de l'élève."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <StudentFormField label="Prénom" htmlFor="parentFirstName">
            <Input
              id="parentFirstName"
              className={studentFormControlClassName}
              {...register('parents.0.firstName')}
            />
          </StudentFormField>

          <StudentFormField label="Nom" htmlFor="parentLastName">
            <Input
              id="parentLastName"
              className={studentFormControlClassName}
              {...register('parents.0.lastName')}
            />
          </StudentFormField>

          <StudentFormField label="Lien de parenté" htmlFor="parentRelationship" className="sm:col-span-2">
            <Select
              value={parentRelationship ?? 'FATHER'}
              onValueChange={(value) =>
                setValue('parents.0.relationship', value as ParentRelationship)
              }
            >
              <SelectTrigger id="parentRelationship" className={studentFormSelectTriggerClassName}>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                {PARENT_RELATIONSHIP_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </StudentFormField>
        </div>
      </StudentFormSection>

      <StudentFormSection
        icon={Phone}
        title="Contact d'urgence"
        description="Coordonnées à contacter en cas d'urgence."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <StudentFormField
            label="E-mail du contact"
            htmlFor="parentEmail"
            helper="Utilisé pour les notifications importantes."
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
            label="Téléphone du contact"
            htmlFor="parentPhone"
            helper="Joignable en priorité en cas d'urgence."
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
              Annuler
            </Button>
          ) : null}
          <Button
            type="submit"
            className="h-10 transition-all duration-150 active:scale-[0.98]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enregistrement...' : submitLabel}
          </Button>
        </div>
      ) : null}
    </form>
  );
}
