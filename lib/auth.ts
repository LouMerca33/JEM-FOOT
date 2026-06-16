import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'jem_admin_token';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'lmercadier1@gmail.com';

function getSecret() {
  return new TextEncoder().encode(process.env.JWT_SECRET ?? 'fallback-dev-secret-change-me');
}

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ email: ADMIN_EMAIL, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.email === ADMIN_EMAIL && payload.role === 'admin';
  } catch {
    return false;
  }
}

export async function getAdminTokenFromCookies(): Promise<string | null> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value ?? null;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = await getAdminTokenFromCookies();
  if (!token) return false;
  return verifyAdminToken(token);
}

export { COOKIE_NAME };
