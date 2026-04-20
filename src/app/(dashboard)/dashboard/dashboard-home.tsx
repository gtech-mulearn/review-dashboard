"use client";

import {
  CheckCircle2Icon,
  FileTextIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MANAGEMENT_ROLES } from "@/lib/auth/roles";
import { cn } from "@/lib/utils";
import { useInternStore } from "@/stores/intern-store";

export function DashboardHome() {
  const { userProfile } = useInternStore();

  const isManagement = userProfile?.roles.some((role) =>
    MANAGEMENT_ROLES.includes(role as (typeof MANAGEMENT_ROLES)[number]),
  );

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="space-y-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl p-8 shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
            <div className="space-y-6 text-center md:text-left">
              <Badge
                variant={"default"}
                className="inline-flex items-center gap-2 font-bold uppercase tracking-wider"
              >
                <SparklesIcon className="size-3" />
                Welcome back
              </Badge>
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {greeting},{" "}
                  <span className="text-primary">
                    {userProfile?.full_name?.split(" ")[0] || "User"}
                  </span>
                </h1>
                <p className="font-medium text-sm md:text-base leading-relaxed max-w-md">
                  Track your intern performance, manage reports, and watch your
                  impact grow. You&apos;re doing great!
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start pt-2">
                <Link href="/dashboard/intern/weekly-review">
                  <Button variant={"default"}>Submit Weekly Review</Button>
                </Link>
                {isManagement && (
                  <>
                    <Link href="/dashboard/admin/weekly-report-generator">
                      <Button variant={"default"}>Weekly Generator</Button>
                    </Link>
                    <Link href="/dashboard/admin/event-report">
                      <Button variant="outline">Event Template</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="relative group">
              <Avatar className="size-50 relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                <AvatarImage
                  src={userProfile?.profile_pic || ""}
                  className="object-cover"
                />
                <AvatarFallback className="text-5xl font-black bg-primary text-primary-foreground">
                  {userProfile?.full_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 rounded-3xl bg-chart-1/10 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold tracking-tight">
                User Profile
              </h3>
              <Badge
                variant={"default"}
                className="font-bold uppercase tracking-widest"
              >
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </Badge>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Email
                  </span>
                  <span className="text-sm font-medium">
                    {userProfile?.email}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Muid
                  </span>
                  <span className="font-mono text-xs font-bold w-fit truncate">
                    {userProfile?.muid}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Joined
                  </span>
                  <span className="text-sm font-medium">
                    {userProfile?.joined
                      ? new Date(userProfile.joined).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-wider">
                  User Roles
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {userProfile?.roles?.map((role) => (
                    <Badge variant={"default"} key={role}>
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Domains
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {userProfile?.user_domains?.map((domain) => (
                    <Badge key={domain} variant={"outline"}>
                      {domain}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-wider">
                  End Goals
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {userProfile?.user_endgoals?.map((goal) => (
                    <Badge key={goal} variant={"secondary"}>
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2 group cursor-pointer">
          <Card className="h-full rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 transition-colors">
              <FileTextIcon className="size-40 -rotate-12 translate-x-12 -translate-y-12 opacity-5" />
            </div>
            <CardHeader className="pb-2 relative z-10 p-8">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileTextIcon className="size-6" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                Weekly Reports
              </CardTitle>
              <CardDescription className="font-medium">
                AI-generated performance summaries
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 px-8 pb-8">
              <p className="text-smleading-relaxed max-w-sm">
                Generate comprehensive weekly reports for your teams. Reports
                are automatically processed and synced to your central
                workspace.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 group cursor-pointer">
          <Card className="h-full rounded-3xl bg-chart-2/10 relative overflow-hidden">
            <CardHeader className="p-8">
              <div className="size-12 rounded-2xl bg-background text-chart-2 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <UsersIcon className="size-6" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                Interns
              </CardTitle>
              <CardDescription className="font-medium">
                Registry & Teams
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 flex flex-col justify-between h-[calc(100%-160px)]">
              <p className="text-sm leading-relaxed">
                Track profiles and node assignments across all active regions.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-full rounded-3xl bg-chart-3/10 shadow-sm relative overflow-hidden">
            <CardHeader className="p-8">
              <div className="size-12 rounded-2xl bg-background text-chart-3 flex items-center justify-center mb-4 shadow-sm">
                <ZapIcon className="size-6 fill-chart-3" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                Features
              </CardTitle>
              <CardDescription className="font-medium">
                Core Capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-3">
              {[
                { label: "Centralized tracking", color: "text-chart-3" },
                { label: "Role-based access", color: "text-chart-3" },
                { label: "AI report generation", color: "text-chart-3" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <CheckCircle2Icon className={cn("size-4", f.color)} />
                  <span className="text-sm font-semibold text-slate-700">
                    {f.label}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
