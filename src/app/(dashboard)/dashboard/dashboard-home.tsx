"use client";

import { CheckCircle2Icon, FileTextIcon, UsersIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DashboardHome() {
  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Intern Performance Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track, evaluate, and report on intern performance across all teams
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-gradient-to-br from-primary/10 to-chart-1/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileTextIcon
                className="h-4 w-4"
                style={{ color: "var(--primary)" }}
              />
              Weekly Reports
            </CardTitle>
            <CardDescription>
              AI-generated performance summaries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Generate comprehensive weekly reports. Reports are automatically
              saved to your Notion workspace.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-chart-4/10 to-chart-5/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UsersIcon
                className="h-4 w-4"
                style={{ color: "var(--chart-4)" }}
              />
              Manage Interns
            </CardTitle>
            <CardDescription>
              Track profiles and team assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage intern profiles and track overall performance across all
              teams.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">How It Works</CardTitle>
            <CardDescription>Streamlined performance tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                1
              </div>
              <span className="text-sm">Interns submit weekly reviews</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-chart-3 text-white text-xs font-bold">
                2
              </div>
              <span className="text-sm">AI generates team reports</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Features</CardTitle>
            <CardDescription>Everything you need</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="h-4 w-4 text-chart-2" />
              <span className="text-sm">Centralized tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="h-4 w-4 text-chart-2" />
              <span className="text-sm">Role-based access</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="h-4 w-4 text-chart-2" />
              <span className="text-sm">AI report generation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="h-4 w-4 text-chart-2" />
              <span className="text-sm">Notion integration</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
