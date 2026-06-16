'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Article, ArticleCategorie } from '@/lib/types';
import Link from 'next/link';
import { saveArticle } from '../../actions';

const categories: ArticleCategorie[] = ['Articles Mensuels', 'FAQ', 'Interview'];

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function ArticleEditor({ article }: { article: Article | null }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({
    titre: article?.titre ?? '',
    slug: article?.slug ?? '',
    categorie: (article?.categorie as ArticleCategorie) ?? categories[0],
    image_url: article?.image_url ?? '',
    extrait: article?.extrait ?? '',
    contenu: article?.contenu ?? '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: value,
      ...(name === 'titre' && !article ? { slug: slugify(value) } : {}),
    }));
  };

  const handleSave = (publie: boolean) => {
    startTransition(async () => {
      await saveArticle({ ...form, publie, ...(article ? { id: article.id } : {}) });
      router.push('/admin/articles');
    });
  };

  const inputCls = 'w-full bg-[#141d3f] border border-[rgba(232,213,163,0.12)] hover:border-[rgba(232,213,163,0.25)] focus:border-[#e8d5a3] focus:outline-none rounded px-4 py-2.5 text-sm text-[#f8f6f2] placeholder:text-[#8a96b8] transition-colors';
  const labelCls = 'block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1.5';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6 space-y-4">
          <div>
            <label className={labelCls}>Titre</label>
            <input name="titre" value={form.titre} onChange={handleChange} placeholder="Titre de l'article" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Slug (URL)</label>
            <input name="slug" value={form.slug} onChange={handleChange} placeholder="titre-de-article" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Extrait</label>
            <textarea name="extrait" rows={2} value={form.extrait} onChange={handleChange} placeholder="Résumé court..." className={`${inputCls} resize-none`} />
          </div>
          <div>
            <label className={labelCls}>Contenu (HTML)</label>
            <textarea name="contenu" rows={14} value={form.contenu} onChange={handleChange} placeholder="<p>Contenu...</p>" className={`${inputCls} resize-y font-mono text-xs`} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6 space-y-4">
          <div>
            <label className={labelCls}>Catégorie</label>
            <select name="categorie" value={form.categorie} onChange={handleChange} className={inputCls}>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Image à la une (URL)</label>
            <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://..." className={inputCls} />
          </div>
        </div>

        <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6 space-y-3">
          <button onClick={() => handleSave(true)} disabled={pending}
            className="w-full bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold py-3 rounded text-sm transition-colors">
            {pending ? 'Sauvegarde...' : 'Publier'}
          </button>
          <button onClick={() => handleSave(false)} disabled={pending}
            className="w-full bg-[#2a3d6e] hover:bg-[#1e2c56] disabled:opacity-50 text-[#f8f6f2] font-semibold py-3 rounded text-sm transition-colors border border-[rgba(232,213,163,0.1)]">
            Sauvegarder en brouillon
          </button>
          <Link href="/admin/articles" className="block text-center text-sm text-[#8a96b8] hover:text-[#f8f6f2] transition-colors py-2">
            Annuler
          </Link>
        </div>
      </div>
    </div>
  );
}
