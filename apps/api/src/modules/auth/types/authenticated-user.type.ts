import type { AppRole } from '../../../common/enums/app-role.enum';

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string | null;
  role: AppRole;
  roleId: string;
  userRoleId: string;
  school: {
    id: string;
    name: string;
    slug: string;
    plan: string;
    status: string;
  };
}

export interface AuthMembershipOption {
  userRoleId: string;
  schoolId: string;
  schoolName: string;
  schoolSlug: string;
  role: AppRole;
  roleId: string;
  roleName: string;
}
