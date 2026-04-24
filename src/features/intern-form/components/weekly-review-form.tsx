"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useInternStore } from "@/stores/intern-store";
import { type WeeklyReviewFormValues, weeklyReviewSchema } from "../schemas";

const DEFAULT_TEAMS = [
  "Web Dev",
  "AI",
  "Devops",
  "Partner Engagement",
  "Tech Team",
];

interface WeeklyReviewFormProps {
  onSuccess?: () => void;
}

export function WeeklyReviewForm({ onSuccess }: WeeklyReviewFormProps) {
  const userProfile = useInternStore((state) => state.userProfile);
  const [teams] = useState<string[]>(DEFAULT_TEAMS);

  const form = useForm<WeeklyReviewFormValues>({
    resolver: zodResolver(weeklyReviewSchema),
    defaultValues: {
      fullName: userProfile?.full_name || "",
      muid: userProfile?.muid || "",
      email: userProfile?.email || "",
      team: "",
      tasksAssigned: "",
      tasksCompleted: "",
      worksDone: "",
      hoursCommitted: "",
      blockers: "",
      leaveDays: "",
      weeklyReview: "",
    },
  });

  const onSubmit = async (data: WeeklyReviewFormValues) => {
    form.reset();
    onSuccess?.();
  };
  return (
    <Card>
      <CardHeader className="text-2xl font-semibold">
        Weekly Review Form
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      className="bg-muted/50 cursor-not-allowed"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="muid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MUID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      className="bg-muted/50 cursor-not-allowed"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      className="bg-muted/50 cursor-not-allowed"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="team"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team</FormLabel>
                  <div className="flex gap-2">
                    <FormControl className="flex-1">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your team" />
                        </SelectTrigger>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem key={team} value={team}>
                              {team}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tasksAssigned"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tasks Assigned</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter tasks assigned..."
                      className="min-h-[80px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tasksCompleted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tasks Completed</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter tasks completed..."
                      className="min-h-[80px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="worksDone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Works Done</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter works done..."
                      className="min-h-[80px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hoursCommitted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hours Committed</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter hours committed"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blockers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blockers</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter any blockers..."
                      className="min-h-[80px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leaveDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave Days</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter leave days taken..."
                      className="min-h-[80px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit Review
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
