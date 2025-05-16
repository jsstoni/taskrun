import { db } from '@/lib/db';
import { env } from '@/lib/env/server';
import * as user from '@/lib/schemas/user';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: user,
    usePlural: true,
  }),
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT,
      clientSecret: env.GITHUB_SECRET,
    },
  },
});
