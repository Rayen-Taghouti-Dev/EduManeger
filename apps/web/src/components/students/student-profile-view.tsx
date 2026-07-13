'use client';

import type { StudentDetail } from '@edumanager/types';
import {
  ArrowLeft,
  Calendar,
  Clock3,
  GraduationCap,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash2,
  User,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { DeleteStudentDialog } from '@/components/students/delete-student-dialog';
import { EditStudentDialog } from '@/components/students/edit-student-dialog';
import {
  StudentInfoRow,
  StudentSectionCard,
} from '@/components/students/student-profile-sections';
import { StudentStatusBadge } from '@/components/students/student-status-badge';
import {
  GENDER_LABELS,
  PARENT_RELATIONSHIP_LABELS,
  canManageStudents,
  formatDate,
  getInitials,
} from '@/lib/students/constants';
import { useAuth } from '@/providers/auth-provider';
import {
  Alert,
  AlertDescription,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Loader,
  Separator,
} from '@edumanager/ui';

interface StudentProfileViewProps {
  student?: StudentDetail;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export function StudentProfileView({
  student,
  isLoading,
  isError,
  errorMessage,
}: StudentProfileViewProps) {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const canManage = canManageStudents(currentUser?.role);

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-6xl items-center justify-center">
        <Loader label="Chargement du profil élève..." />
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-4">
        <Button asChild variant="outline">
          <Link href="/students">
            <ArrowLeft className="h-4 w-4" />
            Retour aux élèves
          </Link>
        </Button>
        <Alert variant="danger">
          <AlertDescription>{errorMessage ?? 'Élève introuvable.'}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="widget-card overflow-hidden">
        <div className="gradient-mesh border-border border-b px-4 py-6 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Avatar className="h-20 w-20 ring-4 ring-background shadow-md">
                <AvatarFallback className="bg-primary-light text-primary text-2xl font-semibold">
                  {getInitials(student.firstName, student.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/students">
                    <ArrowLeft className="h-4 w-4" />
                    Retour aux élèves
                  </Link>
                </Button>
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {student.fullName}
                  </h1>
                  <p className="text-muted-foreground mt-1 font-mono text-sm">
                    {student.studentNumber}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <StudentStatusBadge status={student.status} />
                  {student.classroom ? (
                    <Badge variant="secondary" size="default">
                      {student.classroom.name}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>

            {canManage ? (
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => setEditOpen(true)}>
                  <Pencil className="h-4 w-4" />
                  Modifier
                </Button>
                <Button variant="danger" onClick={() => setDeleteOpen(true)}>
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 px-4 py-5 sm:grid-cols-3 sm:px-6">
          <div className="bg-background-subtle/70 rounded-lg px-4 py-3">
            <p className="text-muted-foreground text-xs uppercase tracking-wide">Classe</p>
            <p className="mt-1 text-sm font-semibold">{student.classroom?.name ?? 'Non assigné'}</p>
          </div>
          <div className="bg-background-subtle/70 rounded-lg px-4 py-3">
            <p className="text-muted-foreground text-xs uppercase tracking-wide">Inscription</p>
            <p className="mt-1 text-sm font-semibold">{formatDate(student.enrollmentDate)}</p>
          </div>
          <div className="bg-background-subtle/70 rounded-lg px-4 py-3">
            <p className="text-muted-foreground text-xs uppercase tracking-wide">Parents</p>
            <p className="mt-1 text-sm font-semibold">{student.parents.length}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <StudentSectionCard
          title="Informations personnelles"
          description="Identité et coordonnées de l'élève."
          icon={User}
        >
          <StudentInfoRow
            label="Genre"
            value={student.gender ? GENDER_LABELS[student.gender] : '—'}
          />
          <StudentInfoRow label="Date de naissance" value={formatDate(student.dateOfBirth)} />
          <StudentInfoRow
            label="E-mail"
            value={
              student.email ? (
                <span className="inline-flex items-center gap-2">
                  <Mail className="text-muted-foreground h-4 w-4" />
                  {student.email}
                </span>
              ) : (
                '—'
              )
            }
          />
          <StudentInfoRow
            label="Téléphone"
            value={
              student.phone ? (
                <span className="inline-flex items-center gap-2">
                  <Phone className="text-muted-foreground h-4 w-4" />
                  {student.phone}
                </span>
              ) : (
                '—'
              )
            }
          />
          <StudentInfoRow
            label="Adresse"
            value={
              student.address ? (
                <span className="inline-flex items-start gap-2 sm:max-w-[16rem] sm:text-right">
                  <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                  {student.address}
                </span>
              ) : (
                '—'
              )
            }
          />
        </StudentSectionCard>

        <StudentSectionCard
          title="Scolarité"
          description="Affectation et parcours académique."
          icon={GraduationCap}
        >
          <StudentInfoRow label="Classe" value={student.classroom?.name ?? '—'} />
          <StudentInfoRow label="Niveau" value={student.classroom?.gradeLevel ?? '—'} />
          <StudentInfoRow label="Année scolaire" value={student.classroom?.academicYear ?? '—'} />
          <StudentInfoRow
            label="Date d'inscription"
            value={
              <span className="inline-flex items-center gap-2">
                <Calendar className="text-muted-foreground h-4 w-4" />
                {formatDate(student.enrollmentDate)}
              </span>
            }
          />
          <StudentInfoRow label="Statut" value={<StudentStatusBadge status={student.status} />} />
        </StudentSectionCard>
      </div>

      <StudentSectionCard
        title="Parents / tuteurs"
        description="Contacts familiaux associés à l'élève."
        icon={Users}
      >
        {student.parents.length === 0 ? (
          <p className="text-muted-foreground py-4 text-sm">Aucun parent enregistré.</p>
        ) : (
          <div className="grid gap-4 py-2 lg:grid-cols-2">
            {student.parents.map((parent) => (
              <div key={parent.id} className="bg-background-subtle/50 rounded-lg border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{parent.fullName}</p>
                    <p className="text-muted-foreground text-sm">
                      {PARENT_RELATIONSHIP_LABELS[parent.relationship]}
                    </p>
                  </div>
                  {parent.isPrimary ? <Badge variant="outline">Principal</Badge> : null}
                </div>
                <Separator className="my-3" />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="text-muted-foreground h-4 w-4" />
                    {parent.email ?? '—'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="text-muted-foreground h-4 w-4" />
                    {parent.phone ?? '—'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </StudentSectionCard>

      <StudentSectionCard
        title="Audit"
        description="Historique de création et de modification."
        icon={Clock3}
      >
        <div className="grid gap-4 py-2 sm:grid-cols-2">
          <div className="bg-background-subtle/50 rounded-lg border p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide">Créé</p>
            <p className="mt-2 text-sm font-semibold">{formatDate(student.audit.createdAt)}</p>
            <p className="text-muted-foreground mt-1 text-sm">
              {student.audit.createdBy?.fullName ?? 'Utilisateur inconnu'}
            </p>
          </div>
          <div className="bg-background-subtle/50 rounded-lg border p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide">Dernière modification</p>
            <p className="mt-2 text-sm font-semibold">{formatDate(student.audit.updatedAt)}</p>
            <p className="text-muted-foreground mt-1 text-sm">
              {student.audit.updatedBy?.fullName ?? 'Utilisateur inconnu'}
            </p>
          </div>
        </div>
      </StudentSectionCard>

      <EditStudentDialog student={student} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteStudentDialog
        student={student}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDeleted={() => router.replace('/students')}
      />
    </div>
  );
}
