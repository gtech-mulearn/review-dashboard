/**
 * Session Hook
 *
 * 📍 src/features/auth/hooks/use-session.ts
 *
 * TanStack Query hooks for user session data.
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../api";
import { authKeys } from "./query-keys";

/**
 * Hook for fetching public user profile by muid.
 * If muid is not provided, tries to get it from stored auth cookies.
 */
export function usePublicUserProfile() {
  return useQuery({
    queryKey: authKeys.userInfo(),
    queryFn: () => fetchUserInfo(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
