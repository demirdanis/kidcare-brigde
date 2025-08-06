import { CardBase } from "../CardBase/CardBase";
import { IMealsOfTheDay } from "./MealsOfTheDay.types";
import { MealCard } from "../MealCard/MealCard";

export const MealsOfTheDay = ({
  id,
  dayName,
  date,
  meals,
  suggestions,
  isExpanded = false,
  onToggleDay,
  onToggleMeal,
  onAddFood,
  onRemoveFood,
  onSearch,
}: IMealsOfTheDay) => {
  const handleToggleDay = () => {
    onToggleDay?.(id);
  };

  const handleToggleMeal = (mealId: string) => {
    onToggleMeal?.(id, mealId);
  };

  const handleAddFood = (
    mealId: string,
    food: string,
    isSuggestion?: boolean
  ) => {
    onAddFood?.(id, mealId, food, isSuggestion);
  };

  const handleRemoveFood = (mealId: string, food: string) => {
    onRemoveFood?.(id, mealId, food);
  };

  const handleSearch = (mealId: string, query: string) => {
    onSearch?.(id, mealId, query);
  };

  const totalFoodCount = meals.reduce(
    (total, meal) => total + meal.selectedFoods.length,
    0
  );

  const getStatusIcon = () => {
    if (
      meals.length > 0 &&
      meals.every((meal) => meal?.selectedFoods?.length > 0)
    ) {
      return <span className="text-2xl mr-3">✅</span>;
    }

    if (
      meals.length === 0 ||
      meals.every((meal) => meal?.selectedFoods?.length === 0)
    ) {
      return <span className="text-2xl mr-3">📄</span>;
    }

    return <span className="text-2xl mr-3">✏️</span>;
  };

  return (
    <CardBase className="transition-all duration-300 ">
      {/* Day Header */}
      <div className="p-4 hover:bg-gray-50 hover:rounded-lg">
        <button
          onClick={handleToggleDay}
          className="w-full flex items-center justify-between rounded-lg p-2 -m-2 transition-colors duration-200"
        >
          <div className="flex items-center">
            <span className="text-2xl mr-3"> {getStatusIcon()}</span>
            <div className="text-left">
              <div className="font-semibold text-gray-900">
                {dayName}, {date}
              </div>
              <div className="text-sm text-gray-500">
                {totalFoodCount > 0
                  ? `${totalFoodCount} yemek planlandı`
                  : "Henüz yemek planı yok"}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-blue-600 mr-2">
              {meals.length} öğün
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
      </div>

      {/* Day Content */}

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {meals.map((meal, index) => (
          <div key={meal.id} className="p-0">
            <MealCard
              id={meal.id}
              name={meal.name}
              time={meal.time}
              icon={meal.icon}
              selectedFoods={meal.selectedFoods}
              suggestions={suggestions}
              isExpanded={meal.isExpanded}
              className={index === meals.length - 1 ? "rounded-b-xl" : ""}
              onToggle={handleToggleMeal}
              onAddFood={handleAddFood}
              onRemoveFood={handleRemoveFood}
              onSearch={handleSearch}
            />
          </div>
        ))}
      </div>
    </CardBase>
  );
};
