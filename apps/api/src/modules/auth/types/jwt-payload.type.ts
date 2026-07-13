import type { AppRole } from '../../../common/enums/app-role.enum';

export interface AccessJwtPayload {
  sub: string;
  userId: string;
  schoolId: string;
  role: AppRole;
  roleId: string;
  userRoleId: string;
  sessionId: string;
  purpose: 'access';
}

export interface LoginSelectionJwtPayload {
  sub: string;
  userId: string;
  allowedUserRoleIds: string[];
  purpose: 'membership_selection';
}
