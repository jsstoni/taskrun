import { env } from '@/lib/env/client';
import { createAuthClient } from 'better-auth/react';

export const { signIn, signOut, useSession, $Infer } = createAuthClient({
  baseURL: env.NEXT_PUBLIC_URL,
});

export const authGithub = async () => {
  await signIn.social({
    provider: 'github',
    callbackURL: '/dashboard',
    errorCallbackURL: '/',
  });
};
