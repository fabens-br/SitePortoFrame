import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isAuthRoute = path === "/admin/login"
  const isAdminRoute = path.startsWith("/admin")
  const token = request.cookies.get("porto_frame_admin_token")?.value

  if (isAdminRoute && !isAuthRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
