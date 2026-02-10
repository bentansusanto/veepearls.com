import { NextResponse, type NextRequest } from 'next/server'

function getApiUrl() {
  return process.env.NEXT_PUBLIC_NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL
}

export async function middleware(request: NextRequest) {
  const protectedPaths = ['/add-cart', '/cart', '/checkout', '/payment', '/orders']
  const { pathname } = request.nextUrl
  const isProtected = protectedPaths.some(p => pathname.startsWith(p))

  if (!isProtected) {
    return NextResponse.next()
  }

  const session = request.cookies.get('session_veepearl')?.value
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const baseUrl = getApiUrl()
  if (!baseUrl) {
    return NextResponse.next()
  }

  try {
    const res = await fetch(`${baseUrl}/auth/refresh_token`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        cookie: request.headers.get('cookie') || '',
      },
    })

    if (!res.ok) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('session_veepearl')
      return response
    }

    const data = await res.json()
    const accessToken = data?.accessToken
    if (accessToken) {
      const response = NextResponse.next()
      const expires = new Date(Date.now() + 60 * 60 * 1000)
      response.cookies.set('session_veepearl', accessToken, {
        path: '/',
        secure: true,
        sameSite: 'none',
        httpOnly: false,
        expires,
      })
      return response
    }

    return NextResponse.next()
  } catch {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('session_veepearl')
    return response
  }
}

export const config = {
  matcher: ['/add-cart', '/cart', '/checkout', '/payment', '/orders', '/profile'],
}
