'use server';

import { actionClient, authMiddleware } from '@/lib/action';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schemas/job';
import { schemaJobs } from '@/lib/validations/job';
import { revalidatePath } from 'next/cache';

export const addJob = actionClient
  .use(authMiddleware)
  .metadata({ name: 'add-job' })
  .schema(schemaJobs)
  .action(async ({ parsedInput: data, ctx: { user } }) => {
    const schedule = data.quickSchedule.join(' ');
    await db.insert(jobs).values({
      name: data.name,
      scheduler: schedule,
      command: data.command,
      metadata: data.metaData,
      userId: user,
    });

    revalidatePath('/dashboard');
  });
