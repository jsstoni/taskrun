import { Header } from '@/components/dashboard/header';
import { RemoveJob } from '@/components/dashboard/remove-job';
import { RunJob } from '@/components/dashboard/run-job';
import { db } from '@/lib/db';
import { logs } from '@/lib/schemas/job';
import { cn } from '@/lib/utils';
import cronstrue from 'cronstrue';
import { format } from 'date-fns';
import { desc } from 'drizzle-orm';
import { CalendarSync } from 'lucide-react';
import { notFound } from 'next/navigation';

async function jobById(id: string) {
  const result = await db.query.jobs.findFirst({
    with: {
      logs: {
        orderBy: [desc(logs.createdAt)],
      },
    },
    where: (jobs, { eq }) => eq(jobs.id, id),
  });

  if (!result) {
    return null;
  }

  return result;
}

export default async function JobId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await jobById(id);

  if (!job) {
    notFound();
  }

  return (
    <>
      <Header menu={[{ title: job.name, url: `/${id}` }]}>
        <div className="ml-auto flex items-center gap-2">
          <RemoveJob id={id} />
          <RunJob id={id} />
        </div>
      </Header>

      <section className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-lg border bg-muted p-2.5 text-xs">
            <CalendarSync size={28} />
          </div>
          <div>
            <p className="block text-xl font-bold">
              {job.name}{' '}
              <span className="ml-2 text-xs text-muted-foreground">
                {job.command}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              <small className="mr-2 rounded-lg border bg-muted p-1 py-0.5">
                {job.scheduler}
              </small>
              {cronstrue.toString(job.scheduler)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 border-t pt-4 text-muted-foreground">
          {job.logs.map((log) => (
            <div
              className="flex flex-col items-start gap-2 md:flex-row"
              key={log.id}
            >
              <p>{format(log.createdAt, 'dd/MM/yyyy HH:mm')}</p>
              <p>{log.name}</p>
              <p>{log.response}</p>
              <p
                className={cn(
                  'ml-auto rounded-lg p-1 px-3 text-xs text-foreground',
                  {
                    'bg-green-400/40': log.status === 'ok',
                    'bg-red-400/40': log.status === 'failed',
                  }
                )}
              >
                {log.status}
              </p>
              <p>{log.timeResponse}ms</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
