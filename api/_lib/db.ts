import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Sql = NeonQueryFunction<any, any>;

export function getDb(): Sql {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL not set');
  return neon(url) as Sql;
}

export async function ensureTables(sql: Sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      github_id INTEGER UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      avatar_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS claimed_buildings (
      id SERIAL PRIMARY KEY,
      github_username TEXT UNIQUE NOT NULL,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      custom_color TEXT,
      rooftop_item TEXT,
      building_item TEXT,
      claimed_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}
