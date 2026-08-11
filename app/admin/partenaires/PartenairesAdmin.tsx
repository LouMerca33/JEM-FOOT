'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import type { Partenaire, PartenaireNiveau } from '@/lib/types';
import { addPartenaire, togglePartenaire, deletePartenaire } from '../actions';

const niveaux: PartenaireNiveau[] = ['gold', 'standard'];
const emptyForm = { nom: '', logo_url: '', site_url: '', niveau: 'standard' as PartenaireNiveau, ordre: 99 };

export default function PartenairesAdmin({ partenaires }: { partenaires: Partenaire[] }) {
  const [pending, startTransition] = useTransition();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const inputCls = 'w-full bg-[#141d3f] border border-[rgba(232,213,163,0.12)] focus:border-[#e8d5a3] focus:outline-none rounded px-3 py-2 text-sm text-[#f8f6f2] placeholder:text-[#8a96b8] transition-colors';

  const handleAdd = () => {
    if (!form.nom) return;
    startTransition(async () => {
      await addPartenaire(form);
      setAdding(false);
      setForm(emptyForm);
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6">
        {!adding ? (
          <button onClick={() => setAdding(true)} className="text-sm text-[#e8d5a3] hover:text-[#f2e8c6] transition-colors">
            + Ajouter un partenaire
          </button>
        ) : (
          <>
            <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-[#f8f6f2] mb-4">Nouveau partenaire</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Nom</label>
                <input value={form.nom} onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))} placeholder="Nom du partenaire" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Niveau</label>
                <select value={form.niveau} onChange={(e) => setForm((f) => ({ ...f, niveau: e.target.value as PartenaireNiveau }))} className={inputCls}>
                  {niveaux.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">URL Logo</label>
                <input value={form.logo_url} onChange={(e) => setForm((f) => ({ ...f, logo_url: e.target.value }))} placeholder="https://..." className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">URL Site</label>
                <input value={form.site_url} onChange={(e) => setForm((f) => ({ ...f, site_url: e.target.value }))} placeholder="https://..." className={inputCls} />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleAdd} disabled={pending || !form.nom}
                className="bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold px-5 py-2.5 rounded text-sm transition-colors">
                {pending ? 'Ajout...' : 'Ajouter'}
              </button>
              <button onClick={() => setAdding(false)} className="text-sm text-[#8a96b8] hover:text-[#f8f6f2] px-3 py-2.5">Annuler</button>
            </div>
          </>
        )}
      </div>

      <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] overflow-x-auto">
        <table className="w-full min-w-[560px]">
          <thead>
            <tr className="border-b border-[rgba(232,213,163,0.08)]">
              {['Logo', 'Nom', 'Niveau', 'Statut', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#8a96b8]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {partenaires.map((p) => (
              <tr key={p.id} className="border-b border-[rgba(232,213,163,0.04)] hover:bg-[rgba(255,255,255,0.02)]">
                <td className="px-4 py-3">
                  {p.logo_url
                    ? <Image src={p.logo_url} alt={p.nom} width={60} height={30} className="object-contain" unoptimized />
                    : <span className="text-xs text-[#8a96b8]">—</span>}
                </td>
                <td className="px-4 py-3 text-sm text-[#f8f6f2]">{p.nom}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${p.niveau === 'gold' ? 'bg-[rgba(232,213,163,0.15)] text-[#e8d5a3]' : 'bg-[#2a3d6e] text-[#8a96b8]'}`}>
                    {p.niveau}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${p.actif ? 'bg-green-900/40 text-green-400' : 'bg-[rgba(232,213,163,0.1)] text-[#8a96b8]'}`}>
                    {p.actif ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startTransition(() => togglePartenaire(p.id, p.actif))}
                      disabled={pending}
                      className="text-xs text-[#8a96b8] hover:text-[#f8f6f2] disabled:opacity-50 transition-colors"
                    >
                      {p.actif ? 'Désactiver' : 'Activer'}
                    </button>
                    <button
                      onClick={() => { if (confirm('Supprimer ce partenaire ?')) startTransition(() => deletePartenaire(p.id)); }}
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
