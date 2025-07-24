"use client";

import "./globals.css";

// import type { Metadata } from "next";
import MobileLayout from "./_mobileLayout";
import { MultiApolloProvider } from "@/contexts/apollo-context";
import { PublicEnvScript } from "next-runtime-env";
import { comfortaa } from "@/lib/fonts";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <head>
        <PublicEnvScript />
      </head>
      <body className={`${comfortaa.variable} antialiased`}>
        <MultiApolloProvider>
          {isLoginPage ? children : <MobileLayout>{children}</MobileLayout>}
        </MultiApolloProvider>
      </body>
    </html>
  );
}
