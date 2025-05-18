import fs from 'fs';
import path from 'path';

export type Section = {
  name: string;
  slug: string;
  sub?: Section[];
};

const PAGE_REGEX = /^page\.(mdx|tsx|js|jsx)$/;

function getSubSections(dir: string, baseSlug: string): Section[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries
    .filter((e) => e.isDirectory())
    .map((entry) => {
      const subDir = path.join(dir, entry.name);
      const slug = `${baseSlug}/${entry.name}`.replace(/\\/g, '/');

      const subSections = getSubSections(subDir, slug);

      const hasPage = fs.readdirSync(subDir).some((e) => PAGE_REGEX.test(e));

      if (!hasPage && subSections.length === 0) {
        return null;
      }

      return {
        name: entry.name,
        slug,
        sub: subSections.length > 0 ? subSections : undefined,
      };
    })
    .filter(Boolean) as Section[];
}

export function getDocsSections(): Section[] {
  const docsDir = path.join(process.cwd(), 'app/docs');
  return getSubSections(docsDir, '');
}
