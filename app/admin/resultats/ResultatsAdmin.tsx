'use client';

import { useState, useTransition } from 'react';
import type { Resultat, ResultatLieu, ResultatType } from '@/lib/types';
import { addResultat, deleteResultat } from '../actions';
import { AdminCard, AdminBadge } from '@/components/admin/ui';

const lieux: ResultatLieu[] = ['Domicile', 'Extérieur'];
const types: ResultatType[] = ['match', 'plateau', 'tournoi'];

const emptyForm = {
  equipe: '',
  adversaire: '',
  score_jem: '' as string,
  score_adversaire: '' as string,
  date_match: '',
  lieu: 'Domicile' as ResultatLieu,
  type: 'match' as ResultatType,
};

function formatDate(d: string | Date | null) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function ResultatsAdmin({ resultats }: { resultats: Resultat[] }) {
  const [pending, startTransition] = useTransition();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const inputCls = 'w-full bg-[#141d3f] border border-[rgba(232,213,163,0.12)] focus:border-[#e8d5a3] focus:outline-none rounded px-3 py-2 text-sm text-[#f8f6f2] placeholder:text-[#8a96b8] transition-colors';

  const handleAdd = () => {
    if (!form.equipe.trim() || !form.adversaire.trim()) return;
    startTransition(async () => {
      await addResultat({
        equipe: form.equipe.trim(),
        adversaire: form.adversaire.trim(),
        score_jem: form.score_jem === '' ? null : parseInt(form.score_jem),
        score_adversaire: form.score_adversaire === '' ? null : parseInt(form.score_adversaire),
        date_match: form.date_match,
        lieu: form.lieu,
        type: form.type,
      });
      setForm(emptyForm);
      setAdding(false);
    });
  };

  return (
    <div className="space-y-6">
      <AdminCard>
        {!adding ? (
          <button onClick={() => setAdding(true)} className="text-sm text-[#e8d5a3] hover:text-[#f2e8c6] transition-colors">
            + Ajouter un résultat
          </button>
        ) : (
          <>
            <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-[#f8f6f2] mb-4">Nouveau résultat</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Équipe (catégorie)</label>
                <input value={form.equipe} onChange={(e) => setForm((f) => ({ ...f, equipe: e.target.value }))} placeholder="Ex: U12/U13" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Adversaire</label>
                <input value={form.adversaire} onChange={(e) => setForm((f) => ({ ...f, adversaire: e.target.value }))} placeholder="Nom du club adverse" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Score J.E.M</label>
                <input type="number" min={0} value={form.score_jem} onChange={(e) => setForm((f) => ({ ...f, score_jem: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Score adversaire</label>
                <input type="number" min={0} value={form.score_adversaire} onChange={(e) => setForm((f) => ({ ...f, score_adversaire: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Date</label>
                <input type="date" value={form.date_match} onChange={(e) => setForm((f) => ({ ...f, date_match: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Lieu</label>
                <select value={form.lieu} onChange={(e) => setForm((f) => ({ ...f, lieu: e.target.value as ResultatLieu }))} className={inputCls}>
                  {lieux.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Type</label>
                <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as ResultatType }))} className={inputCls}>
                  {types.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleAdd} disabled={pending || !form.equipe.trim() || !form.adversaire.trim()}
                className="bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold px-5 py-2.5 rounded text-sm transition-colors">
                {pending ? 'Ajout...' : 'Ajouter'}
              </button>
              <button onClick={() => { setAdding(false); setForm(emptyForm); }} className="text-sm text-[#8a96b8] hover:text-[#f8f6f2] px-3 py-2.5">Annuler</button>
            </div>
            <p className="text-xs text-[#8a96b8] mt-3">
              Si le score J.E.M est supérieur au score adverse, le prochain visiteur verra une petite célébration de victoire sur le site 🎉
            </p>
          </>
        )}
      </AdminCard>

      <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.18)] overflow-x-auto">
        {resultats.length === 0 ? (
          <p className="p-8 text-sm text-[#8a96b8] text-center">Aucun résultat enregistré pour l&apos;instant.</p>
        ) : (
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-[rgba(232,213,163,0.08)]">
                {['Équipe', 'Adversaire', 'Score', 'Date', 'Lieu', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#8a96b8]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resultats.map((r) => {
                const victoire = r.score_jem !== null && r.score_adversaire !== null && r.score_jem > r.score_adversaire;
                return (
                  <tr key={r.id} className="border-b border-[rgba(232,213,163,0.04)] hover:bg-[rgba(255,255,255,0.02)]">
                    <td className="px-4 py-3 text-sm text-[#f8f6f2]">{r.equipe}</td>
                    <td className="px-4 py-3 text-sm text-[#8a96b8]">{r.adversaire}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-[#f8f6f2] font-semibold">{r.score_jem ?? '–'} - {r.score_adversaire ?? '–'}</span>
                      {victoire && <AdminBadge tone="gold"> 🏆 Victoire</AdminBadge>}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#8a96b8]">{formatDate(r.date_match)}</td>
                    <td className="px-4 py-3 text-xs text-[#8a96b8]">{r.lieu ?? '—'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => { if (confirm('Supprimer ce résultat ?')) startTransition(() => deleteResultat(r.id)); }}
                        disabled={pending}
                        className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors"
                      >
                        Suppr.
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
