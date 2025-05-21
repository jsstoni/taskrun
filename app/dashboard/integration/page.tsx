import { Discord } from '@/components/dashboard/discord';
import { Header } from '@/components/dashboard/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auth } from '@/lib/auth/server';
import { db } from '@/lib/db';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Integration() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/');
  }

  const discord = await db.query.discords.findFirst({
    where: (discords, { eq }) => eq(discords.userId, session.user.id),
  });

  return (
    <>
      <Header menu={[{ title: 'Integration', url: '/integration' }]}></Header>

      <section className="p-6">
        <h3 className="text-2xl">Integration</h3>

        <Tabs className="mt-4" defaultValue="discord">
          <TabsList>
            <TabsTrigger value="discord">Discord</TabsTrigger>
          </TabsList>
          <TabsContent value="discord">
            <Discord value={discord?.webhook} />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
