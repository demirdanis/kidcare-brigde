import { IMealCard } from "./MealCard.types";

export const mealCardTestProps: IMealCard = {
  id: "breakfast-monday",
  name: "Kahvaltı",
  time: "08:00",
  icon: "🌅",
  selectedFoods: [],
  suggestions: ["Peynir", "Zeytin", "Yumurta", "Süt", "Bal", "Reçel"],
  isExpanded: false,
  onToggle: (id: string) => {
    console.log("Toggle meal:", id);
  },
  onAddFood: (mealId: string, food: string) => {
    console.log("Add food:", food, "to meal:", mealId);
  },
  onRemoveFood: (mealId: string, food: string) => {
    console.log("Remove food:", food, "from meal:", mealId);
  },
  onSearch: (mealId: string, query: string) => {
    console.log("Search:", query, "in meal:", mealId);
  },
};
