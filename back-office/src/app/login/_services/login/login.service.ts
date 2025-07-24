import { AuthDto, AuthRequestDto } from "kidcare-bridge-shared";

import { useBaseService } from "@/services/baseService/baseService";

export const useLogin = () => {
  return useBaseService<AuthRequestDto, AuthDto>({
    path: "auth/login",
  });
};
