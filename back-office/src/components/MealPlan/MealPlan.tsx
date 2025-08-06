import { IDayData, IMealPlan } from "./MealPlan.types";

import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";
import { MealPlanHeader } from "../MealPlanHeader/MealPlanHeader";
import { MealsOfTheDay } from "../MealsOfTheDay/MealsOfTheDay";
import { PlanType } from "../MealPlanHeader/MealPlanHeader.types";
import { useState } from "react";

export const MealPlan = ({
  days,
  suggestions,
  onToggleDay,
  onToggleMeal,
  onAddFood,
  onRemoveFood,
  onSearch,
  onSave,
}: IMealPlan) => {
  const [planType, setPlanType] = useState<PlanType>("weekly");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDays, setCurrentDays] = useState(() =>
    days.length > 0 ? days : generateWeekDays(currentDate)
  );

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  // Veri girişi kontrolü - herhangi bir günde herhangi bir öğünde yemek var mı?
  const hasDataInput = () => {
    return currentDays.some((day) =>
      day.meals.some((meal) => meal.selectedFoods.length > 0)
    );
  };

  // Hafta için günleri oluştur
  const generateWeekDays = (date: Date): IDayData[] => {
    const days: IDayData[] = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    const dayNames = [
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
      "Pazar",
    ];

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);

      days.push({
        id: `day-${currentDay.getTime()}`,
        dayName: dayNames[i],
        date: currentDay.toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "long",
        }),
        meals: [
          {
            id: `breakfast-${currentDay.getTime()}`,
            name: "Kahvaltı",
            time: "08:00",
            icon: "🌅",
            selectedFoods: [],
            isExpanded: false,
          },
          {
            id: `lunch-${currentDay.getTime()}`,
            name: "Öğle",
            time: "12:00",
            icon: "🍽️",
            selectedFoods: [],
            isExpanded: false,
          },
          {
            id: `snack-${currentDay.getTime()}`,
            name: "İkindi",
            time: "15:30",
            icon: "🍪",
            selectedFoods: [],
            isExpanded: false,
          },
        ],
        isExpanded: false,
      });
    }

    return days;
  };

  // Ay için günleri oluştur
  const generateMonthDays = (date: Date): IDayData[] => {
    const days: IDayData[] = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dayNames = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ];

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDay = new Date(year, month, i);
      const dayName = dayNames[currentDay.getDay()];

      days.push({
        id: `day-${currentDay.getTime()}`,
        dayName: dayName,
        date: currentDay.toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "long",
        }),
        meals: [
          {
            id: `breakfast-${currentDay.getTime()}`,
            name: "Kahvaltı",
            time: "08:00",
            icon: "🌅",
            selectedFoods: [],
            isExpanded: false,
          },
          {
            id: `lunch-${currentDay.getTime()}`,
            name: "Öğle",
            time: "12:00",
            icon: "🍽️",
            selectedFoods: [],
            isExpanded: false,
          },
          {
            id: `snack-${currentDay.getTime()}`,
            name: "İkindi",
            time: "15:30",
            icon: "🍪",
            selectedFoods: [],
            isExpanded: false,
          },
        ],
        isExpanded: false,
      });
    }

    return days;
  };

  // Modal'ı aç
  const showConfirmationModal = (
    title: string,
    message: string,
    onConfirm: () => void
  ) => {
    setModal({
      isOpen: true,
      title,
      message,
      onConfirm,
    });
  };

  // Modal'ı kapat
  const closeModal = () => {
    setModal({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: () => {},
    });
  };

  // Plan tipini değiştir
  const changePlanType = (type: PlanType) => {
    const newDays =
      type === "weekly"
        ? generateWeekDays(currentDate)
        : generateMonthDays(currentDate);

    console.log("📅 Plan type changed:", type);
    setPlanType(type);
    setCurrentDays(newDays);
  };

  // Tarihi değiştir ve günleri yenile
  const changeDate = (date: Date) => {
    const newDays =
      planType === "weekly" ? generateWeekDays(date) : generateMonthDays(date);

    console.log("📆 Date changed:", date);
    setCurrentDate(date);
    setCurrentDays(newDays);
  };

  const handlePlanTypeChange = (type: PlanType) => {
    if (hasDataInput()) {
      showConfirmationModal(
        "Plan Tipini Değiştir",
        "Girilen verileriniz var ve kaybolacaktır. Devam etmek istiyor musunuz?",
        () => {
          changePlanType(type);
          closeModal();
        }
      );
    } else {
      changePlanType(type);
    }
  };

  const handleDateChange = (date: Date) => {
    if (hasDataInput()) {
      const periodText = planType === "weekly" ? "hafta" : "ay";
      showConfirmationModal(
        `${periodText.charAt(0).toUpperCase() + periodText.slice(1)} Değiştir`,
        `Girilen verileriniz var ve kaybolacaktır. Başka ${periodText}ya geçmek istiyor musunuz?`,
        () => {
          changeDate(date);
          closeModal();
        }
      );
    } else {
      changeDate(date);
    }
  };

  const handleSave = () => {
    console.log("💾 Save meal plan");
    onSave?.();
  };

  const handleToggleDay = (dayId: string) => {
    onToggleDay?.(dayId);
    setCurrentDays((prev) =>
      prev.map((day) =>
        day.id === dayId ? { ...day, isExpanded: !day.isExpanded } : day
      )
    );
  };

  const handleToggleMeal = (dayId: string, mealId: string) => {
    onToggleMeal?.(dayId, mealId);
    setCurrentDays((prev) =>
      prev.map((day) =>
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
      )
    );
  };

  const handleAddFood = (
    dayId: string,
    mealId: string,
    food: string,
    isSuggestion?: boolean
  ) => {
    onAddFood?.(dayId, mealId, food, isSuggestion);
    setCurrentDays((prev) =>
      prev.map((day) =>
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
      )
    );
  };

  const handleRemoveFood = (dayId: string, mealId: string, food: string) => {
    onRemoveFood?.(dayId, mealId, food);
    setCurrentDays((prev) =>
      prev.map((day) =>
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
      )
    );
  };

  const handleSearch = (dayId: string, mealId: string, query: string) => {
    onSearch?.(dayId, mealId, query);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <MealPlanHeader
        planType={planType}
        currentDate={currentDate}
        onPlanTypeChange={handlePlanTypeChange}
        onDateChange={handleDateChange}
        onSave={handleSave}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="space-y-3 p-4">
          {currentDays.map((day) => (
            <MealsOfTheDay
              key={day.id}
              id={day.id}
              dayName={day.dayName}
              date={day.date}
              meals={day.meals}
              suggestions={suggestions}
              isExpanded={day.isExpanded}
              onToggleDay={handleToggleDay}
              onToggleMeal={handleToggleMeal}
              onAddFood={handleAddFood}
              onRemoveFood={handleRemoveFood}
              onSearch={handleSearch}
            />
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
        onCancel={closeModal}
      />
    </div>
  );
};
