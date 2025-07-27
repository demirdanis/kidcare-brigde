import { IJwtPayload, TRole } from "kidcare-bridge-shared";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

function getValidUserRole(decodedToken: IJwtPayload): TRole | null {
  const isValidRole = (role: string): role is TRole =>
    (
      ["super_admin", "school_manager", "teacher", "student_parent"] as const
    ).includes(role as TRole);

  const validRole =
    decodedToken["https://hasura.io/jwt/claims"]["x-hasura-allowed-roles"].find(
      isValidRole
    ) || null;

  return validRole;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;

  if (pathname === "/login" && !token) return NextResponse.next();

  if (!token) return redirectToLogin(request);

  const decodedToken: IJwtPayload =
    (jwt.decode(token as string) as IJwtPayload) || null;

  if (!decodedToken) return redirectToLogin(request);

  const validUserRole = getValidUserRole(decodedToken);

  if (pathname === "/login")
    return redirectToLoginedUserDashboard(validUserRole, request);

  if (needToRedirectToLogin(validUserRole, decodedToken)) {
    return redirectToLogin(request);
  }

  if (pathname.startsWith("/classes") && validUserRole !== "teacher") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/admin") && validUserRole !== "super_admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

const redirectToLoginedUserDashboard = (
  userRole: TRole | null,
  request: NextRequest
) => {
  const baseUrl = new URL(request.url).origin; // http://localhost:3111 gibi

  switch (userRole) {
    case "super_admin":
      return NextResponse.redirect(new URL("/admin", baseUrl));
    case "school_manager":
      return NextResponse.redirect(new URL("/school-manager", baseUrl));
    case "teacher":
      return NextResponse.redirect(new URL("/teacher", baseUrl));
    case "student_parent":
      return NextResponse.redirect(new URL("/student-parent", baseUrl));
    default:
      return NextResponse.redirect(new URL("/login", baseUrl));
  }
};

const needToRedirectToLogin = (
  validUserRole: TRole | null,
  decodedToken: IJwtPayload
) => {
  if (!validUserRole) {
    return true;
  }
  const isExpired = isTokenExpired(decodedToken);
  if (isExpired) return true;

  return false;
};

const isTokenExpired = (decodedToken: IJwtPayload): boolean => {
  if (!decodedToken.exp) {
    return true; // exp yoksa expired kabul et
  }

  const expirationDate = new Date(decodedToken.exp * 1000); // Unix timestamp * 1000
  const now = Date.now();
  return expirationDate.getTime() <= now;
};

const redirectToLogin = (request: NextRequest) => {
  return NextResponse.redirect(new URL("/login", request.url));
};

export const config = {
  matcher: [
    "/",
    "/login",
    "/admin/:path*",
    "/school-manager/:path*",
    "/student-parent/:path*",
    "/teacher/:path*",
    "/unauthorized",
  ],
};
