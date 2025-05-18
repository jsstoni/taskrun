import { Header } from '@/components/dashboard/header';

export default async function JobId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Header menu={[{ title: id, url: `/${id}` }]} />
      <section className="p-6">{id}</section>
    </>
  );
}
