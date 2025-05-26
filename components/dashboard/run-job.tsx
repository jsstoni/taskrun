'use client';

import { Button } from '@/components/ui/button';
import { runJob } from '@/lib/actions/run-job';
import { Loader2, Play } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';

export function RunJob({ id }: { id: string }) {
  const { executeAsync, isExecuting } = useAction(runJob, {
    onError: ({ error }) => {
      alert(error.serverError);
    },
  });

  const handleRun = async () => {
    await executeAsync({ id });
  };

  return (
    <Button size="sm" disabled={isExecuting} onClick={handleRun}>
      <Play />
      {isExecuting && <Loader2 className="animate-spin" />} Run Job
    </Button>
  );
}
