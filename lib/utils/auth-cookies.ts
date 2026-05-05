import { deleteCookie } from "cookies-next";

const isProduction = process.env.NODE_ENV === "production";

export const clearAuthCookies = (): void => {
  const cookieOptions = [
    { sameSite: "lax" as const, secure: false, path: "/" },
    { sameSite: "none" as const, secure: true, path: "/" },
    { sameSite: isProduction ? ("none" as const) : ("lax" as const), secure: isProduction, path: "/" },
  ];

  const cookieNames = [
    "tekcify_access_token",
    "tekcify_refresh_token",
    "tekcify_expires_at",
    "tekcify_token_scope",
    "access_token",
    "refresh_token",
  ];

  cookieNames.forEach((name) => {
    cookieOptions.forEach((options) => {
      try {
        deleteCookie(name, options);
      } catch {}
    });
  });
};
