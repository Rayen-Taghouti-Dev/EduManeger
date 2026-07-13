'use client';

import { useMemo, useState } from 'react';
import type { StudentListItem, StudentQuery } from '@edumanager/types';

import { CreateStudentDialog } from '@/components/students/create-student-dialog';
import { DeleteStudentDialog } from '@/components/students/delete-student-dialog';
import { EditStudentDialog } from '@/components/students/edit-student-dialog';
import { StudentsTable } from '@/components/students/students-table';
import { StudentsToolbar } from '@/components/students/students-toolbar';
import { useStudentQuery, useStudentsQuery } from '@/lib/students/queries';
import {
  Alert,
  AlertDescription,
  Button,
  EmptyState,
  Pagination,
  Skeleton,
} from '@edumanager/ui';

const DEFAULT_QUERY: StudentQuery = {
  page: 1,
  pageSize: 10,
  sortBy: 'name',
  sortOrder: 'asc',
};

export function StudentsPageContent() {
  const [query, setQuery] = useState<StudentQuery>(DEFAULT_QUERY);
  const [createOpen, setCreateOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<StudentListItem | null>(null);
  const [deleteStudent, setDeleteStudent] = useState<StudentListItem | null>(null);

  const studentsQuery = useStudentsQuery(query);
  const editStudentDetailQuery = useStudentQuery(editStudent?.id ?? '', Boolean(editStudent));

  const summary = useMemo(() => {
    if (!studentsQuery.data) {
      return null;
    }

    return `${studentsQuery.data.total} élève${studentsQuery.data.total > 1 ? 's' : ''}`;
  }, [studentsQuery.data]);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <StudentsToolbar
        query={query}
        onQueryChange={setQuery}
        onCreateClick={() => setCreateOpen(true)}
      />

      {studentsQuery.isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>
      ) : studentsQuery.isError ? (
        <Alert variant="danger">
          <AlertDescription>
            {studentsQuery.error instanceof Error
              ? studentsQuery.error.message
              : 'Impossible de charger les élèves.'}
          </AlertDescription>
        </Alert>
      ) : studentsQuery.data && studentsQuery.data.data.length === 0 ? (
        <EmptyState
          title="Aucun élève trouvé"
          description="Ajustez vos filtres ou ajoutez le premier élève de l'établissement."
          action={
            <Button onClick={() => setCreateOpen(true)}>Ajouter le premier élève</Button>
          }
        />
      ) : (
        <>
          {summary ? (
            <p className="text-muted-foreground px-1 text-sm">{summary}</p>
          ) : null}
          <StudentsTable
            students={studentsQuery.data?.data ?? []}
            onEdit={setEditStudent}
            onDelete={setDeleteStudent}
          />
          {studentsQuery.data && studentsQuery.data.totalPages > 1 ? (
            <Pagination
              currentPage={studentsQuery.data.page}
              totalPages={studentsQuery.data.totalPages}
              onPageChange={(page) => setQuery((current: StudentQuery) => ({ ...current, page }))}
            />
          ) : null}
        </>
      )}

      <CreateStudentDialog open={createOpen} onOpenChange={setCreateOpen} />

      {editStudent && editStudentDetailQuery.data ? (
        <EditStudentDialog
          student={editStudentDetailQuery.data}
          open={Boolean(editStudent)}
          onOpenChange={(open) => {
            if (!open) {
              setEditStudent(null);
            }
          }}
        />
      ) : null}

      <DeleteStudentDialog
        student={deleteStudent}
        open={Boolean(deleteStudent)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteStudent(null);
          }
        }}
      />
    </div>
  );
}
