export type Timer = {
  id: number;
  type: TimerType;
  start: string;
  duration: string;
  isRunning: boolean;
  pausedDuration: number;
  subtype: string;
  efficiency?: number;
  end?: string;
};

export type TimerType =
  | "Germany Tier 1"
  | "Germany Tier 2"
  | "Germany Advanced Tier 1"
  | "Germany Advanced Tier 2"
  | "Germany Manual Standart"
  | "Germany Extensive";

export type TimerSubtype =
  | "SAR Investigation"
  | "SAR No Investigation"
  | "XSAR Investigation"
  | "XSAR No Investigation"
  | "Agent Referral"
  | "Internal Referral"
  | "Manual XReport"
  | "Significant STR";
