import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BookOpen,
  CreditCard,
  GraduationCap,
  Shield,
  Users,
  Zap,
} from 'lucide-react';

import { Button, Typography } from '@edumanager/ui';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
}

export function PlaceholderPage({
  title,
  description,
  icon: Icon = BookOpen,
  actionLabel = 'Commencer',
}: PlaceholderPageProps) {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="muted" className="mt-2 max-w-xl">
          {description}
        </Typography>
      </div>

      <div className="widget-card flex flex-col items-center justify-center border-dashed px-6 py-16 text-center sm:px-8">
        <div className="bg-primary-light mb-6 flex h-14 w-14 items-center justify-center rounded-lg">
          <Icon className="text-primary h-7 w-7" />
        </div>
        <Typography variant="h3" className="mb-2">
          Module {title} bientôt disponible
        </Typography>
        <Typography variant="muted" className="mb-6 max-w-md">
          Cette section sera disponible dans la prochaine version. Nous développons des outils
          performants pour vous aider à gérer {title.toLowerCase()} efficacement.
        </Typography>
        <Button disabled variant="outline" className="h-10">
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

export const moduleIcons = {
  students: GraduationCap,
  teachers: Users,
  classes: BookOpen,
  grades: BarChart3,
  finance: CreditCard,
  reports: BarChart3,
  settings: Shield,
  default: Zap,
};
