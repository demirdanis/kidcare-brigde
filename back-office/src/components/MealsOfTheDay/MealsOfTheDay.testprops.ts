import { IMealData, IMealsOfTheDay } from "./MealsOfTheDay.types";

export const mealsOfTheDayTestProps: IMealsOfTheDay = {
  id: "monday",
  dayName: "Pazartesi",
  date: "15 Ocak",
  meals: [
    {
      id: "breakfast-monday",
      name: "Kahvaltı",
      time: "08:00",
      icon: "🌅",
      selectedFoods: ["Peynir", "Zeytin"],
      isExpanded: false,
    },
    {
      id: "lunch-monday",
      name: "Öğle",
      time: "12:00",
      icon: "🍽️",
      selectedFoods: [],
      isExpanded: false,
    },
    {
      id: "snack-monday",
      name: "İkindi",
      time: "15:30",
      icon: "🍪",
      selectedFoods: ["Meyve"],
      isExpanded: false,
    },
  ],
  suggestions: [
    "Peynir",
    "Zeytin",
    "Yumurta",
    "Süt",
    "Bal",
    "Reçel",
    "Meyve",
    "Bisküvi",
  ],
  isExpanded: false,
};

export const mealsOfTheDayEmptySelected: IMealData[] = [
  {
    id: "breakfast-monday",
    name: "Kahvaltı",
    time: "08:00",
    icon: "🌅",
    selectedFoods: [],
    isExpanded: false,
  },
  {
    id: "lunch-monday",
    name: "Öğle",
    time: "12:00",
    icon: "🍽️",
    selectedFoods: [],
    isExpanded: false,
  },
  {
    id: "snack-monday",
    name: "İkindi",
    time: "15:30",
    icon: "🍪",
    selectedFoods: [],
    isExpanded: false,
  },
];
