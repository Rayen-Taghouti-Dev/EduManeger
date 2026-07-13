'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { useAuth } from '@/providers/auth-provider';
import { Button, Input, Label } from '@edumanager/ui';

const loginSchema = z.object({
  email: z.string().email('Adresse e-mail invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { status, login, pendingSelection, selectMembership, clearPendingSelection } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedUserRoleId, setSelectedUserRoleId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [router, status]);

  const onSubmit = handleSubmit(async (values) => {
    setErrorMessage(null);
    clearPendingSelection();

    try {
      const authenticated = await login(values.email, values.password);
      if (authenticated) {
        router.replace('/dashboard');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Connexion impossible');
    }
  });

  const handleMembershipSelection = async () => {
    if (!selectedUserRoleId) {
      setErrorMessage('Sélectionnez un établissement pour continuer.');
      return;
    }

    setErrorMessage(null);

    try {
      const authenticated = await selectMembership(selectedUserRoleId);
      if (authenticated) {
        router.replace('/dashboard');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Sélection impossible');
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-5">
        {pendingSelection ? (
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-base font-semibold">Choisissez votre établissement</h2>
              <p className="text-muted-foreground text-sm">
                Plusieurs accès sont disponibles pour ce compte.
              </p>
            </div>
            <div className="space-y-2">
              {pendingSelection.memberships.map((membership) => (
                <button
                  key={membership.userRoleId}
                  type="button"
                  onClick={() => setSelectedUserRoleId(membership.userRoleId)}
                  className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
                    selectedUserRoleId === membership.userRoleId
                      ? 'border-primary bg-primary-light'
                      : 'border-border hover:bg-background-subtle'
                  }`}
                >
                  <p className="text-sm font-medium">{membership.schoolName}</p>
                  <p className="text-muted-foreground mt-1 text-xs">{membership.roleName}</p>
                </button>
              ))}
            </div>
            <Button className="w-full" onClick={handleMembershipSelection}>
              Continuer
            </Button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="admin@ecole.edu" {...register('email')} />
              {errors.email && <p className="text-danger text-xs">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="Votre mot de passe"
                {...register('password')}
              />
              {errors.password && <p className="text-danger text-xs">{errors.password.message}</p>}
            </div>
            <Button className="w-full" disabled={isSubmitting || status === 'loading'} type="submit">
              {isSubmitting ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
        )}

        {errorMessage && <p className="text-danger text-sm">{errorMessage}</p>}
      </div>
    </AuthLayout>
  );
}
