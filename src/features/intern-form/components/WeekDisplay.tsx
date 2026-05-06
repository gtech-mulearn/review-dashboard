"use client";

interface WeekDisplayProps {
  weekString: string;
}

export function WeekDisplay({ weekString }: WeekDisplayProps) {
  return (
    <div className="bg-muted px-3 py-1 rounded-md text-sm font-medium">
      {weekString}
    </div>
  );
}
