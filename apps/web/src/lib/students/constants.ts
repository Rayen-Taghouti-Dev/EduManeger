import type { Gender, ParentRelationship, StudentStatus } from '@edumanager/types';

export const STUDENT_STATUS_LABELS: Record<StudentStatus, string> = {
  ACTIVE: 'Actif',
  INACTIVE: 'Inactif',
  GRADUATED: 'Diplômé',
  TRANSFERRED: 'Transféré',
  WITHDRAWN: 'Retiré',
};

export const GENDER_LABELS: Record<Gender, string> = {
  MALE: 'Masculin',
  FEMALE: 'Féminin',
  OTHER: 'Autre',
  PREFER_NOT_TO_SAY: 'Non précisé',
};

export const PARENT_RELATIONSHIP_LABELS: Record<ParentRelationship, string> = {
  FATHER: 'Père',
  MOTHER: 'Mère',
  GUARDIAN: 'Tuteur',
  OTHER: 'Autre',
};

export const STUDENT_STATUS_OPTIONS = Object.entries(STUDENT_STATUS_LABELS).map(([value, label]) => ({
  value: value as StudentStatus,
  label,
}));

export const GENDER_OPTIONS = Object.entries(GENDER_LABELS).map(([value, label]) => ({
  value: value as Gender,
  label,
}));

export const PARENT_RELATIONSHIP_OPTIONS = Object.entries(PARENT_RELATIONSHIP_LABELS).map(
  ([value, label]) => ({
    value: value as ParentRelationship,
    label,
  }),
);

export function formatDate(value: string | null | undefined) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat('fr-FR', {
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
