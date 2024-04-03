import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req });

  const isAuthenticated = !!token;

  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");

  if (isAuthPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return null;
  }

  return await withAuth(req, {
    pages: {
      signIn: "/login",
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
