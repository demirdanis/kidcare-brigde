import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {};
  return (
    <div
      className="min-h-screen relative overflow-hidden bg-soft-gradient"
      style={{
        backgroundImage: "url('/back.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-background/60 backdrop-blur-[1px]"></div>

      {/* Kreş temalı dekoratif elementler */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full animate-pulse-soft"></div>
      <div className="absolute top-32 right-16 w-16 h-16 bg-accent/20 rounded-full animate-bounce-gentle"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-secondary/20 rounded-full animate-pulse-soft"></div>
      <div className="absolute bottom-40 right-10 w-12 h-12 bg-muted/40 rounded-full animate-bounce-gentle"></div>

      {/* Login formu */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <Card className="w-full max-w-md bg-white/20 backdrop-blur border border-white/20 shadow-xl">
          <CardHeader className="pb-2 px-6 flex items-center justify-center">
            <Image
              src="/logo_s.webp"
              alt="KidCare Bridge Logo"
              width={112}
              height={112}
              className="h-28 w-auto object-contain"
            />
          </CardHeader>

          <CardContent className="space-y-6 px-6 pb-6">
            {/* Email Input */}
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground/70 p-1"
              >
                Kullanıcı adı veya e-posta
              </Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="white-input border border-border/50 focus:border-primary/60 focus:ring-1 focus:ring-primary/10 rounded-xl h-12 text-base transition-all duration-300"
                placeholder="Kullanıcı adı veya e-posta girin..."
              />
            </div>

            {/* Password Input */}
            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground/70 p-1"
              >
                Şifre
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="white-input border border-border/50 focus:border-primary/60 focus:ring-1 focus:ring-primary/10 rounded-xl h-12 text-base pr-12 transition-all duration-300"
                  placeholder="Şifre girin..."
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1 h-10 w-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-all duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              onClick={handleSignIn}
              className="w-full h-12 btn-soft text-primary-foreground font-semibold text-base rounded-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              size="lg"
            >
              Giriş Yap
            </Button>

            {/* Forgot Password */}
            <div className="text-center pt-2">
              <Button
                variant="link"
                className="text-sm text-muted-foreground hover:text-primary p-0 h-auto font-medium transition-colors duration-200"
              >
                Şifremi unuttum
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
