import { CreateJob } from '@/components/dashboard/create-job';
import { Jobs } from '@/components/dashboard/jobs';
import { Links } from '@/components/links';
import { Logo } from '@/components/logo';
import { NavUser } from '@/components/nav-user';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { $Infer } from '@/lib/auth/client';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schemas/job';
import { eq } from 'drizzle-orm';
import { CalendarClock, ChevronRight, Puzzle } from 'lucide-react';
import { Suspense } from 'react';

const allJobs = async (user: string) => {
  const result = await db.select().from(jobs).where(eq(jobs.userId, user));

  return result;
};

const items = [
  {
    title: 'Integration',
    url: '/dashboard/integration',
    icon: Puzzle,
  },
];

const SkeletoMenu = () => {
  return (
    <div className="ml-4 flex flex-col gap-2 border-l p-2 py-0">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} className="h-5 w-34 rounded-md" />
        ))}
    </div>
  );
};

type User = typeof $Infer.Session.user;

export async function SidebarApp({ user }: { user: User }) {
  const listJobs = allJobs(user.id);

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <CreateJob />
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible asChild defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Job Shedule">
                      <CalendarClock />
                      <span>Shedule</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Suspense fallback={<SkeletoMenu />}>
                      <Jobs data={listJobs} />
                    </Suspense>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Links href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Links>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser data={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
