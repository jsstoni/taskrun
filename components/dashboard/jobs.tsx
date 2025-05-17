import { Links } from '@/components/links';
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { jobs } from '@/lib/schemas/job';
import { use } from 'react';

type Jobs = typeof jobs.$inferSelect;

export function Jobs({ data }: { data: Promise<Jobs[]> }) {
  const listJobs = use(data);

  return (
    <SidebarMenuSub>
      {listJobs.map((job) => (
        <SidebarMenuSubItem key={job.id}>
          <SidebarMenuSubButton asChild>
            <Links href={`/dashboard/${job.id}`}>{job.name}</Links>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
}
