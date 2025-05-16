import { env } from '@/lib/env/client';
import { createAuthClient } from 'better-auth/react';

export const { signIn, useSession } = createAuthClient({
  baseURL: env.NEXT_PUBLIC_URL,
});

export const authGithub = async () => {
  await signIn.social({
    provider: 'github',
    callbackURL: '/dashboard',
    errorCallbackURL: '/',
  });
};
