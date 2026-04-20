/*
 * Centralized API Endpoints
 *
 * 📍 src/api/endpoints.ts
 *
 * All Django URLs live here.
 * NO hardcoded URLs anywhere else in the app.
 */

export const endpoints = {
  // ============================================
  // Auth Endpoints
  // ============================================
  auth: {
    /** POST - Login with email/muid + password OR email/muid + OTP */
    login: "/api/v1/auth/user-authentication/",
    /** POST - Request OTP for login */
    requestOTP: "/api/v1/auth/request-otp/",
    /** POST - Get new access token using refresh token */
    refreshToken: "/api/v1/auth/get-access-token/",
    /** POST - Verify OTP token */
    verifyToken: "/api/v1/auth/token-verification/",
  },

  // ============================================
  // User Endpoints
  // ============================================
  user: {
    info: "/api/v1/dashboard/user/info/",
  },
} as const;

// Type for type-safe endpoint access
export type Endpoints = typeof endpoints;
