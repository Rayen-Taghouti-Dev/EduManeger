'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { useAuth } from '@/providers/auth-provider';
import { useI18n } from '@/providers/locale-provider';
import { Button, Input, Label } from '@edumanager/ui';

export default function LoginPage() {
  const router = useRouter();
  const { status, login, pendingSelection, selectMembership, clearPendingSelection } = useAuth();
  const { t } = useI18n();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedUserRoleId, setSelectedUserRoleId] = useState<string | null>(null);

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.string().email(t('auth.invalidEmail')),
        password: z.string().min(8, t('auth.passwordMin')),
      }),
    [t],
  );

  type LoginFormValues = z.infer<typeof loginSchema>;

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
      setErrorMessage(error instanceof Error ? error.message : t('auth.loginFailed'));
    }
  });

  const handleMembershipSelection = async () => {
    if (!selectedUserRoleId) {
      setErrorMessage(t('auth.selectSchoolError'));
      return;
    }

    setErrorMessage(null);

    try {
      const authenticated = await selectMembership(selectedUserRoleId);
      if (authenticated) {
        router.replace('/dashboard');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t('auth.selectFailed'));
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-5">
        {pendingSelection ? (
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-base font-semibold">{t('auth.chooseSchool')}</h2>
              <p className="text-muted-foreground text-sm">{t('auth.chooseSchoolHint')}</p>
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
              {t('auth.continue')}
            </Button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('auth.emailPlaceholder')}
                {...register('email')}
              />
              {errors.email && <p className="text-danger text-xs">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t('auth.passwordPlaceholder')}
                {...register('password')}
              />
              {errors.password && <p className="text-danger text-xs">{errors.password.message}</p>}
            </div>
            <Button className="w-full" disabled={isSubmitting || status === 'loading'} type="submit">
              {isSubmitting ? t('auth.signingIn') : t('auth.signIn')}
            </Button>
          </form>
        )}

        {errorMessage && <p className="text-danger text-sm">{errorMessage}</p>}
      </div>
    </AuthLayout>
  );
}
