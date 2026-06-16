'use client';

import Link from 'next/link';
import { useTransition } from 'react';
import { toggleArticlePublish, deleteArticle } from '../actions';

export default function ArticleActions({ id, publie }: { id: string; publie: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/articles/${id}`} className="text-xs text-[#e8d5a3] hover:text-[#f2e8c6] transition-colors">
        Éditer
      </Link>
      <button
        disabled={pending}
        onClick={() => startTransition(() => toggleArticlePublish(id, publie))}
        className="text-xs text-[#8a96b8] hover:text-[#f8f6f2] disabled:opacity-50 transition-colors"
      >
        {publie ? 'Dépublier' : 'Publier'}
      </button>
      <button
        disabled={pending}
        onClick={() => {
          if (confirm('Supprimer cet article définitivement ?')) {
            startTransition(() => deleteArticle(id));
          }
        }}
        className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors"
      >
        Suppr.
      </button>
    </div>
  );
}
