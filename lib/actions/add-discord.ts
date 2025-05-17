'use server';

import { actionClient, authMiddleware } from '@/lib/action';
import { db } from '@/lib/db';
import { discords } from '@/lib/schemas/user';
import { schemaDiscord } from '@/lib/validations/discord';

export const addDiscord = actionClient
  .use(authMiddleware)
  .metadata({ name: 'add-discord' })
  .schema(schemaDiscord)
  .action(async ({ parsedInput: data, ctx: { user } }) => {
    await db
      .insert(discords)
      .values({ webhook: data.webhook, userId: user })
      .onConflictDoUpdate({
        target: discords.userId,
        set: { webhook: data.webhook },
      });
  });
