'use client';

import { CreditCard, GraduationCap, School, UserPlus } from 'lucide-react';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@edumanager/ui';

const actions = [
  { label: 'Ajouter un élève', icon: GraduationCap, variant: 'default' as const },
  { label: 'Ajouter un enseignant', icon: UserPlus, variant: 'outline' as const },
  { label: 'Créer une classe', icon: School, variant: 'outline' as const },
  { label: 'Enregistrer un paiement', icon: CreditCard, variant: 'outline' as const },
];

export function QuickActions() {
  return (
    <Card className="card-hover flex h-full flex-col">
      <CardHeader className="shrink-0 pb-0">
        <CardTitle className="text-sm font-semibold leading-none">Actions rapides</CardTitle>
        <CardDescription className="text-xs">Tâches courantes</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        <div className="flex flex-col gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                variant={action.variant}
                className="h-10 w-full min-w-0 items-center justify-start gap-3 px-3"
                disabled
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate text-left text-sm leading-none">
                  {action.label}
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
