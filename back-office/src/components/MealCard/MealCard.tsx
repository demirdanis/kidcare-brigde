/* eslint-disable react/no-unescaped-entities */
import { IMealCard } from "./MealCard.types";
import { useState } from "react";

export const MealCard = ({
  id,
  name,
  time,
  icon,
  selectedFoods = [],
  suggestions = [],
  isExpanded = false,
  className,
  onToggle,
  onAddFood,
  onRemoveFood,
  onSearch,
}: IMealCard) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSuggestionChecked, setIsSuggestionChecked] = useState(false);

  const handleToggle = () => {
    onToggle?.(id);
  };

  const handleAddFood = (food: string, isSuggestion?: boolean) => {
    onAddFood?.(id, food, isSuggestion);
    setSearchQuery("");
    setShowDropdown(false);
    setIsSuggestionChecked(false);
  };

  const handleRemoveFood = (food: string) => {
    onRemoveFood?.(id, food);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(id, query);
    setShowDropdown(query.length > 0);
  };

  const filteredSuggestions = suggestions.filter(
    (food) =>
      food.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedFoods.includes(food)
  );

  const getMealTypeColor = () => {
    if (name.includes("Kahvaltı")) return "blue";
    if (name.includes("Öğle")) return "green";
    if (name.includes("İkindi")) return "orange";
    return "blue";
  };

  const colorClasses = {
    blue: {
      chip: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
      count: "text-blue-600",
    },
    green: {
      chip: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
      count: "text-green-600",
    },
    orange: {
      chip: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
      count: "text-orange-600",
    },
  };

  const colors = colorClasses[getMealTypeColor() as keyof typeof colorClasses];

  const hasNewFoodOption =
    searchQuery &&
    !filteredSuggestions.some(
      (food) => food.toLowerCase() === searchQuery.toLowerCase()
    ) &&
    !selectedFoods.some(
      (food) => food.toLowerCase() === searchQuery.toLowerCase()
    );

  return (
    <div
      className={`hover:bg-gray-50 border-t border-gray-200 ${className || ""}`}
    >
      {/* Header */}
      <div className="p-4">
        <button
          onClick={handleToggle}
          className="w-full flex items-center justify-between rounded-lg p-2 -m-2 transition-colors duration-200"
        >
          <div className="flex items-center">
            <span className="text-2xl mr-3">{icon}</span>
            <div className="text-left">
              <div className="font-medium text-gray-900">{name}</div>
              <div className="text-sm text-gray-500">{time}</div>
            </div>
          </div>
          <div className="flex items-center">
            <span className={`text-xs ${colors.count} mr-2`}>
              {selectedFoods.length} yemek
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

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 space-y-4">
          {/* Selected Foods */}
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">
              Seçilen Yemekler:
            </div>
            <div className="flex flex-wrap gap-2 min-h-[24px]">
              {selectedFoods.length > 0 ? (
                selectedFoods.map((food, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {food}
                    <button
                      onClick={() => handleRemoveFood(food)}
                      className="ml-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-sm">
                  Henüz yemek seçilmedi
                </div>
              )}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Yemek ara veya yeni ekle..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setShowDropdown(searchQuery.length > 0)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
            <div className="absolute right-3 top-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Search Dropdown */}
            {showDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="max-h-40 overflow-y-auto p-2">
                  {/* Existing suggestions */}
                  {filteredSuggestions.map((food, index) => (
                    <button
                      key={index}
                      onClick={() => handleAddFood(food)}
                      className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm transition-colors duration-200"
                    >
                      {food}
                    </button>
                  ))}

                  {/* New food option */}
                  {hasNewFoodOption && (
                    <div className="border-t border-gray-100 pt-2 mt-2">
                      <div className="p-2 bg-blue-50 rounded border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-blue-700 font-medium">
                            ➕ "{searchQuery}" yemek listesine ekle
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="flex items-center text-xs text-gray-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isSuggestionChecked}
                              onChange={(e) =>
                                setIsSuggestionChecked(e.target.checked)
                              }
                              className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            Sık kullanılanlar listesine de ekle
                          </label>
                          <button
                            onClick={() =>
                              handleAddFood(searchQuery, isSuggestionChecked)
                            }
                            className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors duration-200"
                          >
                            Ekle
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div>
            <div className="text-sm font-medium text-gray-700 mb-3">
              Sık Kullanılanlar:
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions
                .filter((food) => !selectedFoods.includes(food))
                .map((food, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddFood(food)}
                    className={`${colors.chip} px-3 py-2 rounded-full text-sm border transition-all duration-200 active:scale-95`}
                  >
                    {food}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
