import { TimerSubtype, TimerType } from "../types";

export function calculateEfficiency(
  timerType: TimerType,
  timerSubtype: TimerSubtype,
  duration: string,
  durations: Record<TimerType, Partial<Record<TimerSubtype, number>>>
): number | null {
  const expectedDuration = durations[timerType]?.[timerSubtype];
  if (expectedDuration === undefined) {
    console.error("Invalid timer type or subtype.");
    return null;
  }

  const durationDate = new Date(duration);
  const actualDurationInMinutes =
    durationDate.getUTCHours() * 60 +
    durationDate.getUTCMinutes() +
    durationDate.getUTCSeconds() / 60 +
    durationDate.getUTCMilliseconds() / 60000;

  const efficiency = (expectedDuration / actualDurationInMinutes) * 100;

  return efficiency;
}
