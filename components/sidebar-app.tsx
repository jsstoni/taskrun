import { CreateJob } from '@/components/dashboard/create-job';
import { Links } from '@/components/links';
import { Logo } from '@/components/logo';
import { NavUser } from '@/components/nav-user';
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
import { $Infer } from '@/lib/auth/client';
import { Home, Puzzle } from 'lucide-react';

const items = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Integration',
    url: '/dashboard/integration',
    icon: Puzzle,
  },
];

type User = typeof $Infer.Session.user;

export function SidebarApp({ user }: { user: User }) {
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
