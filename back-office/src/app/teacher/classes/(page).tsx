"use client";

import { ClassCardList } from "@/components/ClassCardList/ClassCardList";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { teacherClassesMapper } from "../_services/classes/classes.mapper";
import { useEffect } from "react";
import { useGetClasses } from "../_services/classes/classes.service";
import { useRouter } from "next/navigation";

export function TeacherClasses() {
  const router = useRouter();

  const { action: getClasses, data: classesResponse } = useGetClasses();

  useEffect(() => {
    getClasses({});
  }, []);

  const handleClassClick = (classId: string) => {
    router.push(`/students/${classId}`);
  };

  return (
    <div className="p-6 relative z-10">
      <PageTitle>Sınıflarım</PageTitle>

      <ClassCardList
        classes={teacherClassesMapper(classesResponse?.data)}
        onClassClick={handleClassClick}
      />
    </div>
  );
}
