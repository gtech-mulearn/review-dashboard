import type { WeeklyReviewFormValues } from "@/features/intern-form/schemas/intern-form-schema";
import { supabase } from "@/lib/supabase";

export interface WeeklyReviewResponse {
  id: string;
  created_at: string;
  full_name: string;
  muid: string;
  email: string;
  team: string;
  tasks_assigned: string;
  tasks_completed: string;
  works_done: string;
  hours_committed: string;
  blockers: string;
  leave_days: string;
  week: string;
}

export const responseService = {
  /**
   * Submit a new weekly review response
   */
  async submitResponse(data: WeeklyReviewFormValues & { week: string }) {
    const { error } = await supabase.from("weekly_reviews").insert([
      {
        full_name: data.fullName,
        muid: data.muid,
        email: data.email,
        team: data.team,
        tasks_assigned: data.tasksAssigned,
        tasks_completed: data.tasksCompleted,
        works_done: data.worksDone,
        hours_committed: data.hoursCommitted,
        blockers: data.blockers,
        leave_days: data.leaveDays,
        week: data.week,
      },
    ]);

    if (error) {
      throw error;
    }
  },

  /**
   * Get all responses
   */
  async getAllResponses() {
    const { data, error } = await supabase
      .from("weekly_reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data as WeeklyReviewResponse[];
  },

  /**
   * Get responses filtered by team
   */
  async getResponsesByTeam(team: string) {
    const { data, error } = await supabase
      .from("weekly_reviews")
      .select("*")
      .eq("team", team)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data as WeeklyReviewResponse[];
  },

  /**
   * Get responses filtered by individual (MUID)
   */
  async getResponsesByIndividual(muid: string) {
    const { data, error } = await supabase
      .from("weekly_reviews")
      .select("*")
      .eq("muid", muid)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data as WeeklyReviewResponse[];
  },

  /**
   * Get responses filtered by week
   */
  async getResponsesByWeek(week: string) {
    const { data, error } = await supabase
      .from("weekly_reviews")
      .select("*")
      .eq("week", week)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data as WeeklyReviewResponse[];
  },
};
