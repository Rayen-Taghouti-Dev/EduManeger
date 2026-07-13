import type { StudentStatus } from '@edumanager/types';
import { Badge } from '@edumanager/ui';

import { STUDENT_STATUS_LABELS } from '@/lib/students/constants';

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
  return (
    <Badge variant={STATUS_VARIANTS[status]} size="default" className="min-w-[5.5rem]">
      {STUDENT_STATUS_LABELS[status]}
    </Badge>
  );
}
