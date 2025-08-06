export interface IMealData {
  id: string;
  name: string;
  time: string;
  icon: string;
  selectedFoods: string[];
  isExpanded: boolean;
}

export interface IMealsOfTheDay {
  id: string;
  dayName: string;
  date: string;
  meals: IMealData[];
  suggestions: string[];
  isExpanded?: boolean;
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
}
