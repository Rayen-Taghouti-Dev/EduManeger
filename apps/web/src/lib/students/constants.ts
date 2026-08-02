import type { Gender, ParentRelationship, StudentStatus } from '@edumanager/types';

import type { MessageKey } from '@/i18n';

export const STUDENT_STATUS_KEYS: Record<StudentStatus, MessageKey> = {
  ACTIVE: 'students.statusActive',
  INACTIVE: 'students.statusInactive',
  GRADUATED: 'students.statusGraduated',
  TRANSFERRED: 'students.statusTransferred',
  WITHDRAWN: 'students.statusWithdrawn',
};

export const GENDER_KEYS: Record<Gender, MessageKey> = {
  MALE: 'students.genderMale',
  FEMALE: 'students.genderFemale',
  OTHER: 'students.genderOther',
  PREFER_NOT_TO_SAY: 'students.genderUnspecified',
};

export const PARENT_RELATIONSHIP_KEYS: Record<ParentRelationship, MessageKey> = {
  FATHER: 'students.relFather',
  MOTHER: 'students.relMother',
  GUARDIAN: 'students.relGuardian',
  OTHER: 'students.relOther',
};

export const STUDENT_STATUS_OPTIONS = (Object.keys(STUDENT_STATUS_KEYS) as StudentStatus[]).map(
  (value) => ({ value, labelKey: STUDENT_STATUS_KEYS[value] }),
);

export const GENDER_OPTIONS = (Object.keys(GENDER_KEYS) as Gender[]).map((value) => ({
  value,
  labelKey: GENDER_KEYS[value],
}));

export const PARENT_RELATIONSHIP_OPTIONS = (
  Object.keys(PARENT_RELATIONSHIP_KEYS) as ParentRelationship[]
).map((value) => ({
  value,
  labelKey: PARENT_RELATIONSHIP_KEYS[value],
}));

/** @deprecated Prefer formatDate with locale from useI18n */
export function formatDate(value: string | null | undefined, locale = 'fr-FR') {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function canManageStudents(role: string | undefined) {
  return role === 'SUPER_ADMIN' || role === 'SCHOOL_ADMIN';
}
