import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the session cookie
  const session = request.cookies.get('token')?.value;
  const isPublicPath = request.nextUrl.pathname === '/login';

  // If user is not authenticated and trying to access protected routes (including root path)
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is authenticated and trying to access login page
  if (session && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure middleware to run on these paths
export const config = {
  matcher: ['/', '/login', '/dashboard/:path*']
};