'use client';

import { useParams } from 'next/navigation';

import { StudentProfileView } from '@/components/students/student-profile-view';
import { useStudentQuery } from '@/lib/students/queries';

export default function StudentDetailPage() {
  const params = useParams<{ id: string }>();
  const studentQuery = useStudentQuery(params.id);

  return (
    <StudentProfileView
      student={studentQuery.data}
      isLoading={studentQuery.isLoading}
      isError={studentQuery.isError}
      errorMessage={
        studentQuery.error instanceof Error ? studentQuery.error.message : undefined
      }
    />
  );
}
