import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from '../_lib/db';
import { getUserFromRequest } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const user = await getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: 'Not authenticated' });

  const { username, custom_color, rooftop_item, building_item } = req.body as {
    username?: string;
    custom_color?: string | null;
    rooftop_item?: string | null;
    building_item?: string | null;
  };

  if (!username) return res.status(400).json({ error: 'Missing username' });
  if (username.toLowerCase() !== user.username.toLowerCase()) {
    return res.status(403).json({ error: 'You can only customize your own building' });
  }

  try {
    const sql = getDb();
    const rows = await sql`
      UPDATE claimed_buildings
      SET
        custom_color  = CASE WHEN ${custom_color  !== undefined} THEN ${custom_color  ?? null} ELSE custom_color  END,
        rooftop_item  = CASE WHEN ${rooftop_item  !== undefined} THEN ${rooftop_item  ?? null} ELSE rooftop_item  END,
        building_item = CASE WHEN ${building_item !== undefined} THEN ${building_item ?? null} ELSE building_item END,
        updated_at = NOW()
      WHERE github_username = ${username.toLowerCase()} AND user_id = ${user.id}
      RETURNING *
    `;

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Building not claimed. Claim it first.' });
    }

    return res.json({ ok: true, building: rows[0] });
  } catch (err) {
    console.error('Customize error:', err);
    return res.status(500).json({ error: 'Database error' });
  }
}
