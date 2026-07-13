'use client';

import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import type { StudentListItem } from '@edumanager/types';

import { StudentStatusBadge } from '@/components/students/student-status-badge';
import {
  GENDER_LABELS,
  canManageStudents,
  formatDate,
  getInitials,
} from '@/lib/students/constants';
import { useAuth } from '@/providers/auth-provider';
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

export function StudentsTable({ students, isLoading, onEdit, onDelete }: StudentsTableProps) {
  const { currentUser } = useAuth();
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
    <div className="widget-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-background-subtle/80 hover:bg-background-subtle/80">
              <TableHead className="w-16">Photo</TableHead>
              <TableHead className="w-32">Numéro</TableHead>
              <TableHead>Nom complet</TableHead>
              <TableHead className="hidden md:table-cell">Genre</TableHead>
              <TableHead className="hidden lg:table-cell">Classe</TableHead>
              <TableHead className="w-36">Statut</TableHead>
              <TableHead className="hidden sm:table-cell">Inscription</TableHead>
              <TableHead className="w-16 text-right">Actions</TableHead>
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
                  <div className="min-w-[10rem]">
                    <Link
                      href={`/students/${student.id}`}
                      className="font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {student.fullName}
                    </Link>
                    <p className="text-muted-foreground truncate text-xs">
                      {student.email ?? 'Aucun e-mail'}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="hidden py-3 md:table-cell">
                  {student.gender ? GENDER_LABELS[student.gender] : '—'}
                </TableCell>
                <TableCell className="hidden py-3 lg:table-cell">
                  {student.classroom?.name ?? '—'}
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center">
                    <StudentStatusBadge status={student.status} />
                  </div>
                </TableCell>
                <TableCell className="hidden py-3 text-sm sm:table-cell">
                  {formatDate(student.enrollmentDate)}
                </TableCell>
                <TableCell className="py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          'h-9 w-9 opacity-80 transition-opacity group-hover:opacity-100',
                        )}
                        aria-label={`Actions pour ${student.fullName}`}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem asChild>
                        <Link href={`/students/${student.id}`}>
                          <Eye className="h-4 w-4" />
                          Voir le profil
                        </Link>
                      </DropdownMenuItem>
                      {canManage ? (
                        <>
                          <DropdownMenuItem onClick={() => onEdit(student)}>
                            <Pencil className="h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-danger focus:text-danger"
                            onClick={() => onDelete(student)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </>
                      ) : null}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
