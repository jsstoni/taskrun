import { Header } from '@/components/dashboard/header';

export default function Integration() {
  return (
    <>
      <Header menu={[{ title: 'Integration', url: '/integration' }]}></Header>

      <section className="p-4">Integration</section>
    </>
  );
}
