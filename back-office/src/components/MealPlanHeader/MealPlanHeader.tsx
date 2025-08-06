import { IMealPlanHeader } from "./MealPlanHeader.types";

export const MealPlanHeader = ({
  planType,
  currentDate,
  onPlanTypeChange,
  onDateChange,
  onSave,
}: IMealPlanHeader) => {
  const getWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Pazartesi başlangıç
    startOfWeek.setDate(diff);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return { start: startOfWeek, end: endOfWeek };
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
    });
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("tr-TR", {
      month: "long",
      year: "numeric",
    });
  };

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (planType === "weekly") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    onDateChange?.(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (planType === "weekly") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    onDateChange?.(newDate);
  };

  const getDisplayText = () => {
    if (planType === "weekly") {
      const { start, end } = getWeekRange(currentDate);
      return `${formatDate(start)} - ${formatDate(end)}`;
    } else {
      return formatMonth(currentDate);
    }
  };

  return (
    <div className="bg-card shadow-sm border-b border-border">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button className="p-2 -ml-2 text-primary hover:bg-primary hover:text-white reground rounded-lg transition-colors duration-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-primary ml-2">
              Yemek Planı
            </h1>
          </div>
          <button
            onClick={onSave}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors duration-200 shadow-sm"
          >
            Kaydet
          </button>
        </div>
      </div>

      {/* Period Selection & Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-4 bg-card border-b border-border">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => onPlanTypeChange?.("weekly")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 border ${
              planType === "weekly"
                ? "border-primary text-primary shadow-sm"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            Haftalık
          </button>
          <button
            onClick={() => onPlanTypeChange?.("monthly")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 border ${
              planType === "monthly"
                ? "border-primary text-primary shadow-sm"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            Aylık
          </button>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-between bg-primary-lightrounded-lg p-3">
          <button
            onClick={handlePrevious}
            className="p-2 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <span className="font-medium text-center flex-1">
            {getDisplayText()}
          </span>

          <button
            onClick={handleNext}
            className="p-2 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
