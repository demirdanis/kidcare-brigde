export interface IMealCard {
  id: string;
  name: string;
  time: string;
  icon: string;
  selectedFoods?: string[];
  suggestions?: string[];
  isExpanded?: boolean;
  className?: string;
  onToggle?: (mealId: string) => void;
  onAddFood?: (mealId: string, food: string, isSuggestion?: boolean) => void;
  onRemoveFood?: (mealId: string, food: string) => void;
  onSearch?: (mealId: string, query: string) => void;
}
