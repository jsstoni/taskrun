import { Header } from '@/components/dashboard/header';
import { Book, Play } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <>
      <Header>
        <h1>Dashboard</h1>
      </Header>

      <section className="p-4">
        <h2 className="text-lg text-blue-400">Welcome to TaskRun!</h2>

        <div className="mt-4 grid gap-6 md:grid-cols-3">
          <div className="col-span-2 space-y-4">
            <Link
              href="/docs"
              className="flex items-center gap-3 rounded-md border bg-accent/40 p-4 hover:text-blue-400"
            >
              <div className="rounded-md bg-sky-700 p-2">
                <Book size={16} color="white" />
              </div>
              <p>
                Read the documentation
                <span className="block text-xs text-muted-foreground">
                  Discover how you can make the most of it.
                </span>
              </p>
            </Link>

            <Link
              href="/docs"
              className="flex items-center gap-3 rounded-md border bg-accent/40 p-4 hover:text-blue-400"
            >
              <div className="rounded-md bg-emerald-700 p-2">
                <Play size={16} color="white" />
              </div>
              <p>
                Tutorial
                <span className="block text-xs text-muted-foreground">
                  Discover the concepts, reference, guides and tutorials.
                </span>
              </p>
            </Link>
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
