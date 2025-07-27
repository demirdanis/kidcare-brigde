import { AuthDto, AuthRequestDto } from "kidcare-bridge-shared";

import { toast } from "react-toastify";
import { useBaseService } from "@/services/baseService/baseService";

export const useLogout = () => {
  return useBaseService<AuthRequestDto, AuthDto>({
    path: "auth/logout",
    onAfterError: (errorMessage: string) => {
      toast.error(errorMessage);
    },
  });
};
