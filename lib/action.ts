import { auth } from '@/lib/auth/server';
import {
  createMiddleware,
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';
import { headers } from 'next/headers';
import { z } from 'zod';

export class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error('Action error:', e.message);

    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    });
  },
}).use(async ({ next, clientInput, metadata }) => {
  const result = await next();

  if (process.env.NODE_ENV === 'development') {
    console.log(`Input -> ${JSON.stringify(clientInput)}`);
    console.log(`Result -> ${JSON.stringify(result.data)}`);
    console.log(`Metadata -> ${JSON.stringify(metadata)}`);
  }

  return result;
});

export const authMiddleware = createMiddleware().define(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user.id) {
    throw new ActionError('Usuario no autorizado');
  }

  return next({
    ctx: {
      user: session.user.id,
    },
  });
});
