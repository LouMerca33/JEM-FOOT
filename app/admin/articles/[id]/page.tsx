import { db, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';
import type { Article } from '@/lib/types';
import ArticleEditor from './ArticleEditor';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ArticleEditorPage({ params }: Props) {
  const { id } = await params;
  let article: Article | null = null;

  if (id !== 'new') {
    try {
      const [found] = await db.select().from(schema.articles).where(eq(schema.articles.id, id)).limit(1);
      article = found ?? null;
    } catch {}
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.04em] text-[#f8f6f2] mb-8">
        {article ? "Modifier l'article" : 'Nouvel article'}
      </h1>
      <ArticleEditor article={article} />
    </div>
  );
}
