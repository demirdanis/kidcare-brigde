"use client";

import "./globals.css";

// import type { Metadata } from "next";
import MobileLayout from "./_mobileLayout";
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
      <body className={`${comfortaa.variable} antialiased`}>
        {isLoginPage ? children : <MobileLayout>{children}</MobileLayout>}
      </body>
    </html>
  );
}
