import { SignJWT, jwtVerify } from 'jose';
import type { VercelRequest } from '@vercel/node';

export interface AuthUser {
  id: number;
  github_id: number;
  username: string;
  avatar_url: string;
}

function getSecret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error('JWT_SECRET not set');
  return new TextEncoder().encode(s);
}

export async function signToken(user: AuthUser): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as AuthUser;
  } catch {
    return null;
  }
}

export function parseCookies(cookieHeader = ''): Record<string, string> {
  const out: Record<string, string> = {};
  cookieHeader.split(';').forEach((part) => {
    const [k, ...v] = part.trim().split('=');
    if (k) out[k.trim()] = decodeURIComponent(v.join('='));
  });
  return out;
}

export function setCookie(
  name: string,
  value: string,
  maxAge: number,
): string {
  return `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; HttpOnly; Secure; Path=/; SameSite=Lax`;
}

export async function getUserFromRequest(req: VercelRequest): Promise<AuthUser | null> {
  const cookies = parseCookies(req.headers.cookie ?? '');
  const token = cookies['auth_token'];
  if (!token) return null;
  return verifyToken(token);
}
