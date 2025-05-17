import { env } from '@/lib/env/server';
import * as job from '@/lib/schemas/job';
import * as user from '@/lib/schemas/user';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle({
  client: pool,
  schema: { ...user, ...job },
});
