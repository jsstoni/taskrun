import { Header } from '@/components/dashboard/header';
import { RemoveJob } from '@/components/dashboard/remove-job';

export default async function JobId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Header menu={[{ title: id, url: `/${id}` }]}>
        <div className="ml-auto flex items-center gap-2">
          <RemoveJob id={id} />
        </div>
      </Header>
      <section className="p-6">{id}</section>
    </>
  );
}
