'use server';

import { actionClient, authMiddleware } from '@/lib/action';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schemas/job';
import { idJob } from '@/lib/validations/job';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const removeJob = actionClient
  .use(authMiddleware)
  .metadata({ name: 'remove-job' })
  .schema(idJob)
  .action(async ({ parsedInput: data, ctx: { user } }) => {
    await db
      .delete(jobs)
      .where(and(eq(jobs.id, data.id), eq(jobs.userId, user)));
    revalidatePath('/dashboard');
  });
