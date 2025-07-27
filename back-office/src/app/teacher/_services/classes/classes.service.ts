import { TeacherClassDto } from "kidcare-bridge-shared";
import { toast } from "react-toastify";
import { useBaseService } from "@/services/baseService/baseService";

export const useGetClasses = () => {
  return useBaseService<null, TeacherClassDto[]>({
    path: "teacher/classes",
    method: "GET",
    onAfterError: (errorMessage: string) => {
      toast.error(errorMessage);
    },
  });
};
