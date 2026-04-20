/**
 * Auth Schemas Index
 *
 * 📍 src/features/auth/schemas/index.ts
 *
 * Public exports for auth schemas and types.
 */

// Auth schemas and types
export {
  // Schemas
  ApiResponseSchema,
  type InterestGroup,
  InterestGroupSchema,
  type KarmaDistribution,
  KarmaDistributionSchema,
  // Types
  type LoginRequest,
  LoginRequestSchema,
  type LoginResponse,
  type LoginResponseData,
  LoginResponseDataSchema,
  LoginResponseSchema,
  type RefreshTokenRequest,
  RefreshTokenRequestSchema,
  type RefreshTokenResponse,
  RefreshTokenResponseSchema,
  type RequestOTPRequest,
  RequestOTPRequestSchema,
  RequestOTPResponseSchema,
  type UserInfo,
  UserInfoResponseSchema,
  UserInfoSchema,
} from "./auth.schema";
