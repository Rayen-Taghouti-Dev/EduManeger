'use client';

import { useState } from 'react';
import type { StudentDetail, StudentFormValues } from '@edumanager/types';
import { UserPen } from 'lucide-react';

import { StudentDialogShell } from '@/components/students/student-dialog-shell';
import { StudentForm } from '@/components/students/student-form';
import { useUpdateStudentMutation } from '@/lib/students/queries';
import { useI18n } from '@/providers/locale-provider';
import { useToast } from '@/providers/toast-provider';

interface EditStudentDialogProps {
  student: StudentDetail;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FORM_ID = 'edit-student-form';

function sanitizePayload(values: StudentFormValues): StudentFormValues {
  const parent = values.parents?.[0];
  const hasParent =
    parent &&
    (parent.firstName.trim() ||
      parent.lastName.trim() ||
      parent.email?.trim() ||
      parent.phone?.trim());

  return {
    ...values,
    email: values.email?.trim() || undefined,
    phone: values.phone?.trim() || undefined,
    address: values.address?.trim() || undefined,
    classroomId: values.classroomId || undefined,
    dateOfBirth: values.dateOfBirth || undefined,
    enrollmentDate: values.enrollmentDate || undefined,
    parents: hasParent
      ? [
          {
            ...parent,
            email: parent.email?.trim() || undefined,
            phone: parent.phone?.trim() || undefined,
            isPrimary: true,
          },
        ]
      : [],
  };
}

export function EditStudentDialog({ student, open, onOpenChange }: EditStudentDialogProps) {
  const toast = useToast();
  const { t } = useI18n();
  const updateMutation = useUpdateStudentMutation(student.id);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: StudentFormValues) => {
    setErrorMessage(null);

    try {
      await updateMutation.mutateAsync(sanitizePayload(values));
      toast.success(t('students.editSuccess'));
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : t('students.editError');
      setErrorMessage(message);
      toast.error(message);
    }
  };

  return (
    <StudentDialogShell
      open={open}
      onOpenChange={onOpenChange}
      icon={UserPen}
      title={t('students.editTitle')}
      description={t('students.editDescription', { name: student.fullName })}
      descriptionId="edit-student-description"
      formId={FORM_ID}
      submitLabel={t('students.editSubmit')}
      isSubmitting={updateMutation.isPending}
      onCancel={() => onOpenChange(false)}
      errorMessage={errorMessage}
    >
      <StudentForm
        formId={FORM_ID}
        showActions={false}
        defaultValues={{
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
              : [
                  {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    relationship: 'FATHER' as const,
                    isPrimary: true,
                  },
                ],
        }}
        submitLabel={t('students.editSubmit')}
        isSubmitting={updateMutation.isPending}
        onSubmit={handleSubmit}
      />
    </StudentDialogShell>
  );
}
