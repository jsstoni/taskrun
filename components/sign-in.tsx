'use client';

import { Button } from '@/components/ui/button';
import { authGithub } from '@/lib/auth/client';

export function SignIn() {
  return <Button onClick={authGithub}>Get Started</Button>;
}
