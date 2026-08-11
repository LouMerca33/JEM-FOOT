'use client';

import { useState, useTransition } from 'react';
import type { Temoignage } from '@/lib/types';
import { addTemoignage, toggleTemoignage, deleteTemoignage } from '../actions';

const emptyForm = { nom_parent: '', categorie_enfant: '', message: '', ordre: 99 };

export default function TemoignagesAdmin({ temoignages }: { temoignages: Temoignage[] }) {
  const [pending, startTransition] = useTransition();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const inputCls = 'w-full bg-[#141d3f] border border-[rgba(232,213,163,0.12)] focus:border-[#e8d5a3] focus:outline-none rounded px-3 py-2 text-sm text-[#f8f6f2] placeholder:text-[#8a96b8] transition-colors';

  const handleAdd = () => {
    if (!form.nom_parent || !form.message) return;
    startTransition(async () => {
      await addTemoignage(form);
      setAdding(false);
      setForm(emptyForm);
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6">
        {!adding ? (
          <button onClick={() => setAdding(true)} className="text-sm text-[#e8d5a3] hover:text-[#f2e8c6] transition-colors">
            + Ajouter un témoignage
          </button>
        ) : (
          <>
            <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-[#f8f6f2] mb-4">Nouveau témoignage</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Nom du parent</label>
                <input value={form.nom_parent} onChange={(e) => setForm((f) => ({ ...f, nom_parent: e.target.value }))} placeholder="Ex: Sophie D." className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Catégorie de l&apos;enfant</label>
                <input value={form.categorie_enfant} onChange={(e) => setForm((f) => ({ ...f, categorie_enfant: e.target.value }))} placeholder="Ex: U9" className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Message</label>
                <textarea value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} rows={3} placeholder="Le témoignage du parent..." className={`${inputCls} resize-none`} />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleAdd} disabled={pending || !form.nom_parent || !form.message}
                className="bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold px-5 py-2.5 rounded text-sm transition-colors">
                {pending ? 'Ajout...' : 'Ajouter'}
              </button>
              <button onClick={() => setAdding(false)} className="text-sm text-[#8a96b8] hover:text-[#f8f6f2] px-3 py-2.5">Annuler</button>
            </div>
          </>
        )}
      </div>

      <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(232,213,163,0.08)]">
              {['Parent', 'Catégorie', 'Message', 'Statut', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#8a96b8]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {temoignages.map((t) => (
              <tr key={t.id} className="border-b border-[rgba(232,213,163,0.04)] hover:bg-[rgba(255,255,255,0.02)]">
                <td className="px-4 py-3 text-sm text-[#f8f6f2]">{t.nom_parent}</td>
                <td className="px-4 py-3 text-sm text-[#8a96b8]">{t.categorie_enfant ?? '—'}</td>
                <td className="px-4 py-3 text-sm text-[#8a96b8] max-w-xs truncate">{t.message}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${t.actif ? 'bg-green-900/40 text-green-400' : 'bg-[rgba(232,213,163,0.1)] text-[#8a96b8]'}`}>
                    {t.actif ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startTransition(() => toggleTemoignage(t.id, t.actif))}
                      disabled={pending}
                      className="text-xs text-[#8a96b8] hover:text-[#f8f6f2] disabled:opacity-50 transition-colors"
                    >
                      {t.actif ? 'Désactiver' : 'Activer'}
                    </button>
                    <button
                      onClick={() => { if (confirm('Supprimer ce témoignage ?')) startTransition(() => deleteTemoignage(t.id)); }}
                      disabled={pending}
                      className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors"
                    >
                      Suppr.
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
