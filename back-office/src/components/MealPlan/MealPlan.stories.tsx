import { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { MealPlan } from "./MealPlan";
import { mealPlanContainerTestProps } from "./MealPlan.testprops";
import { IMealPlan } from "./MealPlan.types";

const meta = {
  title: "Organisms/MealPlan",
  component: MealPlan,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof MealPlan>;

export default meta;
type Story = StoryObj<typeof meta>;

const MealPlanParent = (args: IMealPlan) => {
  const [planState, setPlanState] = useState({
    days: args.days,
    suggestions: args.suggestions,
  });

  const handleToggleDay = (dayId: string) => {
    console.log("🔄 Toggle day:", dayId);
    setPlanState((prev) => ({
      ...prev,
      days: prev.days.map((day) =>
        day.id === dayId ? { ...day, isExpanded: !day.isExpanded } : day
      ),
    }));
  };

  const handleToggleMeal = (dayId: string, mealId: string) => {
    console.log("🔄 Toggle meal:", mealId, "in day:", dayId);
    setPlanState((prev) => ({
      ...prev,
      days: prev.days.map((day) =>
        day.id === dayId
          ? {
              ...day,
              meals: day.meals.map((meal) =>
                meal.id === mealId
                  ? { ...meal, isExpanded: !meal.isExpanded }
                  : meal
              ),
            }
          : day
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

    setPlanState((prev) => {
      const newState = {
        ...prev,
        days: prev.days.map((day) =>
          day.id === dayId
            ? {
                ...day,
                meals: day.meals.map((meal) =>
                  meal.id === mealId
                    ? {
                        ...meal,
                        selectedFoods: meal.selectedFoods.includes(food)
                          ? meal.selectedFoods
                          : [...meal.selectedFoods, food],
                      }
                    : meal
                ),
              }
            : day
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
    setPlanState((prev) => ({
      ...prev,
      days: prev.days.map((day) =>
        day.id === dayId
          ? {
              ...day,
              meals: day.meals.map((meal) =>
                meal.id === mealId
                  ? {
                      ...meal,
                      selectedFoods: meal.selectedFoods.filter(
                        (f) => f !== food
                      ),
                    }
                  : meal
              ),
            }
          : day
      ),
    }));
  };

  const handleSearch = (dayId: string, mealId: string, query: string) => {
    console.log("🔍 Search:", query, "in meal:", mealId, "in day:", dayId);
  };

  const handleSave = () => {
    console.log("💾 Saving meal plan...", planState);
    // Simulate save success
    setTimeout(() => {
      console.log("✅ Meal plan saved successfully!");
    }, 1000);
  };

  return (
    <MealPlan
      days={planState.days}
      suggestions={planState.suggestions}
      onToggleDay={handleToggleDay}
      onToggleMeal={handleToggleMeal}
      onAddFood={handleAddFood}
      onRemoveFood={handleRemoveFood}
      onSearch={handleSearch}
      onSave={handleSave}
    />
  );
};

export const Primary: Story = {
  args: { ...mealPlanContainerTestProps },
  render: (args) => <MealPlanParent {...args} />,
};
