'use client';

import type { StudentStatus } from '@edumanager/types';
import { Badge } from '@edumanager/ui';

import { STUDENT_STATUS_KEYS } from '@/lib/students/constants';
import { useI18n } from '@/providers/locale-provider';

const STATUS_VARIANTS: Record<
  StudentStatus,
  'success' | 'secondary' | 'warning' | 'outline' | 'danger'
> = {
  ACTIVE: 'success',
  INACTIVE: 'secondary',
  GRADUATED: 'outline',
  TRANSFERRED: 'warning',
  WITHDRAWN: 'danger',
};

export function StudentStatusBadge({ status }: { status: StudentStatus }) {
  const { t } = useI18n();

  return (
    <Badge variant={STATUS_VARIANTS[status]} size="default" className="min-w-0">
      {t(STUDENT_STATUS_KEYS[status])}
    </Badge>
  );
}
