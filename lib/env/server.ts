import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    GITHUB_CLIENT: z.string(),
    GITHUB_SECRET: z.string(),
  },
  experimental__runtimeEnv: process.env,
});
