import { IClassCard } from "@/components/ClassCard/ClassCard.types";
import { TeacherClassDto } from "kidcare-bridge-shared";

export const teacherClassesMapper = (
  data?: TeacherClassDto[]
): IClassCard[] => {
  return (
    data?.map((m) => {
      return {
        id: m.id,
        name: m.name,
        img: m.img_url,
      };
    }) ?? []
  );
};
