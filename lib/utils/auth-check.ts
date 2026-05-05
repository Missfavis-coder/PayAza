import { getCookie } from 'cookies-next';

export const authCheck = {
  isAuthenticated(): boolean {
    const accessToken = getCookie('tekcify_access_token');
    const expiresAt = getCookie('tekcify_expires_at');

    if (!accessToken || !expiresAt) {
      return false;
    }

    const expiryTimestamp = parseInt(expiresAt as string, 10);

    if (isNaN(expiryTimestamp)) {
      return false;
    }

    const now = Date.now();

    return expiryTimestamp > now;
  },

  getAccessToken(): string | null {
    const token = getCookie('tekcify_access_token');
    return token ? (token as string) : null;
  },

  getTokenExpiry(): number | null {
    const expiresAt = getCookie('tekcify_expires_at');
    if (!expiresAt) return null;
    const timestamp = parseInt(expiresAt as string, 10);
    return isNaN(timestamp) ? null : timestamp;
  },

  isTokenExpired(): boolean {
    const expiresAt = this.getTokenExpiry();
    if (!expiresAt) return true;
    return Date.now() >= expiresAt;
  },
};
