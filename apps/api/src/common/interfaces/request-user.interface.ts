import type { AppRole } from '../enums/app-role.enum';

export interface RequestUser {
  userId: string;
  sub: string;
  schoolId: string;
  role: AppRole;
  roleId: string;
  userRoleId: string;
  sessionId: string;
}
