import type { Metadata } from "next";
import { DashboardHome } from "./dashboard-home";

export const metadata: Metadata = {
  title: "Dashboard | μLearn",
  description: "Your μLearn dashboard",
};

export default function DashboardPage() {
  return <DashboardHome />;
}
