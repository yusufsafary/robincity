import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from '../_lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  const { username } = req.query;
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Missing username' });
  }

  try {
    const sql = getDb();
    const rows = await sql`
      SELECT cb.github_username, cb.custom_color, cb.rooftop_item, cb.building_item,
             cb.claimed_at, u.avatar_url AS owner_avatar, u.username AS owner_username
      FROM claimed_buildings cb
      JOIN users u ON u.id = cb.user_id
      WHERE cb.github_username = ${username.toLowerCase()}
    `;

    if (rows.length === 0) {
      return res.json({ claimed: false });
    }

    const b = rows[0] as {
      github_username: string;
      custom_color: string | null;
      rooftop_item: string | null;
      building_item: string | null;
      claimed_at: string;
      owner_avatar: string;
      owner_username: string;
    };

    return res.json({
      claimed: true,
      github_username: b.github_username,
      owner_username: b.owner_username,
      owner_avatar: b.owner_avatar,
      custom_color: b.custom_color,
      rooftop_item: b.rooftop_item,
      building_item: b.building_item,
      claimed_at: b.claimed_at,
    });
  } catch (err) {
    console.error('GET building error:', err);
    // If table doesn't exist yet, return unclaimed
    return res.json({ claimed: false });
  }
}
