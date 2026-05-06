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

export interface CurrentWeekInfo {
  week: number;
  year: number;
}

const mapReviewRow = (row: Record<string, any>): WeeklyReviewResponse => {
  const responses = row.responses || {};
  return {
    id: row.id,
    created_at: row.created_at,
    full_name: responses.fullName || "",
    muid: responses.muid || row.intern_id,
    email: responses.email || "",
    team: responses.team || "",
    tasks_assigned: responses.tasksAssigned || "",
    tasks_completed: responses.tasksCompleted || "",
    works_done: responses.worksDone || "",
    hours_committed: responses.hoursCommitted || "",
    blockers: responses.blockers || "",
    leave_days: responses.leaveDays || "",
    week: row.iso_week ? `W${row.iso_week} ${row.iso_year}` : "Unknown",
  };
};

export const responseService = {
  /**
   * Get the current ISO week and year in IST from the database.
   */
  async getCurrentWeekInfo(): Promise<CurrentWeekInfo> {
    const { data, error } = await supabase.rpc("get_current_week_info");

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      return { week: data[0].week, year: data[0].year };
    }

    throw new Error("Failed to fetch current week info");
  },

  /**
   * Check if the intern has already submitted a review for the given week and year.
   */
  async checkSubmissionStatus(
    muid: string,
    year: number,
    week: number,
  ): Promise<boolean> {
    const { data, error } = await supabase
      .from("reviews")
      .select("id")
      .eq("intern_id", muid)
      .eq("iso_year", year)
      .eq("iso_week", week)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return !!data;
  },

  /**
   * Submit a new weekly review response
   */
  async submitResponse(data: WeeklyReviewFormValues) {
    const { error } = await supabase.from("reviews").insert([
      {
        intern_id: data.muid,
        responses: data,
        is_on_leave: data.isOnLeave || false,
      },
    ]);

    if (error) {
      // Supabase unique constraint violation error code is typically '23505'
      if (error.code === "23505") {
        throw new Error("You have already submitted a review for this week.");
      }
      throw error;
    }
  },

  /**
   * Get all responses
   */
  async getAllResponses() {
    const { data, error } = await supabase.from("reviews").select("*");

    if (error) {
      throw error;
    }

    return (data || []).map(mapReviewRow);
  },

  /**
   * Get responses filtered by team
   */
  async getResponsesByTeam(team: string) {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("responses->>team", team);

    if (error) {
      throw error;
    }

    return (data || []).map(mapReviewRow);
  },

  /**
   * Get responses filtered by individual (MUID)
   */
  async getResponsesByIndividual(muid: string) {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("intern_id", muid);

    if (error) {
      throw error;
    }

    return (data || []).map(mapReviewRow);
  },

  /**
   * Get responses filtered by week
   */
  async getResponsesByWeek(week: string) {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("iso_week", week);

    if (error) {
      throw error;
    }

    return (data || []).map(mapReviewRow);
  },
};
