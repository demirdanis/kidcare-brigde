"use client";

import { Suspense } from "react";
import { TeacherClasses } from "./classes/(page)";

const TeacherClassesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TeacherClasses />
    </Suspense>
  );
};

export default TeacherClassesPage;
