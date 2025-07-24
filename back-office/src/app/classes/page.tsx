"use client";

import { mockDataService } from "@/services/mockDataService";
import { useRouter } from "next/navigation";

export default function Classes() {
  const router = useRouter();

  const handleClassClick = (classId: number) => {
    router.push(`/students/${classId}`);
  };

  return (
    <div className="p-6 relative z-10">
      <div className="mb-8 text-center">
        <h2
          className="text-3xl font-bold text-gray-800 mb-3"
          style={{
            fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
            fontWeight: "700",
            letterSpacing: "0.3px",
          }}
        >
          Sınıflarım
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {mockDataService.classes.map((classItem) => (
          <div
            key={classItem.id}
            onClick={() => handleClassClick(classItem.id)}
            className={`${classItem.color} rounded-3xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white relative`}
          >
            {/* Class Icon */}
            <div className="absolute top-3 right-3 text-3xl">
              {classItem.icon}
            </div>

            {/* Class Image */}
            <div className="relative">
              <img
                src={classItem.image}
                alt={classItem.name}
                className="w-full h-28 object-cover"
              />
            </div>

            {/* Class Info */}
            <div className="p-4 text-center">
              <h3
                className="font-bold text-gray-800 text-lg mb-1"
                style={{
                  fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
                  fontWeight: "600",
                  letterSpacing: "0.2px",
                }}
              >
                {classItem.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
