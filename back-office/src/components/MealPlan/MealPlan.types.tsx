import { IMealData } from "../MealsOfTheDay/MealsOfTheDay.types";

export interface IDayData {
  id: string;
  dayName: string;
  date: string;
  meals: IMealData[];
  isExpanded: boolean;
}

export interface IMealPlan {
  days: IDayData[];
  suggestions: string[];
  onToggleDay?: (dayId: string) => void;
  onToggleMeal?: (dayId: string, mealId: string) => void;
  onAddFood?: (
    dayId: string,
    mealId: string,
    food: string,
    isSuggestion?: boolean
  ) => void;
  onRemoveFood?: (dayId: string, mealId: string, food: string) => void;
  onSearch?: (dayId: string, mealId: string, query: string) => void;
  onSave?: () => void;
}
