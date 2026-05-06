"use client";

interface CountdownTimerProps {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export function CountdownTimer({ timeLeft }: CountdownTimerProps) {
  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-1 text-center">
      {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
        <div key={unit} className="bg-background/50 rounded-lg px-2 py-3">
          <div className="text-2xl font-mono font-bold tabular-nums text-primary">
            {String(timeLeft[unit]).padStart(2, "0")}
          </div>
          <div className="text-[10px] uppercase tracking-wider opacity-70 font-medium">
            {unit.charAt(0).toUpperCase() + unit.slice(1)}
          </div>
        </div>
      ))}
    </div>
  );
}
