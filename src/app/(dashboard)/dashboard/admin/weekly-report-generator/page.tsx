"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Pagination from "@/components/layout/table/pagination";
import Table from "@/components/layout/table/Table";
import TableTop from "@/components/layout/table/TableTop";
import THead from "@/components/layout/table/Thead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllResponses } from "@/features/intern-form/api/intern-form.hooks";
import { GenerateIndividualDialog } from "./components/GenerateIndividualDialog";
import { GenerateTeamDialog } from "./components/GenerateTeamDialog";

export default function WeeklyReportGeneratorPage() {
  const router = useRouter();
  const { data: responses, isLoading } = useAllResponses();
  const [searchText, setSearchText] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [teamFilter, setTeamFilter] = useState("ALL");

  const handleGenerateIndividual = (muid: string) => {
    router.push(
      `/dashboard/admin/weekly-report-generator/individual?muid=${muid}`,
    );
  };

  const handleGenerateTeam = (teamName: string) => {
    router.push(
      `/dashboard/admin/weekly-report-generator/team?team=${teamName}`,
    );
  };

  const filteredData = (responses || []).filter((r) => {
    const searchLower = searchText.toLowerCase();
    const matchesSearch =
      r.muid?.toLowerCase().includes(searchLower) ||
      r.full_name?.toLowerCase().includes(searchLower);

    const matchesTeam = teamFilter === "ALL" || r.team === teamFilter;

    return matchesSearch && matchesTeam;
  });

  const uniqueTeams = Array.from(
    new Set((responses || []).map((r) => r.team).filter(Boolean)),
  );

  const startIndex = (page - 1) * perPage;
  const currentRows = filteredData.slice(startIndex, startIndex + perPage);

  const columnOrder = [
    { column: "full_name", Label: "Name", isSortable: true },
    { column: "muid", Label: "MUID", isSortable: true },
    { column: "team", Label: "Team", isSortable: true },
    { column: "week", Label: "Week", isSortable: true },
    { column: "tasks_completed", Label: "Tasks Completed", isSortable: false },
    { column: "hours_committed", Label: "Hours Committed", isSortable: true },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-6">
          <div>
            <CardTitle className="text-2xl font-semibold">
              Weekly Report Generator
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              Generate weekly reports for interns and team Performance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <GenerateIndividualDialog onGenerate={handleGenerateIndividual} />

            <GenerateTeamDialog onGenerate={handleGenerateTeam} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <TableTop
                onSearchText={(t) => {
                  setSearchText(t);
                  setPage(1);
                }}
                onPerPageNumber={(n) => {
                  setPerPage(n);
                  setPage(1);
                }}
                CSV=""
                perPage={perPage}
                perPageOptions={[10, 20, 50]}
                searchPlaceholder="Search by Name or MUID..."
                searchSize="md"
                searchPosition="left"
              />
            </div>

            <div className="w-full md:w-64 mb-4">
              <Label className="mb-2 block text-sm font-medium text-muted-foreground">
                Filter by Team
              </Label>
              <Select
                value={teamFilter}
                onValueChange={(v) => {
                  setTeamFilter(v);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Teams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Teams</SelectItem>
                  {uniqueTeams.map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table
            rows={currentRows as any}
            isloading={isLoading}
            page={page}
            perPage={perPage}
            columnOrder={columnOrder}
          >
            <THead
              columnOrder={columnOrder}
              onIconClick={() => {}}
              action={false}
            />
            {filteredData.length > 0 && (
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(filteredData.length / perPage)}
                perPage={perPage}
                totalCount={filteredData.length}
                handlePreviousClick={() => setPage((p) => Math.max(1, p - 1))}
                handleNextClick={() => setPage((p) => p + 1)}
              />
            )}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
