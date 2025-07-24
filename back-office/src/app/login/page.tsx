"use client";

import { Login } from "@/components/Login/Login";
import { useLogin } from "./_services/login/login.service";

export default function LoginPage() {
  const { action } = useLogin();
  const handleLogin = async (email: string, password: string) => {
    const response = await action({ variables: { email, password } });

    if (response?.data?.access_token) {
      return true;
    } else {
      return false;
    }
  };

  return <Login onLogin={handleLogin} />;
}
