import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb, ensureTables } from '../_lib/db';
import { getUserFromRequest } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const user = await getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: 'Not authenticated' });

  const { username } = req.body as { username?: string };
  if (!username) return res.status(400).json({ error: 'Missing username' });

  // Only the rightful owner can claim their building
  if (username.toLowerCase() !== user.username.toLowerCase()) {
    return res.status(403).json({ error: 'You can only claim your own building' });
  }

  try {
    const sql = getDb();
    await ensureTables(sql);

    // Check if already claimed by someone else
    const existing = await sql`
      SELECT user_id FROM claimed_buildings WHERE github_username = ${username.toLowerCase()}
    `;

    if (existing.length > 0) {
      const row = existing[0] as { user_id: number };
      if (row.user_id !== user.id) {
        return res.status(409).json({ error: 'Building already claimed by another user' });
      }
      // Already claimed by current user — return success
      return res.json({ ok: true, already_claimed: true });
    }

    await sql`
      INSERT INTO claimed_buildings (github_username, user_id)
      VALUES (${username.toLowerCase()}, ${user.id})
    `;

    return res.json({ ok: true, already_claimed: false });
  } catch (err) {
    console.error('Claim error:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}
