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
  return new SignJWT({
    id: user.id,
    github_id: user.github_id,
    username: user.username,
    avatar_url: user.avatar_url,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const p = payload as Record<string, unknown>;
    if (
      typeof p.id === 'number' &&
      typeof p.github_id === 'number' &&
      typeof p.username === 'string' &&
      typeof p.avatar_url === 'string'
    ) {
      return { id: p.id, github_id: p.github_id, username: p.username, avatar_url: p.avatar_url };
    }
    return null;
  } catch {
    return null;
  }
}

export function parseCookies(cookieHeader = ''): Record<string, string> {
  const out: Record<string, string> = {};
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) {
      try {
        out[k] = decodeURIComponent(v);
      } catch {
        out[k] = v;
      }
    }
  }
  return out;
}

export function setCookie(name: string, value: string, maxAge: number): string {
  const encoded = encodeURIComponent(value);
  return `${name}=${encoded}; Max-Age=${maxAge}; HttpOnly; Secure; Path=/; SameSite=Lax`;
}

export async function getUserFromRequest(req: VercelRequest): Promise<AuthUser | null> {
  const cookieHeader = Array.isArray(req.headers.cookie)
    ? req.headers.cookie.join('; ')
    : req.headers.cookie ?? '';
  const cookies = parseCookies(cookieHeader);
  const token = cookies['auth_token'];
  if (!token) return null;
  return verifyToken(token);
}
