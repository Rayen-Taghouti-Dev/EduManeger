'use client';

import { ArrowDownAZ, ArrowUpAZ, Plus, Search, SlidersHorizontal } from 'lucide-react';
import type { StudentQuery, StudentSortField } from '@edumanager/types';

import {
  GENDER_OPTIONS,
  STUDENT_STATUS_OPTIONS,
  canManageStudents,
} from '@/lib/students/constants';
import { useClassroomsQuery } from '@/lib/students/queries';
import { useAuth } from '@/providers/auth-provider';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@edumanager/ui';

interface StudentsToolbarProps {
  query: StudentQuery;
  onQueryChange: (query: StudentQuery) => void;
  onCreateClick: () => void;
}

export function StudentsToolbar({ query, onQueryChange, onCreateClick }: StudentsToolbarProps) {
  const { currentUser } = useAuth();
  const classroomsQuery = useClassroomsQuery();
  const canManage = canManageStudents(currentUser?.role);

  const updateQuery = (patch: Partial<StudentQuery>) => {
    onQueryChange({ ...query, ...patch, page: patch.page ?? 1 });
  };

  const toggleSort = (field: StudentSortField) => {
    if (query.sortBy === field) {
      updateQuery({ sortOrder: query.sortOrder === 'asc' ? 'desc' : 'asc' });
      return;
    }

    updateQuery({ sortBy: field, sortOrder: 'asc' });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Élèves</h1>
          <p className="text-muted-foreground text-sm">
            Gérez les inscriptions, profils et affectations de classe.
          </p>
        </div>
        {canManage ? (
          <Button onClick={onCreateClick}>
            <Plus className="h-4 w-4" />
            Ajouter un élève
          </Button>
        ) : null}
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto] xl:grid-cols-[minmax(0,1fr)_180px_160px_160px_auto]">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            className="pl-9"
            placeholder="Rechercher par numéro, prénom ou nom..."
            value={query.search ?? ''}
            onChange={(event) => updateQuery({ search: event.target.value })}
          />
        </div>

        <Select
          value={query.classroomId ?? 'all'}
          onValueChange={(value) =>
            updateQuery({ classroomId: value === 'all' ? undefined : value })
          }
        >
          <SelectTrigger className="w-full xl:w-[180px]">
            <SelectValue placeholder="Classe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les classes</SelectItem>
            {(classroomsQuery.data?.data ?? []).map((classroom) => (
              <SelectItem key={classroom.id} value={classroom.id}>
                {classroom.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={query.status ?? 'all'}
          onValueChange={(value) =>
            updateQuery({
              status: value === 'all' ? undefined : (value as StudentQuery['status']),
            })
          }
        >
          <SelectTrigger className="w-full xl:w-[160px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {STUDENT_STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={query.gender ?? 'all'}
          onValueChange={(value) =>
            updateQuery({
              gender: value === 'all' ? undefined : (value as StudentQuery['gender']),
            })
          }
        >
          <SelectTrigger className="w-full xl:w-[160px]">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les genres</SelectItem>
            {GENDER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2 lg:col-span-full xl:col-span-1 xl:justify-end">
          <Button
            variant={query.sortBy === 'name' ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleSort('name')}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Nom
            {query.sortBy === 'name' ? (
              query.sortOrder === 'asc' ? (
                <ArrowUpAZ className="h-4 w-4" />
              ) : (
                <ArrowDownAZ className="h-4 w-4" />
              )
            ) : null}
          </Button>
          <Button
            variant={query.sortBy === 'studentNumber' ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleSort('studentNumber')}
          >
            N°
          </Button>
          <Button
            variant={query.sortBy === 'enrollmentDate' ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleSort('enrollmentDate')}
          >
            Inscription
          </Button>
        </div>
      </div>
    </div>
  );
}
