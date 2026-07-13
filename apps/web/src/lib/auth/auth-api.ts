import { getAccessToken, refreshAccessToken } from './access-token-store';
import type { AuthSuccessResponse, CurrentUser, LoginResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = response.headers.get('content-type')?.includes('application/json')
    ? await response.json()
    : null;

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String(payload.message)
        : 'Une erreur est survenue';

    throw new Error(message);
  }

  return payload as T;
}

export async function authFetch<T>(
  path: string,
  init: RequestInit = {},
  options: { auth?: boolean; retryOn401?: boolean } = {},
): Promise<T> {
  const { auth = false, retryOn401 = true } = options;
  const headers = new Headers(init.headers);

  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (auth) {
    const token = getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    credentials: 'include',
  }).catch(() => {
    throw new Error(
      'Impossible de joindre l’API. Démarrez le serveur avec : pnpm --filter @edumanager/api dev',
    );
  });

  if (response.status === 401 && auth && retryOn401) {
    const refreshedToken = await refreshAccessToken();
    if (refreshedToken) {
      return authFetch<T>(path, init, { auth, retryOn401: false });
    }
  }

  return parseResponse<T>(response);
}

export function login(email: string, password: string) {
  return authFetch<LoginResponse>(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    },
    { auth: false, retryOn401: false },
  );
}

export function selectMembership(loginToken: string, userRoleId: string) {
  return authFetch<AuthSuccessResponse>(
    '/auth/select-membership',
    {
      method: 'POST',
      body: JSON.stringify({ loginToken, userRoleId }),
    },
    { auth: false, retryOn401: false },
  );
}

export function refreshSession() {
  return authFetch<AuthSuccessResponse>(
    '/auth/refresh',
    { method: 'POST' },
    { auth: false, retryOn401: false },
  );
}

export function logout() {
  return authFetch<{ success: boolean }>(
    '/auth/logout',
    { method: 'POST' },
    { auth: false, retryOn401: false },
  );
}

export function getCurrentUser() {
  return authFetch<CurrentUser>('/auth/me', undefined, { auth: true });
}
