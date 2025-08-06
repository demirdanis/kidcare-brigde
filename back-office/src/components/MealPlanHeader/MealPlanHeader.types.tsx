export type PlanType = "weekly" | "monthly";

export interface IMealPlanHeader {
  planType: PlanType;
  currentDate: Date;
  onPlanTypeChange?: (type: PlanType) => void;
  onDateChange?: (date: Date) => void;
  onSave?: () => void;
}
