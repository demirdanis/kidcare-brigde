"use client";

import { Login } from "@/components/Login/Login";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { useLogin } from "./_services/login/login.service";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { action: login } = useLogin();

  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const response = await login({ variables: { email, password } });

    if (response?.data?.access_token) {
      router.refresh();
      return true;
    } else {
      return false;
    }
  };

  return (
    <PageContainer>
      <Login onLogin={handleLogin} />
    </PageContainer>
  );
}
