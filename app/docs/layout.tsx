import { Links } from '@/components/links';
import { Logo } from '@/components/logo';
import { getDocsSections, Section } from './links';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections = getDocsSections();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">
        <Logo size="sm" />
        <Nav sections={sections} />
      </aside>
      <main className="flex-1 px-6">{children}</main>
    </div>
  );
}

function Nav({ sections }: { sections: Section[] }) {
  return (
    <nav className="mt-2 space-y-2">
      {sections.map((section) => (
        <NavItem key={section.slug} section={section} />
      ))}
    </nav>
  );
}

function NavItem({ section }: { section: Section }) {
  return (
    <div>
      <Links
        href={`/docs${section.slug}`}
        className="block rounded-lg p-1 px-2 hover:underline"
      >
        {section.name}
      </Links>
      {section.sub && (
        <div className="mt-1 ml-4 space-y-1 border-l pl-2">
          {section.sub.map((sub) => (
            <NavItem key={sub.slug} section={sub} />
          ))}
        </div>
      )}
    </div>
  );
}
