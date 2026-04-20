/**
 * Intern Form Feature Schemas
 *
 * 📍 src/features/intern-form/schemas/intern-form-schema.ts
 *
 * Zod schemas for form validation.
 */

import { z } from "zod";

// ============================================
// Weekly Review Schema
// ============================================

/**
 * Weekly review form validation schema
 */
export const weeklyReviewSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  muid: z.string().min(1, "MUID is required"),
  email: z.string().email("Invalid email address"),
  team: z.string().min(1, "Team is required"),
  tasksAssigned: z.string().optional(),
  tasksCompleted: z.string().optional(),
  worksDone: z.string().optional(),
  hoursCommitted: z
    .string()
    .optional()
    .refine(
      (val) => !val || (Number.isNaN(Number(val)) && Number(val) >= 0),
      "Hours must be a positive number",
    ),
  blockers: z.string().optional(),
  leaveDays: z.string().optional(),
  weeklyReview: z.string().optional(),
});

// ============================================
// Team Schema
// ============================================

/**
 * Team selection schema
 */
export const teamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
});

// ============================================
// Derived Types
// ============================================

export type WeeklyReviewFormValues = z.infer<typeof weeklyReviewSchema>;
export type TeamFormValues = z.infer<typeof teamSchema>;
