import { neon } from '@neondatabase/serverless';

function getSQL() {
  return neon(process.env.DATABASE_URL!);
}

let initialized = false;

async function ensureTable() {
  if (!initialized) {
    const sql = getSQL();
    await sql`
      CREATE TABLE IF NOT EXISTS valitse_users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        google_id VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        picture TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        last_login_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    initialized = true;
  }
}

export interface ValitseUser {
  id: string;
  google_id: string;
  email: string;
  name: string | null;
  picture: string | null;
  created_at: string;
  last_login_at: string;
}

export async function upsertUser(googleUser: {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
}): Promise<ValitseUser> {
  await ensureTable();
  const sql = getSQL();
  const gName = googleUser.name || null;
  const gPicture = googleUser.picture || null;
  const rows = await sql`
    INSERT INTO valitse_users (google_id, email, name, picture)
    VALUES (${googleUser.sub}, ${googleUser.email}, ${gName}, ${gPicture})
    ON CONFLICT (google_id) DO UPDATE SET
      email = EXCLUDED.email,
      name = EXCLUDED.name,
      picture = EXCLUDED.picture,
      last_login_at = NOW()
    RETURNING *
  `;
  return rows[0] as ValitseUser;
}

export async function getUserById(id: string): Promise<ValitseUser | null> {
  await ensureTable();
  const sql = getSQL();
  const rows = await sql`SELECT * FROM valitse_users WHERE id = ${id}`;
  return (rows[0] as ValitseUser) || null;
}
