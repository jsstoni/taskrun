import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import React from 'react';

type Menu = { title: string; url: string }[];

export function Header({
  children,
  menu = [],
}: {
  children?: React.ReactNode;
  menu?: Menu;
}) {
  const firstItem = { title: 'Dashboard', url: '/' };
  const menuList = [firstItem, ...menu];

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />

      <Separator
        orientation="vertical"
        className="data-[orientation=vertical]:h-4"
      />

      <Breadcrumb>
        <BreadcrumbList>
          {menuList.map((item, index) => {
            const isLast = index === menuList.length - 1;
            return (
              <React.Fragment key={item.url}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={`/dashboard/${item.url}`}>{item.title}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {children}
    </header>
  );
}
