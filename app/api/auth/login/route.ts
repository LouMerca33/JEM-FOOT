import { NextRequest, NextResponse } from 'next/server';
import { signAdminToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const validEmail = process.env.ADMIN_EMAIL ?? 'lmercadier1@gmail.com';
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validPassword) {
    return NextResponse.json({ error: 'Auth non configurée' }, { status: 500 });
  }

  if (email !== validEmail || password !== validPassword) {
    // Délai constant pour éviter le timing attack
    await new Promise((r) => setTimeout(r, 300));
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
  }

  const token = await signAdminToken();

  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    path: '/',
  });

  return response;
}
