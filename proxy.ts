import { jwtVerify } from 'jose';
import { NextResponse, type NextRequest } from 'next/server';

const COOKIE_NAME = 'jem_admin_token';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'lmercadier1@gmail.com';

function getSecret() {
  return new TextEncoder().encode(process.env.JWT_SECRET ?? 'fallback-dev-secret-change-me');
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.email === ADMIN_EMAIL && payload.role === 'admin';
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!(await isAuthenticated(request))) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (pathname === '/admin/login' && (await isAuthenticated(request))) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
