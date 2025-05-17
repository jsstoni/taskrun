import { SidebarApp } from '@/components/sidebar-app';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/');
  }

  const { user } = session;

  return (
    <SidebarProvider>
      <SidebarApp user={user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
