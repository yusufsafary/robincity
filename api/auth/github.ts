import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return res.status(500).send('GITHUB_CLIENT_ID not configured');
  }
  const rawRedirect = (req.query.redirect as string) || '/';
  const state = Buffer.from(rawRedirect).toString('base64url');
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: 'https://cityhood.fun/api/auth/callback',
    scope: 'read:user',
    state,
  });
  return res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
}
