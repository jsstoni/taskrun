export default async function JobId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <section className="p-4">{id}</section>;
}
