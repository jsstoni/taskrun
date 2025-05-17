'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Links({
  href,
  children,
  className,
}: {
  href: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn({ 'bg-sidebar-accent': pathname === href }, className)}
    >
      {children}
    </Link>
  );
}
