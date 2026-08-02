'use client';

import type { StudentListItem } from '@edumanager/types';
import { AlertTriangle } from 'lucide-react';

import { useDeleteStudentMutation } from '@/lib/students/queries';
import { useI18n } from '@/providers/locale-provider';
import { useToast } from '@/providers/toast-provider';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@edumanager/ui';

interface DeleteStudentDialogProps {
  student: StudentListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted?: () => void;
}

export function DeleteStudentDialog({
  student,
  open,
  onOpenChange,
  onDeleted,
}: DeleteStudentDialogProps) {
  const toast = useToast();
  const { t } = useI18n();
  const deleteMutation = useDeleteStudentMutation();

  const handleDelete = async () => {
    if (!student) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(student.id);
      toast.success(t('students.deleteSuccess'));
      onOpenChange(false);
      onDeleted?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('students.deleteError'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md gap-0 overflow-hidden p-0"
        aria-describedby="delete-student-description"
      >
        <DialogHeader className="border-border border-b px-6 py-5 text-left">
          <div className="flex items-start gap-3">
            <div className="bg-danger-light text-danger flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="space-y-1.5">
              <DialogTitle>{t('students.deleteTitle')}</DialogTitle>
              <DialogDescription id="delete-student-description">
                {t('students.deleteDescription', { name: student?.fullName ?? '' })}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="px-6 py-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t('common.cancel')}
          </Button>
          <Button
            type="button"
            variant="danger"
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            {deleteMutation.isPending ? t('common.loading') : t('students.deleteConfirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
