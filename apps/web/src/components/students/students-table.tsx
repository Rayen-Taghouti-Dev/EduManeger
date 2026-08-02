'use client';

import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import type { StudentListItem } from '@edumanager/types';

import { StudentStatusBadge } from '@/components/students/student-status-badge';
import {
  GENDER_KEYS,
  canManageStudents,
  formatDate,
  getInitials,
} from '@/lib/students/constants';
import { useAuth } from '@/providers/auth-provider';
import { useI18n } from '@/providers/locale-provider';
import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn,
} from '@edumanager/ui';

interface StudentsTableProps {
  students: StudentListItem[];
  isLoading?: boolean;
  onEdit: (student: StudentListItem) => void;
  onDelete: (student: StudentListItem) => void;
}

function StudentActions({
  student,
  canManage,
  onEdit,
  onDelete,
}: {
  student: StudentListItem;
  canManage: boolean;
  onEdit: (student: StudentListItem) => void;
  onDelete: (student: StudentListItem) => void;
}) {
  const { t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10"
          aria-label={`${t('common.actions')} ${student.fullName}`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem asChild>
          <Link href={`/students/${student.id}`}>
            <Eye className="h-4 w-4" />
            {t('students.viewProfile')}
          </Link>
        </DropdownMenuItem>
        {canManage ? (
          <>
            <DropdownMenuItem onClick={() => onEdit(student)}>
              <Pencil className="h-4 w-4" />
              {t('students.edit')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-danger focus:text-danger"
              onClick={() => onDelete(student)}
            >
              <Trash2 className="h-4 w-4" />
              {t('students.delete')}
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function StudentsTable({ students, isLoading, onEdit, onDelete }: StudentsTableProps) {
  const { currentUser } = useAuth();
  const { t, dateLocale } = useI18n();
  const canManage = canManageStudents(currentUser?.role);

  if (isLoading) {
    return (
      <div className="widget-card space-y-3 p-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Mobile / tablet card list */}
      <div className="space-y-3 md:hidden">
        {students.map((student) => (
          <article key={student.id} className="widget-card p-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-11 w-11 shrink-0 ring-2 ring-background">
                <AvatarFallback className="text-xs font-semibold">
                  {getInitials(student.firstName, student.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link
                      href={`/students/${student.id}`}
                      className="text-foreground hover:text-primary block truncate font-medium transition-colors"
                    >
                      {student.fullName}
                    </Link>
                    <p className="text-muted-foreground mt-0.5 font-mono text-xs">
                      {student.studentNumber}
                    </p>
                  </div>
                  <StudentActions
                    student={student}
                    canManage={canManage}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <StudentStatusBadge status={student.status} />
                  {student.classroom?.name ? (
                    <span className="text-muted-foreground text-xs">{student.classroom.name}</span>
                  ) : null}
                  <span className="text-muted-foreground text-xs">
                    {formatDate(student.enrollmentDate, dateLocale)}
                  </span>
                </div>
                <p className="text-muted-foreground mt-2 truncate text-xs">
                  {student.email ?? t('students.noEmail')}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop table */}
      <div className="widget-card hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-background-subtle/80 hover:bg-background-subtle/80">
                <TableHead className="w-16">Photo</TableHead>
                <TableHead className="min-w-[7rem]">{t('students.colNumber')}</TableHead>
                <TableHead className="min-w-[12rem]">{t('students.colName')}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('students.gender')}</TableHead>
                <TableHead className="hidden xl:table-cell">{t('students.colClassroom')}</TableHead>
                <TableHead className="min-w-[6.5rem]">{t('students.colStatus')}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('students.colEnrollment')}</TableHead>
                <TableHead className="w-16 text-right">{t('common.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="group h-16">
                  <TableCell className="py-3">
                    <Avatar className="h-10 w-10 ring-2 ring-background">
                      <AvatarFallback className="text-xs font-semibold">
                        {getInitials(student.firstName, student.lastName)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="py-3 font-mono text-sm font-medium">
                    {student.studentNumber}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="min-w-0 max-w-[16rem]">
                      <Link
                        href={`/students/${student.id}`}
                        className="text-foreground hover:text-primary font-medium transition-colors"
                      >
                        {student.fullName}
                      </Link>
                      <p className="text-muted-foreground truncate text-xs">
                        {student.email ?? t('students.noEmail')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden py-3 lg:table-cell">
                    {student.gender ? t(GENDER_KEYS[student.gender]) : '—'}
                  </TableCell>
                  <TableCell className="hidden py-3 xl:table-cell">
                    {student.classroom?.name ?? '—'}
                  </TableCell>
                  <TableCell className="py-3">
                    <StudentStatusBadge status={student.status} />
                  </TableCell>
                  <TableCell className="hidden py-3 text-sm lg:table-cell">
                    {formatDate(student.enrollmentDate, dateLocale)}
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <div className={cn('inline-flex opacity-90 transition-opacity group-hover:opacity-100')}>
                      <StudentActions
                        student={student}
                        canManage={canManage}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
