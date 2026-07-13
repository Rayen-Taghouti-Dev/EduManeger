export interface AuthMembershipOption {
  userRoleId: string;
  schoolId: string;
  schoolName: string;
  schoolSlug: string;
  role: 'SUPER_ADMIN' | 'SCHOOL_ADMIN' | 'TEACHER' | 'ACCOUNTANT' | 'PARENT' | 'STUDENT';
  roleId: string;
  roleName: string;
}

export interface CurrentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string | null;
  role: AuthMembershipOption['role'];
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

export type LoginResponse =
  | {
      requiresSelection: true;
      loginToken: string;
      memberships: AuthMembershipOption[];
    }
  | {
      requiresSelection: false;
      accessToken: string;
      refreshToken: string;
      user: CurrentUser;
    };

export interface AuthSuccessResponse {
  accessToken: string;
  refreshToken: string;
  user: CurrentUser;
}
