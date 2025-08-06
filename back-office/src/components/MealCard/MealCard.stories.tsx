import { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { MealCard } from "./MealCard";

import { mealCardTestProps } from "./MealCard.testprops";
import { PageContainer } from "../PageContainer/PageContainer";
import { IMealCard } from "./MealCard.types";

const meta = {
  title: "Molecules/MealCard",
  component: MealCard,
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
} satisfies Meta<typeof MealCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const MealCardParent = (args: IMealCard) => {
  const [mealState, setMealState] = useState({
    selectedFoods: [] as string[],
    isExpanded: false,
    suggestions: [
      "Peynir",
      "Zeytin",
      "Yumurta",
      "Süt",
      "Bal",
      "Reçel",
      "Ekmek",
      "Tereyağı",
      "Domates",
      "Salatalık",
    ],
  });

  const handleToggle = (id: string) => {
    console.log("🔄 Toggle meal:", id);
    setMealState((prev) => ({
      ...prev,
      isExpanded: !prev.isExpanded,
    }));
  };

  const handleAddFood = (
    mealId: string,
    food: string,
    isSuggestion?: boolean
  ) => {
    console.log(
      "➕ Add food:",
      food,
      "to meal:",
      mealId,
      "as suggestion:",
      isSuggestion
    );

    setMealState((prev) => {
      const newState = {
        ...prev,
        selectedFoods: prev.selectedFoods.includes(food)
          ? prev.selectedFoods
          : [...prev.selectedFoods, food],
      };

      // Eğer sık kullanılanlara eklenmesi isteniyorsa
      if (isSuggestion && !prev.suggestions.includes(food)) {
        newState.suggestions = [...prev.suggestions, food];
        console.log("🌟 Added to suggestions:", food);
      }

      return newState;
    });
  };

  const handleRemoveFood = (mealId: string, food: string) => {
    console.log("➖ Remove food:", food, "from meal:", mealId);
    setMealState((prev) => ({
      ...prev,
      selectedFoods: prev.selectedFoods.filter((f) => f !== food),
    }));
  };

  const handleSearch = (mealId: string, query: string) => {
    console.log("🔍 Search:", query, "in meal:", mealId);
  };

  return (
    <MealCard
      {...args}
      selectedFoods={mealState.selectedFoods}
      suggestions={mealState.suggestions}
      isExpanded={mealState.isExpanded}
      onToggle={handleToggle}
      onAddFood={handleAddFood}
      onRemoveFood={handleRemoveFood}
      onSearch={handleSearch}
    />
  );
};

export const Primary: Story = {
  args: { ...mealCardTestProps },
  render: (args) => <MealCardParent {...args} />,
};
