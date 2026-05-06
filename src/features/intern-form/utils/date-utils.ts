export function getMondayOfISOWeek(week: number, year: number): Date {
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dow = simple.getDay();
  const dayOffset = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(simple);
  monday.setDate(simple.getDate() + dayOffset);
  return monday;
}

export function getNextSubmissionOpenTimestamp(
  week: number,
  year: number,
): number {
  const currentWeekMonday = getMondayOfISOWeek(week, year);
  const nextWeekMonday = new Date(currentWeekMonday);
  nextWeekMonday.setDate(currentWeekMonday.getDate() + 7);
  nextWeekMonday.setHours(0, 0, 0, 0);
  return nextWeekMonday.getTime();
}
