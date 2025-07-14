import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Kullanıcı rollerini tanımlayın
type UserRole = "teacher" | "admin" | "parent";

// Token'dan kullanıcı rolünü çıkaran fonksiyon
function getUserRole(request: NextRequest): UserRole | null {
  console.log({ request });
  return "teacher";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Giriş yapılmamışsa login sayfasına yönlendir
  const userRole = getUserRole(request);
  console.log(userRole);
  console.log(pathname);

  if (!userRole) {
    // Login sayfasındaysak yönlendirme yapma
    if (pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Ana sayfa (/) ziyaret ediliyorsa role göre yönlendir
  if (pathname === "/") {
    switch (userRole) {
      case "teacher":
        return NextResponse.redirect(new URL("/classes", request.url));
      case "admin":
        return NextResponse.redirect(new URL("/home", request.url));
      case "parent":
        return NextResponse.redirect(new URL("/home", request.url));
      default:
        return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Sayfa erişim kontrolü
  if (pathname.startsWith("/classes") && userRole !== "teacher") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Şu yolları hariç tut:
     * - api (API rotaları)
     * - _next/static (static dosyalar)
     * - _next/image (image optimization dosyaları)
     * - favicon.ico (favicon dosyası)
     * - public klasöründeki dosyalar
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
