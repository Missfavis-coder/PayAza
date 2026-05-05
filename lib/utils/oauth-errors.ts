export const oauthErrorMessages: Record<string, string> = {
  invalid_request: "Oops! Something went wrong with your request. Please try again.",
  unauthorized_client: "Unable to verify your account. Please contact support.",
  access_denied: "Sign in was cancelled. Feel free to try again whenever you're ready.",
  unsupported_response_type: "Authentication error occurred. Please try again.",
  invalid_scope: "Permission error occurred. Please try again.",
  server_error: "Our servers are having a moment. Please try again in a few seconds.",
  temporarily_unavailable: "Service temporarily unavailable. We'll be back shortly!",
  invalid_client: "Account verification failed. Please contact support.",
  invalid_grant: "Your session has expired. Please sign in again.",
  
  invalid_credentials: "Email or password doesn't match. Please try again.",
  email_not_verified: "Please verify your email address before signing in.",
  account_inactive: "Your account is currently inactive. Contact support for help.",
  mfa_required: "Additional verification required. Please check your device.",
  invalid_token: "This link is invalid or has been used. Please request a new one.",
  token_expired: "This link has expired. Please request a new one.",
  missing_parameters: "Something's missing. Please try signing in again.",
  
  invalid_code_challenge: "Security verification failed. Please try again.",
  invalid_code_verifier: "Security verification failed. Please try again.",
  invalid_redirect_uri: "Redirect error occurred. Please contact support.",
  authorization_code_expired: "Your session expired. Please sign in again.",
  authorization_code_used: "This code has already been used. Please sign in again.",
  invalid_origin: "Access denied from this location. Please contact support.",
  
  invalid_state: "Security check failed. Please try signing in again.",
  session_expired: "Your session has expired. Please sign in again.",
  rate_limit_exceeded: "Too many attempts. Please wait a moment and try again.",
  
  authentication_failed: "Sign in failed. Please try again or contact support.",
  
  default: "Something unexpected happened. Please try again.",
};

export function getOAuthErrorMessage(errorCode?: string | null): string {
  if (!errorCode) return oauthErrorMessages.default;
  return oauthErrorMessages[errorCode] || oauthErrorMessages.default;
}
