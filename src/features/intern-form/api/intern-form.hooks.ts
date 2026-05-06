import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { WeeklyReviewFormValues } from "../schemas/intern-form-schema";
import { responseService } from "./intern-form.api";

export const reviewKeys = {
  all: ["reviews"] as const,
  currentWeek: () => [...reviewKeys.all, "current-week"] as const,
  status: (muid: string) => [...reviewKeys.all, "status", muid] as const,
  allResponses: () => [...reviewKeys.all, "all-responses"] as const,
};

export function useCurrentWeek() {
  return useQuery({
    queryKey: reviewKeys.currentWeek(),
    queryFn: () => responseService.getCurrentWeekInfo(),
    staleTime: 1000 * 60 * 60,
  });
}

export function useSubmissionStatus(
  muid: string,
  year?: number,
  week?: number,
) {
  return useQuery({
    queryKey: [...reviewKeys.status(muid), year, week],
    queryFn: () => {
      if (!year || !week || !muid) return false;
      return responseService.checkSubmissionStatus(muid, year, week);
    },
    enabled: !!muid && !!year && !!week,
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: WeeklyReviewFormValues) =>
      responseService.submitResponse(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.status(variables.muid),
      });
    },
  });
}

export function useAllResponses() {
  return useQuery({
    queryKey: reviewKeys.allResponses(),
    queryFn: () => responseService.getAllResponses(),
  });
}
