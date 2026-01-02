import { NextResponse } from "next/server"

export function middleware(request) {
  const session = request.cookies.get("session")
  const orgSession = request.cookies.get("org-session")
  const { pathname } = request.nextUrl

  console.log(`[v0] Middleware processing: ${pathname}`)

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-pathname", pathname)

  // to avoid matching admin routes like "/organizations"
  const isOrgPortalRoute = pathname === "/org" || pathname.startsWith("/org/")

  if (isOrgPortalRoute) {
    const isOrgLoginPage = pathname === "/org/login"

    // If no org session and trying to access protected org route
    if (!orgSession && !isOrgLoginPage) {
      console.log("[v0] No org session, redirecting to org login")
      return NextResponse.redirect(new URL("/org/login", request.url))
    }

    // If has org session and trying to access org login page
    if (orgSession && isOrgLoginPage) {
      return NextResponse.redirect(new URL("/org/dashboard", request.url))
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // Handle admin routes
  const publicRoutes = ["/", "/login", "/portal"]
  const isPublicRoute = publicRoutes.includes(pathname)

  // If no session and trying to access protected route (excluding API and static files)
  if (!session && !isPublicRoute && !pathname.startsWith("/api") && !pathname.startsWith("/_next")) {
    console.log("[v0] No admin session, redirecting to admin login")
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If has session and trying to access login page
  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
