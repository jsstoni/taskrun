import { Header } from '@/components/dashboard/header';
import { RemoveJob } from '@/components/dashboard/remove-job';
import { db } from '@/lib/db';
import { CalendarSync } from 'lucide-react';
import { notFound } from 'next/navigation';

async function jobById(id: string) {
  const result = await db.query.jobs.findFirst({
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
        </div>
      </Header>

      <section className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-lg border bg-muted p-2.5 text-xs">
            <CalendarSync size={28} />
          </div>
          <div>
            <span className="block text-xl font-bold">{job.name}</span>
            <p className="text-sm text-muted-foreground">
              <small className="mr-2 rounded-lg border bg-muted p-1 py-0.5">
                {job.scheduler}
              </small>
              {job.command}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
