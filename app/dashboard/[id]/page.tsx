import { Header } from '@/components/dashboard/header';
import { RemoveJob } from '@/components/dashboard/remove-job';
import { RunJob } from '@/components/dashboard/run-job';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/lib/db';
import { logs } from '@/lib/schemas/job';
import { cn } from '@/lib/utils';
import cronstrue from 'cronstrue';
import { format } from 'date-fns';
import { desc } from 'drizzle-orm';
import { CalendarSync, Inbox } from 'lucide-react';
import { notFound } from 'next/navigation';

async function jobById(id: string) {
  try {
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
  } catch {
    return null;
  }
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
      <Header menu={[{ title: job.name, url: `/${id}` }]} />

      <section className="p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-lg border bg-muted p-2.5 text-xs">
            <CalendarSync size={28} />
          </div>
          <div>
            <p className="block text-xl font-bold">
              {job.name}
              <span className="ml-2 text-xs text-muted-foreground">
                {job.method}: {job.command}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              <small className="mr-2 rounded-lg border bg-muted p-1 py-0.5">
                {job.scheduler}
              </small>
              {cronstrue.toString(job.scheduler)}
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <RemoveJob id={id} />
            <RunJob id={id} />
          </div>
        </div>

        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Time</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Headers</TableHead>
              <TableHead className="w-[120px] text-right">Status</TableHead>
              <TableHead className="w-[80px] text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {job.logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">
                  {format(log.createdAt, 'dd/MM/yyyy HH:mm')}
                </TableCell>
                <TableCell>{log.name}</TableCell>
                <TableCell className="max-w-3xs truncate">
                  {log.response}
                </TableCell>
                <TableCell className="text-right">
                  <p
                    className={cn(
                      'inline rounded-lg p-1 px-3 text-xs text-foreground',
                      {
                        'bg-green-400/40': log.status === 'ok',
                        'bg-red-400/40': log.status === 'failed',
                      }
                    )}
                  >
                    {log.status}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  {log.timeResponse}ms
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {job.logs.length <= 0 && (
            <TableCaption>
              <Inbox size={64} strokeWidth={0.5} />
              <p>Events list is currently empty</p>
            </TableCaption>
          )}
        </Table>
      </section>
    </>
  );
}
