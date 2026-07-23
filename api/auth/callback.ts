import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, ensureTables } from '../_lib/db';
import { signToken, setCookie } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).send('Missing code');
  }

  const siteUrl = (process.env.SITE_URL ?? 'https://cityhood.fun').replace(/\/$/, '');

  try {
    // Exchange code for GitHub access token
    const tokenResp = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${siteUrl}/api/auth/callback`,
      }),
    });
    const tokenData = (await tokenResp.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    if (!tokenData.access_token) {
      return res
        .status(400)
        .send(tokenData.error_description ?? tokenData.error ?? 'Failed to get access token');
    }

    // Fetch GitHub user profile
    const userResp = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: 'application/vnd.github+json',
      },
    });
    const ghUser = (await userResp.json()) as {
      id: number;
      login: string;
      avatar_url: string;
    };

    // Upsert user in database
    const sql = getDb();
    await ensureTables(sql);

    const rows = await sql`
      INSERT INTO users (github_id, username, avatar_url)
      VALUES (${ghUser.id}, ${ghUser.login}, ${ghUser.avatar_url})
      ON CONFLICT (github_id) DO UPDATE
        SET username = EXCLUDED.username,
            avatar_url = EXCLUDED.avatar_url
      RETURNING id, github_id, username, avatar_url
    `;
    const user = rows[0] as {
      id: number;
      github_id: number;
      username: string;
      avatar_url: string;
    };

    // Sign JWT and set cookie
    const jwt = await signToken(user);
    res.setHeader('Set-Cookie', setCookie('auth_token', jwt, 60 * 60 * 24 * 30));

    // Redirect to original page
    let redirect = '/';
    try {
      if (state) redirect = Buffer.from(state as string, 'base64url').toString('utf-8');
    } catch {}

    return res.redirect(302, redirect);
  } catch (err) {
    console.error('OAuth callback error:', err);
    return res.status(500).send('Authentication failed. Please try again.');
  }
}
