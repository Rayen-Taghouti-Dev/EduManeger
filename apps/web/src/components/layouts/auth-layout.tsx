import { BookOpen } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, Typography } from '@edumanager/ui';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-background flex min-h-screen">
      <div className="bg-primary hidden flex-1 flex-col justify-between p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
            <BookOpen className="h-5 w-5" />
          </div>
          <Typography variant="h4" className="text-white">
            EduManager Pro
          </Typography>
        </div>
        <div>
          <Typography variant="h2" className="mb-4 text-white">
            Gérez votre établissement en toute confiance
          </Typography>
          <Typography variant="body" className="text-white/80 max-w-md">
            Plateforme SaaS pour écoles privées. Simplifiez la gestion académique, financière et
            la communication en un seul endroit.
          </Typography>
        </div>
        <Typography variant="caption" className="text-white/60">
          Authentification sécurisée avec sessions, JWT et rotation des jetons
        </Typography>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Bon retour</CardTitle>
            <CardDescription>Connectez-vous à votre compte établissement</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
