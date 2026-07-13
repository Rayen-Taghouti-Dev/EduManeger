import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { StudentFormValues, StudentQuery } from '@edumanager/types';

import {
  createStudent,
  deleteStudent,
  getStudent,
  listClassrooms,
  listStudents,
  updateStudent,
} from './students-api';

export const studentKeys = {
  all: ['students'] as const,
  lists: () => [...studentKeys.all, 'list'] as const,
  list: (query: StudentQuery) => [...studentKeys.lists(), query] as const,
  details: () => [...studentKeys.all, 'detail'] as const,
  detail: (id: string) => [...studentKeys.details(), id] as const,
  classrooms: () => [...studentKeys.all, 'classrooms'] as const,
};

export function useStudentsQuery(query: StudentQuery) {
  return useQuery({
    queryKey: studentKeys.list(query),
    queryFn: () => listStudents(query),
  });
}

export function useStudentQuery(id: string, enabled = true) {
  return useQuery({
    queryKey: studentKeys.detail(id),
    queryFn: () => getStudent(id),
    enabled: Boolean(id) && enabled,
  });
}

export function useClassroomsQuery() {
  return useQuery({
    queryKey: studentKeys.classrooms(),
    queryFn: () => listClassrooms(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateStudentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StudentFormValues) => createStudent(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
    },
  });
}

export function useUpdateStudentMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<StudentFormValues>) => updateStudent(id, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(studentKeys.detail(id), data);
      void queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
    },
  });
}

export function useDeleteStudentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteStudent(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
    },
  });
}
