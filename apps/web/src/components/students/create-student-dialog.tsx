'use client';

import { useState } from 'react';
import type { StudentFormValues } from '@edumanager/types';
import { UserPlus } from 'lucide-react';

import { StudentDialogShell } from '@/components/students/student-dialog-shell';
import { StudentForm } from '@/components/students/student-form';
import { useCreateStudentMutation } from '@/lib/students/queries';
import { useToast } from '@/providers/toast-provider';

interface CreateStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FORM_ID = 'create-student-form';

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
      : undefined,
  };
}

export function CreateStudentDialog({ open, onOpenChange }: CreateStudentDialogProps) {
  const toast = useToast();
  const createMutation = useCreateStudentMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: StudentFormValues) => {
    setErrorMessage(null);

    try {
      await createMutation.mutateAsync(sanitizePayload(values));
      toast.success('Élève créé avec succès.');
      onOpenChange(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Création impossible';
      setErrorMessage(message);
      toast.error(message);
    }
  };

  return (
    <StudentDialogShell
      open={open}
      onOpenChange={onOpenChange}
      icon={UserPlus}
      title="Nouvel élève"
      description="Complétez le profil, l'affectation scolaire et les contacts familiaux."
      descriptionId="create-student-description"
      formId={FORM_ID}
      submitLabel="Créer l'élève"
      isSubmitting={createMutation.isPending}
      onCancel={() => onOpenChange(false)}
      errorMessage={errorMessage}
    >
      <StudentForm
        formId={FORM_ID}
        showActions={false}
        submitLabel="Créer l'élève"
        isSubmitting={createMutation.isPending}
        onSubmit={handleSubmit}
      />
    </StudentDialogShell>
  );
}
