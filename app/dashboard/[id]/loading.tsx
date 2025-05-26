import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingState() {
  return (
    <div className="p-6 pt-4">
      <div className="-mx-6 flex items-center justify-between border-b px-6 pb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>

      <div className="mt-2 flex items-center border-b px-0 py-4">
        <Skeleton className="mr-2 h-12 w-12" />
        <Skeleton className="h-6 w-16" />

        <Skeleton className="mr-2 ml-auto h-8 w-24" />
        <Skeleton className="h-8 w-24 bg-primary" />
      </div>

      <div className="mt-4 space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
