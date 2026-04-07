import { NextResponse, type NextRequest } from 'next/server'

function getApiUrl() {
  return process.env.NEXT_PUBLIC_NODE_ENV === 'development' || process.env.NODE_ENV === 'development'
    ? (process.env.NEXT_PUBLIC_API_URL_DEV || 'http://localhost:8082/api/v1')
    : process.env.NEXT_PUBLIC_API_URL
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const guestPaths = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-account']
  const protectedPaths = ['/add-cart', '/cart', '/checkout', '/payment', '/orders', '/profile']

  const isGuestPath = guestPaths.some(p => pathname.startsWith(p))
  const isProtectedPath = protectedPaths.some(p => pathname.startsWith(p))

  // The backend sets the session token in an HttpOnly cookie named "session_token"
  // In cross-site development (localhost vs orb.local), we use "token_mirror" set by the frontend.
  const sessionToken = request.cookies.get('session_token')?.value || request.cookies.get('token_mirror')?.value

  // CASE 1: Authenticated user attempting to access guest-only routes
  if (isGuestPath && sessionToken) {
    console.log(`Middleware: Authenticated user accessing guest route ${pathname}. Redirecting to /`)
    return NextResponse.redirect(new URL('/', request.url))
  }

  // CASE 2: No session token for protected routes
  if (isProtectedPath && !sessionToken) {
    console.log(`Middleware: Unauthorized access to ${pathname}. Redirecting to /login`)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // CASE 3: Validate session for protected routes
  if (isProtectedPath && sessionToken) {
    const baseUrl = getApiUrl()
    if (!baseUrl) return NextResponse.next()

    try {
      // Validate session via background refresh
      const res = await fetch(`${baseUrl}/auth/refresh_token`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ session_token: sessionToken }),
      })

      if (res.status === 401) {
        console.error('Middleware: Session invalid (401). Redirecting to /login')
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('session_token')
        return response
      }

      const responseData = await res.json()
      const userRole = responseData?.data?.role

      if (userRole && userRole !== 'customer') {
        console.warn(`Middleware: Role ${userRole} not permitted. Redirecting to /login`)
        return NextResponse.redirect(new URL('/login', request.url))
      }

      return NextResponse.next()
    } catch (error) {
      console.error('Middleware: Error during fetch to backend:', error)
      // On network error or other server errors (5xx), do not redirect to login.
      // Allow the client-side AuthRefreshHandler to attempt recovery or show error.
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (local images directory)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}
