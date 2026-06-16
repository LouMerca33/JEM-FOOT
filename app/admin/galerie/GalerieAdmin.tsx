'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import type { GaleriePhoto, GalerieCategorie } from '@/lib/types';
import { addGaleriePhoto, deleteGaleriePhoto } from '../actions';

const categories: GalerieCategorie[] = ['Match', 'Entraînement', 'Événement'];

export default function GalerieAdmin({ photos }: { photos: GaleriePhoto[] }) {
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({ image_url: '', titre: '', categorie: 'Match' as GalerieCategorie, equipe: '', date_photo: '' });

  const inputCls = 'w-full bg-[#141d3f] border border-[rgba(232,213,163,0.12)] focus:border-[#e8d5a3] focus:outline-none rounded px-3 py-2 text-sm text-[#f8f6f2] placeholder:text-[#8a96b8] transition-colors';

  const handleAdd = () => {
    if (!form.image_url) return;
    startTransition(async () => {
      await addGaleriePhoto(form);
      setForm({ image_url: '', titre: '', categorie: 'Match', equipe: '', date_photo: '' });
    });
  };

  return (
    <div className="space-y-6">
      {/* Add form */}
      <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6">
        <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-[#f8f6f2] mb-4">Ajouter une photo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1.5">URL de l&apos;image</label>
            <input value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} placeholder="https://exemple.com/photo.jpg" className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1.5">Titre (optionnel)</label>
            <input value={form.titre} onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))} placeholder="Description" className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1.5">Catégorie</label>
            <select value={form.categorie} onChange={(e) => setForm((f) => ({ ...f, categorie: e.target.value as GalerieCategorie }))} className={inputCls}>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1.5">Équipe</label>
            <input value={form.equipe} onChange={(e) => setForm((f) => ({ ...f, equipe: e.target.value }))} placeholder="U9, U11..." className={inputCls} />
          </div>
        </div>
        <button onClick={handleAdd} disabled={pending || !form.image_url}
          className="bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold px-5 py-2.5 rounded text-sm transition-colors">
          {pending ? 'Ajout...' : 'Ajouter la photo'}
        </button>
      </div>

      {/* Grid */}
      {photos.length === 0 ? (
        <p className="text-sm text-[#8a96b8] text-center py-8">Aucune photo pour l&apos;instant.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((p) => (
            <div key={p.id} className="relative group rounded-[8px] overflow-hidden border border-[rgba(232,213,163,0.08)] aspect-square">
              <Image src={p.image_url} alt={p.titre ?? ''} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-[rgba(13,20,41,0)] group-hover:bg-[rgba(13,20,41,0.6)] transition-colors flex items-center justify-center">
                <button
                  onClick={() => {
                    if (confirm('Supprimer cette photo ?')) {
                      startTransition(() => deleteGaleriePhoto(p.id));
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-700 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded"
                >
                  Supprimer
                </button>
              </div>
              {p.categorie && (
                <span className="absolute top-2 left-2 bg-[rgba(13,20,41,0.8)] text-[#e8d5a3] text-xs px-2 py-0.5 rounded">
                  {p.categorie}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
