import type { NextRequest } from "next/server";

export const authCheckServer = {
  isAuthenticated(request: NextRequest): boolean {
    const accessToken = request.cookies.get("tekcify_access_token");
    const expiresAt = request.cookies.get("tekcify_expires_at");

    if (!accessToken?.value || !expiresAt?.value) {
      return false;
    }

    const expiryTimestamp = parseInt(expiresAt.value.trim(), 10);

    if (isNaN(expiryTimestamp)) {
      return false;
    }

    const now = Date.now();
    return expiryTimestamp > now;
  },

  getAccessToken(request: NextRequest): string | null {
    const token = request.cookies.get("tekcify_access_token");
    return token?.value || null;
  },

  getTokenExpiry(request: NextRequest): Date | null {
    const expiresAt = request.cookies.get("tekcify_expires_at");
    return expiresAt?.value ? new Date(expiresAt.value) : null;
  },

  isTokenExpired(request: NextRequest): boolean {
    const expiresAt = this.getTokenExpiry(request);
    if (!expiresAt) return true;
    return new Date() >= expiresAt;
  },
};
