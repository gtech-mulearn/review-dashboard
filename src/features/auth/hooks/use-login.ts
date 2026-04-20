/**
 * Login Hook
 *
 * 📍 src/features/auth/hooks/use-login.ts
 *
 * TanStack Query mutation for login.
 * Handles both password and OTP login flows.
 */

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authStore, MANAGEMENT_ROLES, ROLES } from "@/lib/auth";
import { useInternStore } from "@/stores/intern-store";
import { fetchUserInfo, loginWithOTP, loginWithPassword } from "../api";
import { authKeys } from "./query-keys";

interface LoginWithPasswordParams {
  emailOrMuid: string;
  password: string;
}

interface LoginWithOTPParams {
  emailOrMuid: string;
  otp: string;
}

const ALLOWED_ROLES = [...MANAGEMENT_ROLES, ROLES.INTERN] as const;

function hasAllowedRole(roles: string[]): boolean {
  return roles.some((role) =>
    ALLOWED_ROLES.includes(role as (typeof ALLOWED_ROLES)[number]),
  );
}

/**
 * Hook for password-based login
 */
export function useLoginWithPassword() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ emailOrMuid, password }: LoginWithPasswordParams) => {
      const tokenData = await loginWithPassword(emailOrMuid, password);

      authStore.setTokens(
        tokenData.accessToken,
        tokenData.refreshToken,
        emailOrMuid,
      );

      const userInfo = await fetchUserInfo();

      if (!hasAllowedRole(userInfo.roles)) {
        authStore.clearTokens();
        router.replace("/unauthorized");
        throw new Error("Unauthorized role");
      }

      useInternStore.getState().setUserProfile({
        full_name: userInfo.full_name,
        muid: userInfo.muid,
        roles: userInfo.roles,
        email: userInfo.email,
        profile_pic: userInfo.profile_pic,
        joined: userInfo.joined,
        user_domains: userInfo.user_domains,
        user_endgoals: userInfo.user_endgoals,
      });

      return {
        tokens: tokenData,
        userInfo,
      };
    },
    onSuccess: (data) => {
      queryClient.clear();
      queryClient.setQueryData(authKeys.userInfo(), data.userInfo);
    },
  });
}

/**
 * Hook for OTP-based login
 */
export function useLoginWithOTP() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ emailOrMuid, otp }: LoginWithOTPParams) => {
      const tokenData = await loginWithOTP(emailOrMuid, otp);

      // 2. Save tokens
      authStore.setTokens(
        tokenData.accessToken,
        tokenData.refreshToken,
        emailOrMuid,
      );

      const userInfo = await fetchUserInfo();

      if (!hasAllowedRole(userInfo.roles)) {
        authStore.clearTokens();
        router.replace("/unauthorized");
        throw new Error("Unauthorized role");
      }

      useInternStore.getState().setUserProfile({
        full_name: userInfo.full_name,
        muid: userInfo.muid,
        roles: userInfo.roles,
        email: userInfo.email,
        profile_pic: userInfo.profile_pic,
        joined: userInfo.joined,
        user_domains: userInfo.user_domains,
        user_endgoals: userInfo.user_endgoals,
      });

      return {
        tokens: tokenData,
        userInfo,
      };
    },
    onSuccess: (data) => {
      queryClient.clear();
      queryClient.setQueryData(authKeys.userInfo(), data.userInfo);
    },
  });
}
