import { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { MealPlanHeader } from "./MealPlanHeader";
import {
  mealPlanHeaderTestProps,
  mealPlanHeaderMonthlyTestProps,
} from "./MealPlanHeader.testprops";
import { IMealPlanHeader, PlanType } from "./MealPlanHeader.types";

const meta = {
  title: "Molecules/MealPlanHeader",
  component: MealPlanHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    planType: {
      control: { type: "radio" },
      options: ["weekly", "monthly"],
      description: "Plan türü seçimi",
    },
    currentDate: {
      control: { type: "date" },
      description: "Mevcut tarih",
    },
  },
  args: {},
} satisfies Meta<typeof MealPlanHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const MealPlanHeaderParent = (args: IMealPlanHeader) => {
  const [state, setState] = useState({
    planType: args.planType,
    currentDate: args.currentDate,
    isSaving: false,
  });

  const handlePlanTypeChange = (type: PlanType) => {
    console.log("📅 Plan type changing from", state.planType, "to", type);
    setState((prev) => ({
      ...prev,
      planType: type,
    }));
  };

  const handleDateChange = (date: Date) => {
    console.log("📆 Date changing from", state.currentDate, "to", date);
    setState((prev) => ({
      ...prev,
      currentDate: date,
    }));
  };

  const handleSave = () => {
    console.log("💾 Saving meal plan...");
    setState((prev) => ({
      ...prev,
      isSaving: true,
    }));

    // Simulate save process
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        isSaving: false,
      }));
      console.log("✅ Meal plan saved successfully!");
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <MealPlanHeader
        planType={state.planType}
        currentDate={state.currentDate}
        onPlanTypeChange={handlePlanTypeChange}
        onDateChange={handleDateChange}
        onSave={handleSave}
      />

      {/* Demo content to show the header in context */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Demo İçerik
          </h3>
          <div className="space-y-3">
            <p className="text-gray-600">
              <strong>Aktif Plan Türü:</strong>{" "}
              {state.planType === "weekly" ? "Haftalık" : "Aylık"}
            </p>
            <p className="text-gray-600">
              <strong>Seçili Tarih:</strong>{" "}
              {state.currentDate.toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-gray-600">
              <strong>Kayıt Durumu:</strong>{" "}
              {state.isSaving ? "Kaydediliyor..." : "Hazır"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WeeklyPlan: Story = {
  args: { ...mealPlanHeaderTestProps },
  render: (args) => <MealPlanHeaderParent {...args} />,
};

export const MonthlyPlan: Story = {
  args: { ...mealPlanHeaderMonthlyTestProps },
  render: (args) => <MealPlanHeaderParent {...args} />,
};

export const DifferentMonth: Story = {
  args: {
    ...mealPlanHeaderTestProps,
    planType: "monthly" as PlanType,
    currentDate: new Date(2025, 5, 15), // Haziran 2025
  },
  render: (args) => <MealPlanHeaderParent {...args} />,
};

export const PastDate: Story = {
  args: {
    ...mealPlanHeaderTestProps,
    currentDate: new Date(2024, 11, 25), // Aralık 2024
  },
  render: (args) => <MealPlanHeaderParent {...args} />,
};

export const FutureDate: Story = {
  args: {
    ...mealPlanHeaderTestProps,
    currentDate: new Date(2025, 6, 10), // Temmuz 2025
  },
  render: (args) => <MealPlanHeaderParent {...args} />,
};
