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
import { useI18n } from '@/providers/locale-provider';
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
  const { t } = useI18n();
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{t('students.title')}</h1>
          <p className="text-muted-foreground text-sm">{t('students.subtitle')}</p>
        </div>
        {canManage ? (
          <Button className="h-10 w-full shrink-0 sm:w-auto" onClick={onCreateClick}>
            <Plus className="h-4 w-4" />
            {t('students.add')}
          </Button>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_180px_160px_160px_auto]">
        <div className="relative sm:col-span-2 xl:col-span-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            className="h-10 pl-9"
            placeholder={t('students.searchPlaceholder')}
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
          <SelectTrigger className="h-10 w-full">
            <SelectValue placeholder={t('students.classroom')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('students.allClassrooms')}</SelectItem>
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
          <SelectTrigger className="h-10 w-full">
            <SelectValue placeholder={t('students.status')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('students.allStatuses')}</SelectItem>
            {STUDENT_STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {t(option.labelKey)}
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
          <SelectTrigger className="h-10 w-full">
            <SelectValue placeholder={t('students.gender')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('students.allGenders')}</SelectItem>
            {GENDER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {t(option.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2 sm:col-span-2 xl:col-span-1 xl:justify-end">
          <Button
            variant={query.sortBy === 'name' ? 'default' : 'outline'}
            className="h-10"
            onClick={() => toggleSort('name')}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t('students.sortName')}
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
            className="h-10"
            onClick={() => toggleSort('studentNumber')}
          >
            {t('students.sortNumber')}
          </Button>
          <Button
            variant={query.sortBy === 'enrollmentDate' ? 'default' : 'outline'}
            className="h-10"
            onClick={() => toggleSort('enrollmentDate')}
          >
            {t('students.sortEnrollment')}
          </Button>
        </div>
      </div>
    </div>
  );
}
