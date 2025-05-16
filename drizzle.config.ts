import { env } from '@/lib/env/server';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './.drizzle',
  schema: './lib/schemas/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
