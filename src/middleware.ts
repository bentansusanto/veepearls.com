import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session_veepearl")?.value;

  console.log("Session Cookie:", session); // Log cookie di terminal

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", '/add-cart', '/checkout', '/orders'] // Pastikan halaman yang dicek sudah benar
};