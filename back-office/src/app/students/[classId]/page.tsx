"use client";

import { useParams, useRouter } from "next/navigation";

import { mockDataService } from "@/services/mockDataService";

export default function StudentsPage() {
  const router = useRouter();
  const params = useParams();
  const classId = parseInt(params.classId as string);

  const selectedClass = mockDataService.classes.find((c) => c.id === classId);
  const students = mockDataService.students[classId] || [];

  const handleStudentClick = (studentId: number) => {
    router.push(`/student/${studentId}`);
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="p-6 relative z-10">
      {/* Header with back button */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <button
            onClick={handleBackClick}
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors mr-4"
            style={{
              fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
              fontWeight: "600",
            }}
          >
            ← Geri
          </button>
          <h2
            className="text-2xl font-bold text-gray-800"
            style={{
              fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
              fontWeight: "700",
              letterSpacing: "0.3px",
            }}
          >
            {selectedClass?.name} Öğrencileri
          </h2>
        </div>

        <div className="text-center">
          <p
            className="text-gray-600 text-lg"
            style={{
              fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
              fontWeight: "500",
            }}
          >
            {students.length} sevimli öğrenci 🌟
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            onClick={() => handleStudentClick(student.id)}
            className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-purple-100 relative"
          >
            {/* Student Age Badge */}
            <div className="absolute top-3 right-3 bg-purple-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
              {student.age} yaş
            </div>

            {/* Student Photo */}
            <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 p-4">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  src={`https://avatar.iran.liara.run/public/boy?username=${student.name}`}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Student Info */}
            <div className="p-4 text-center">
              <h3
                className="font-bold text-gray-800 text-lg mb-1"
                style={{
                  fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
                  fontWeight: "600",
                  letterSpacing: "0.2px",
                }}
              >
                {student.name}
              </h3>
              <p
                className="text-gray-500 text-sm"
                style={{
                  fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
                  fontWeight: "400",
                }}
              >
                Veli: {student.parentName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
