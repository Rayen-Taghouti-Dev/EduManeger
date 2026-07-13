import type {
  ClassroomSummary,
  PaginatedStudents,
  StudentDetail,
  StudentFormValues,
  StudentQuery,
} from '@edumanager/types';

import { authFetch } from '@/lib/auth/auth-api';

function buildQueryString(query: StudentQuery = {}) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value));
    }
  });

  const serialized = params.toString();
  return serialized ? `?${serialized}` : '';
}

export function listStudents(query: StudentQuery = {}) {
  return authFetch<PaginatedStudents>(`/students${buildQueryString(query)}`, undefined, {
    auth: true,
  });
}

export function getStudent(id: string) {
  return authFetch<StudentDetail>(`/students/${id}`, undefined, { auth: true });
}

export function createStudent(payload: StudentFormValues) {
  return authFetch<StudentDetail>(
    '/students',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    { auth: true, retryOn401: false },
  );
}

export function updateStudent(id: string, payload: Partial<StudentFormValues>) {
  return authFetch<StudentDetail>(
    `/students/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
    { auth: true, retryOn401: false },
  );
}

export function deleteStudent(id: string) {
  return authFetch<{ success: boolean }>(
    `/students/${id}`,
    { method: 'DELETE' },
    { auth: true, retryOn401: false },
  );
}

export function listClassrooms() {
  return authFetch<{ data: ClassroomSummary[] }>('/students/classrooms', undefined, {
    auth: true,
  });
}
