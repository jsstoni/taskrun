import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      {children}
    </header>
  );
}
