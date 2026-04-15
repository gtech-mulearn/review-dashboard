"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "@/app/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

type FormValues = {
  fullName: string;
  muid: string;
  team: string;
  tasksAssigned: string;
  tasksCompleted: string;
  worksDone: string;
  hoursCommitted: string;
  blockers: string;
  leaveDays: string;
  weeklyReview: string;
};

const DEFAULT_TEAMS = [
  "Web Dev",
  "AI",
  "Devops",
  "Partner Engagement",
  "Tech Team",
];

export default function WeeklyReviewPage() {
  const userProfile = useInternStore((state) => state.userProfile);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teams, setTeams] = useState<string[]>(DEFAULT_TEAMS);
  const [isAddTeamOpen, setIsAddTeamOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");

  const form = useForm<FormValues>({
    defaultValues: {
      fullName: userProfile?.fullName || "",
      muid: userProfile?.muid || "",
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

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    form.reset();
    setIsSubmitting(false);
  };

  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      setTeams([...teams, newTeamName.trim()]);
      setNewTeamName("");
      setIsAddTeamOpen(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">
            Weekly Review
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Submit your weekly review below
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-muted/50" />
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
                      <Input {...field} readOnly className="bg-muted/50" />
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
                      <Dialog
                        open={isAddTeamOpen}
                        onOpenChange={setIsAddTeamOpen}
                      >
                        <DialogTrigger asChild>
                          <Button type="button" variant="outline" size="icon">
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Team</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <Input
                              placeholder="Enter team name"
                              value={newTeamName}
                              onChange={(e) => setNewTeamName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAddTeam();
                                }
                              }}
                            />
                            <Button
                              type="button"
                              onClick={handleAddTeam}
                              className="w-full"
                            >
                              Add Team
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
