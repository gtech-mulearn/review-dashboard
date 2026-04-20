"use client";

import Loader from "@/app/loading";
import { WeeklyReviewForm } from "@/features/intern-form";
import { useInternStore } from "@/stores/intern-store";

export default function WeeklyReviewPage() {
  const userProfile = useInternStore((state) => state.userProfile);

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <WeeklyReviewForm />
    </div>
  );
}
