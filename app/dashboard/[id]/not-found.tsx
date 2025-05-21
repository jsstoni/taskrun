import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-2xl font-semibold">404 Not Found</h2>
      <Link
        href="/dashboard"
        className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
      >
        Go Back
      </Link>
    </div>
  );
}
