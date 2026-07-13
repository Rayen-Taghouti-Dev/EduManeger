let accessToken: string | null = null;
let refreshHandler: (() => Promise<string | null>) | null = null;

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function clearAccessToken() {
  accessToken = null;
}

export function registerRefreshHandler(handler: (() => Promise<string | null>) | null) {
  refreshHandler = handler;
}

export async function refreshAccessToken() {
  if (!refreshHandler) {
    return null;
  }

  return refreshHandler();
}
