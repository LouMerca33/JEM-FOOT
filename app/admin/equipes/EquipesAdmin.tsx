'use client';

import { useState, useTransition } from 'react';
import type { Equipe } from '@/lib/types';
import { updateEquipe } from '../actions';

export default function EquipesAdmin({ equipes }: { equipes: Equipe[] }) {
  const [pending, startTransition] = useTransition();
  const [savingId, setSavingId] = useState<string | null>(null);
  const [forms, setForms] = useState<Record<string, Equipe>>(() =>
    Object.fromEntries(equipes.map((e) => [e.id, e]))
  );

  const handleChange = (id: string, field: keyof Equipe, value: string | number | null) => {
    setForms((f) => ({ ...f, [id]: { ...f[id], [field]: value } }));
  };

  const handleSave = (id: string) => {
    setSavingId(id);
    const f = forms[id];
    startTransition(async () => {
      await updateEquipe(id, {
        tranche_age: f.tranche_age ?? '',
        horaires: f.horaires ?? '',
        effectif: f.effectif,
        image_url: f.image_url ?? '',
      });
      setSavingId(null);
    });
  };

  const inputCls = 'w-full bg-[#141d3f] border border-[rgba(232,213,163,0.12)] focus:border-[#e8d5a3] focus:outline-none rounded px-3 py-2 text-sm text-[#f8f6f2] placeholder:text-[#8a96b8] transition-colors';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {equipes.map((equipe) => {
        const f = forms[equipe.id] ?? equipe;
        return (
          <div key={equipe.id} className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6">
            <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-[#f8f6f2] mb-4">{equipe.categorie}</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Tranche d&apos;âge</label>
                <input value={f.tranche_age ?? ''} onChange={(e) => handleChange(equipe.id, 'tranche_age', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Horaires</label>
                <textarea value={f.horaires ?? ''} onChange={(e) => handleChange(equipe.id, 'horaires', e.target.value)} rows={3} className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Effectif</label>
                <input type="number" value={f.effectif ?? ''} onChange={(e) => handleChange(equipe.id, 'effectif', parseInt(e.target.value) || null)} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Image URL</label>
                <input value={f.image_url ?? ''} onChange={(e) => handleChange(equipe.id, 'image_url', e.target.value)} placeholder="https://..." className={inputCls} />
              </div>
              <button onClick={() => handleSave(equipe.id)} disabled={pending && savingId === equipe.id}
                className="w-full bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold py-2.5 rounded text-sm transition-colors">
                {pending && savingId === equipe.id ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
