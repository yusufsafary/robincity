import type { VercelRequest, VercelResponse } from '@vercel/node';
import { setCookie } from '../_lib/auth';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Set-Cookie', setCookie('auth_token', '', 0));
  return res.json({ ok: true });
}
