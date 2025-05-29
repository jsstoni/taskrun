import { CronInfo } from '@/components/cron-info';
import { Header } from '@/components/dashboard/header';

export default function Dashboard() {
  return (
    <>
      <Header />

      <section className="p-6">
        <h2 className="text-lg text-blue-400">Welcome to TaskRun!</h2>

        <div className="mt-4 grid gap-6 md:grid-cols-3">
          <div className="col-span-2 space-y-4">
            <CronInfo />
          </div>

          <div>
            <strong>Join the community</strong>
            <p className="text-xs text-muted-foreground">
              Discuss with team members, contributors and developers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
