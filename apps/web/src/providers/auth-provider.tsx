'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import {
  clearAccessToken,
  getAccessToken,
  registerRefreshHandler,
  setAccessToken,
} from '@/lib/auth/access-token-store';
import {
  getCurrentUser as getCurrentUserRequest,
  login as loginRequest,
  logout as logoutRequest,
  refreshSession,
  selectMembership as selectMembershipRequest,
} from '@/lib/auth/auth-api';
import type { AuthMembershipOption, CurrentUser } from '@/lib/auth/types';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface PendingSelectionState {
  loginToken: string;
  memberships: AuthMembershipOption[];
}

interface AuthContextValue {
  status: AuthStatus;
  currentUser: CurrentUser | null;
  pendingSelection: PendingSelectionState | null;
  login: (email: string, password: string) => Promise<boolean>;
  selectMembership: (userRoleId: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refresh: () => Promise<string | null>;
  clearPendingSelection: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [pendingSelection, setPendingSelection] = useState<PendingSelectionState | null>(null);
  const sessionOperationId = useRef(0);

  const applyAuthenticatedState = useCallback((accessToken: string, user: CurrentUser) => {
    setAccessToken(accessToken);
    setCurrentUser(user);
    setPendingSelection(null);
    setStatus('authenticated');
  }, []);

  const resetAuthState = useCallback(() => {
    clearAccessToken();
    setCurrentUser(null);
    setPendingSelection(null);
    setStatus('unauthenticated');
  }, []);

  const invalidatePendingSessionOperations = useCallback(() => {
    sessionOperationId.current += 1;
  }, []);

  const refresh = useCallback(async () => {
    const operationId = ++sessionOperationId.current;

    try {
      const result = await refreshSession();

      if (operationId !== sessionOperationId.current) {
        return getAccessToken();
      }

      applyAuthenticatedState(result.accessToken, result.user);

      return result.accessToken;
    } catch {
      if (operationId !== sessionOperationId.current) {
        return getAccessToken();
      }

      if (getAccessToken()) {
        setStatus('authenticated');

        return getAccessToken();
      }

      resetAuthState();

      return null;
    }
  }, [applyAuthenticatedState, resetAuthState]);

  useEffect(() => {
    registerRefreshHandler(refresh);

    return () => registerRefreshHandler(null);
  }, [refresh]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(
    async (email: string, password: string) => {
      invalidatePendingSessionOperations();

      const result = await loginRequest(email, password);

      if (result.requiresSelection) {
        clearAccessToken();
        setCurrentUser(null);
        setPendingSelection({
          loginToken: result.loginToken,
          memberships: result.memberships,
        });
        setStatus('unauthenticated');

        return false;
      }

      applyAuthenticatedState(result.accessToken, result.user);

      return true;
    },
    [applyAuthenticatedState, invalidatePendingSessionOperations],
  );

  const selectMembership = useCallback(
    async (userRoleId: string) => {
      if (!pendingSelection) {
        throw new Error('Aucune sélection en attente');
      }

      invalidatePendingSessionOperations();

      const result = await selectMembershipRequest(pendingSelection.loginToken, userRoleId);
      applyAuthenticatedState(result.accessToken, result.user);

      return true;
    },
    [applyAuthenticatedState, invalidatePendingSessionOperations, pendingSelection],
  );

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      resetAuthState();
    }
  }, [resetAuthState]);

  const clearPendingSelection = useCallback(() => {
    setPendingSelection(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      currentUser,
      pendingSelection,
      login,
      selectMembership,
      logout,
      refresh,
      clearPendingSelection,
    }),
    [clearPendingSelection, currentUser, login, logout, pendingSelection, refresh, selectMembership, status],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

export async function fetchCurrentUser() {
  return getCurrentUserRequest();
}
