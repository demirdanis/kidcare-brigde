import { IMealPlanHeader } from "./MealPlanHeader.types";

export const mealPlanHeaderTestProps: IMealPlanHeader = {
  planType: "weekly",
  currentDate: new Date(2025, 0, 15), // 15 Ocak 2025
  onPlanTypeChange: (type) => {
    console.log("📅 Plan type changed to:", type);
  },
  onDateChange: (date) => {
    console.log("📆 Date changed to:", date);
  },
  onSave: () => {
    console.log("💾 Save button clicked");
  },
};

export const mealPlanHeaderMonthlyTestProps: IMealPlanHeader = {
  planType: "monthly",
  currentDate: new Date(2025, 0, 15), // Ocak 2025
  onPlanTypeChange: (type) => {
    console.log("📅 Plan type changed to:", type);
  },
  onDateChange: (date) => {
    console.log("📆 Date changed to:", date);
  },
  onSave: () => {
    console.log("💾 Save button clicked");
  },
};
