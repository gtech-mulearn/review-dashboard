/**
 * Query Keys
 *
 * 📍 src/features/auth/hooks/query-keys.ts
 *
 * Centralized query keys for TanStack Query.
 * Ensures consistent cache invalidation.
 */

export const authKeys = {
  all: ["auth"] as const,
  userInfo: () => [...authKeys.all, "userInfo"] as const,
};
