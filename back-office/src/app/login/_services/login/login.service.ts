import { AuthDto, AuthRequestDto } from "kidcare-bridge-shared";

import { toast } from "react-toastify";
import { useBaseService } from "@/services/baseService/baseService";

export const useLogin = () => {
  return useBaseService<AuthRequestDto, AuthDto>({
    path: "auth/login",
    onAfterError: (errorMessage: string) => {
      toast.error(errorMessage);
    },
  });
};
