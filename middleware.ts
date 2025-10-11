import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// 1. Specify protected and public routes
const protectedRoutes = ["", ""];
const publicRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value as string;
  let user: Record<string, string> = {};

  const refresh = async () => {
    try {
      const response = await fetch("https://api.openlibrary.app/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      });
      const data = await response.json();
      if (response.status == 200) {
        cookieStore.set("refreshToken", data.refreshToken);
        cookieStore.set("accessToken", data.accessToken);
        return Response.json(data, { status: 200 });
      }
    } catch (error) {
      console.error(`Error refreshing token: ${error}`);
    }
  };

  if (accessToken) {
    try {
      const response = await fetch("https://api.openlibrary.app/users/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      const status = response.status;
      switch (status) {
        case 200:
          user = data.data;
          break;
        case 401:
          await refresh();
          break;
      }
    } catch (error) {
      console.error(`Error verifying token: ${error}`);
    }
  }

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !user?.id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    user?.id &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
