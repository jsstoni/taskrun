import { Discord } from '@/components/dashboard/discord';
import { Header } from '@/components/dashboard/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function Integration() {
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
            <Discord />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
