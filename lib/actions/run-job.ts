'use server';

import { actionClient, ActionError, authMiddleware } from '@/lib/action';
import { db } from '@/lib/db';
import { sf } from '@/lib/fetch';
import { jobs, logs } from '@/lib/schemas/job';
import { idJob } from '@/lib/validations/job';
import { eq, sql } from 'drizzle-orm';

export const runJob = actionClient
  .use(authMiddleware)
  .metadata({ name: 'run-job' })
  .schema(idJob)
  .action(async ({ parsedInput: data }) => {
    const result = await db.query.jobs.findFirst({
      columns: {
        command: true,
        metadata: true,
      },
      where: (jobs, { eq }) => eq(jobs.id, data.id),
    });

    if (!result) {
      throw new ActionError('not found');
    }

    const res = await sf(result.command, {
      method: 'POST',
    });

    let status: 'ok' | 'failed' = 'failed';
    if (res.success) {
      status = 'ok';
    }

    try {
      const responseHeader = res.headers ?? {};
      await db.insert(logs).select(
        db
          .select({
            id: sql`gen_random_uuid()`.as('id'),
            name: jobs.name,
            status: sql`${status}`.as('status'),
            response: sql`${JSON.stringify(responseHeader)}`.as('response'),
            timeResponse: sql`${res.ms}`.as('timeResponse'),
            jobId: jobs.id,
            createdAt: sql`CURRENT_TIMESTAMP`.as('createdAt'),
          })
          .from(jobs)
          .where(eq(jobs.id, data.id))
      );
    } catch (error: any) {
      console.log(error);
    }
  });
