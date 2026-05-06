"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CountdownTimer } from "./CountdownTimer";

interface AlreadySubmittedProps {
  week: number;
  year: number;
  getWeekDisplayString: (week: number, year: number) => string;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export function AlreadySubmitted({
  week,
  year,
  getWeekDisplayString,
  timeLeft,
}: AlreadySubmittedProps) {
  return (
    <Card>
      <CardHeader className="text-2xl font-semibold">
        Weekly Review Form
      </CardHeader>
      <CardContent>
        <Alert className="bg-chart-2/10 text-chart-2 border-chart-2/20">
          <AlertTitle>Already Submitted</AlertTitle>
          <AlertDescription>
            You have already submitted your review for{" "}
            {getWeekDisplayString(week, year)}.
            <div className="mt-3">
              <p className="text-sm opacity-80 mb-2">
                Next submission opens in:
              </p>
              <CountdownTimer timeLeft={timeLeft} />
            </div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
