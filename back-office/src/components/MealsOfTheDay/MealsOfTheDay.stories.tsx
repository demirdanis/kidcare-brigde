import { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { MealsOfTheDay } from "./MealsOfTheDay";
import { mealsOfTheDayTestProps } from "./MealsOfTheDay.testprops";
import { PageContainer } from "../PageContainer/PageContainer";
import { IMealsOfTheDay } from "./MealsOfTheDay.types";

const meta = {
  title: "Molecules/MealsOfTheDay",
  component: MealsOfTheDay,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
  args: {},
  decorators: [
    (Story) => (
      <PageContainer className="p-5">
        <Story />
      </PageContainer>
    ),
  ],
} satisfies Meta<typeof MealsOfTheDay>;

export default meta;
type Story = StoryObj<typeof meta>;

const MealsOfTheDayParent = (args: IMealsOfTheDay) => {
  const [dayState, setDayState] = useState({
    isExpanded: false,
    meals: args.meals,
    suggestions: [
      "Peynir",
      "Zeytin",
      "Yumurta",
      "Süt",
      "Bal",
      "Reçel",
      "Ekmek",
      "Tereyağı",
      "Meyve",
      "Bisküvi",
      "Mercimek Çorbası",
      "Pilav",
    ],
  });

  const handleToggleDay = (dayId: string) => {
    console.log("🔄 Toggle day:", dayId);
    setDayState((prev) => ({
      ...prev,
      isExpanded: !prev.isExpanded,
    }));
  };

  const handleToggleMeal = (dayId: string, mealId: string) => {
    console.log("🔄 Toggle meal:", mealId, "in day:", dayId);
    setDayState((prev) => ({
      ...prev,
      meals: prev.meals.map((meal) =>
        meal.id === mealId ? { ...meal, isExpanded: !meal.isExpanded } : meal
      ),
    }));
  };

  const handleAddFood = (
    dayId: string,
    mealId: string,
    food: string,
    isSuggestion?: boolean
  ) => {
    console.log(
      "➕ Add food:",
      food,
      "to meal:",
      mealId,
      "in day:",
      dayId,
      "as suggestion:",
      isSuggestion
    );

    setDayState((prev) => {
      const newState = {
        ...prev,
        meals: prev.meals.map((meal) =>
          meal.id === mealId
            ? {
                ...meal,
                selectedFoods: meal.selectedFoods.includes(food)
                  ? meal.selectedFoods
                  : [...meal.selectedFoods, food],
              }
            : meal
        ),
      };

      // Eğer sık kullanılanlara eklenmesi isteniyorsa
      if (isSuggestion && !prev.suggestions.includes(food)) {
        newState.suggestions = [...prev.suggestions, food];
        console.log("🌟 Added to suggestions:", food);
      }

      return newState;
    });
  };

  const handleRemoveFood = (dayId: string, mealId: string, food: string) => {
    console.log(
      "➖ Remove food:",
      food,
      "from meal:",
      mealId,
      "in day:",
      dayId
    );
    setDayState((prev) => ({
      ...prev,
      meals: prev.meals.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              selectedFoods: meal.selectedFoods.filter((f) => f !== food),
            }
          : meal
      ),
    }));
  };

  const handleSearch = (dayId: string, mealId: string, query: string) => {
    console.log("🔍 Search:", query, "in meal:", mealId, "in day:", dayId);
  };

  return (
    <MealsOfTheDay
      {...args}
      meals={dayState.meals}
      suggestions={dayState.suggestions}
      isExpanded={dayState.isExpanded}
      onToggleDay={handleToggleDay}
      onToggleMeal={handleToggleMeal}
      onAddFood={handleAddFood}
      onRemoveFood={handleRemoveFood}
      onSearch={handleSearch}
    />
  );
};

export const Primary: Story = {
  args: { ...mealsOfTheDayTestProps },
  render: (args) => <MealsOfTheDayParent {...args} />,
};
