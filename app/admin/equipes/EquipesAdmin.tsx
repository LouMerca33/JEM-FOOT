'use client';

import { useState, useTransition } from 'react';
import type { Equipe } from '@/lib/types';
import { updateEquipe, createEquipe, deleteEquipe, moveEquipe } from '../actions';

const emptyNewEquipe = {
  categorie: '',
  tranche_age: '',
  coach: '',
  description: '',
  horaires: '',
  effectif: null as number | null,
  image_url: '',
};

export default function EquipesAdmin({ equipes }: { equipes: Equipe[] }) {
  const [pending, startTransition] = useTransition();
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [movingId, setMovingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newEquipe, setNewEquipe] = useState(emptyNewEquipe);
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
        coach: f.coach ?? '',
        description: f.description ?? '',
        horaires: f.horaires ?? '',
        effectif: f.effectif,
        image_url: f.image_url ?? '',
      });
      setSavingId(null);
    });
  };

  const handleDelete = (id: string, categorie: string) => {
    if (!confirm(`Supprimer l'équipe "${categorie}" ? Cette action est irréversible.`)) return;
    setDeletingId(id);
    startTransition(async () => {
      await deleteEquipe(id);
      setDeletingId(null);
    });
  };

  const handleMove = (id: string, direction: 'up' | 'down') => {
    setMovingId(id);
    startTransition(async () => {
      await moveEquipe(id, direction);
      setMovingId(null);
    });
  };

  const handleCreate = () => {
    if (!newEquipe.categorie.trim()) {
      alert('Le nom de la catégorie est obligatoire.');
      return;
    }
    setCreating(true);
    startTransition(async () => {
      await createEquipe({
        ...newEquipe,
        ordre: equipes.length,
      });
      setNewEquipe(emptyNewEquipe);
      setShowForm(false);
      setCreating(false);
    });
  };

  const inputCls = 'w-full bg-[#141d3f] border border-[rgba(232,213,163,0.12)] focus:border-[#e8d5a3] focus:outline-none rounded px-3 py-2 text-sm text-[#f8f6f2] placeholder:text-[#8a96b8] transition-colors';

  return (
    <div>
      <div className="mb-6">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#e8d5a3] hover:bg-[#f0e0b8] text-[#0d1429] font-semibold py-2.5 px-5 rounded text-sm transition-colors"
          >
            + Ajouter une équipe
          </button>
        ) : (
          <div className="bg-[#1e2c56] border border-[#e8d5a3] rounded-[10px] p-6">
            <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-[#f8f6f2] mb-4">Nouvelle équipe</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Catégorie *</label>
                <input value={newEquipe.categorie} onChange={(e) => setNewEquipe((v) => ({ ...v, categorie: e.target.value }))} placeholder="Ex: U14/U15" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Tranche d&apos;âge</label>
                <input value={newEquipe.tranche_age} onChange={(e) => setNewEquipe((v) => ({ ...v, tranche_age: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Coach</label>
                <input value={newEquipe.coach} onChange={(e) => setNewEquipe((v) => ({ ...v, coach: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Description</label>
                <textarea value={newEquipe.description} onChange={(e) => setNewEquipe((v) => ({ ...v, description: e.target.value }))} rows={2} className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Horaires</label>
                <textarea value={newEquipe.horaires} onChange={(e) => setNewEquipe((v) => ({ ...v, horaires: e.target.value }))} rows={3} className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Effectif</label>
                <input type="number" value={newEquipe.effectif ?? ''} onChange={(e) => setNewEquipe((v) => ({ ...v, effectif: parseInt(e.target.value) || null }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Image URL</label>
                <input value={newEquipe.image_url} onChange={(e) => setNewEquipe((v) => ({ ...v, image_url: e.target.value }))} placeholder="https://..." className={inputCls} />
              </div>
              <div className="flex gap-3">
                <button onClick={handleCreate} disabled={creating}
                  className="flex-1 bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold py-2.5 rounded text-sm transition-colors">
                  {creating ? 'Création...' : 'Créer l\u2019équipe'}
                </button>
                <button onClick={() => { setShowForm(false); setNewEquipe(emptyNewEquipe); }}
                  className="bg-transparent border border-[rgba(232,213,163,0.3)] hover:border-[#e8d5a3] text-[#f8f6f2] font-semibold py-2.5 px-5 rounded text-sm transition-colors">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {equipes.map((equipe, index) => {
          const f = forms[equipe.id] ?? equipe;
          return (
            <div key={equipe.id} className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <button
                      onClick={() => handleMove(equipe.id, 'up')}
                      disabled={index === 0 || (pending && movingId === equipe.id)}
                      title="Monter"
                      className="text-[#8a96b8] hover:text-[#e8d5a3] disabled:opacity-20 disabled:hover:text-[#8a96b8] leading-none transition-colors"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => handleMove(equipe.id, 'down')}
                      disabled={index === equipes.length - 1 || (pending && movingId === equipe.id)}
                      title="Descendre"
                      className="text-[#8a96b8] hover:text-[#e8d5a3] disabled:opacity-20 disabled:hover:text-[#8a96b8] leading-none transition-colors"
                    >
                      ▼
                    </button>
                  </div>
                  <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-[#f8f6f2]">{equipe.categorie}</h2>
                </div>
                <button
                  onClick={() => handleDelete(equipe.id, equipe.categorie)}
                  disabled={pending && deletingId === equipe.id}
                  className="text-xs text-[#e07a7a] hover:text-[#ff9c9c] disabled:opacity-50 font-semibold uppercase tracking-widest transition-colors"
                >
                  {pending && deletingId === equipe.id ? 'Suppression...' : 'Supprimer'}
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Tranche d&apos;âge</label>
                  <input value={f.tranche_age ?? ''} onChange={(e) => handleChange(equipe.id, 'tranche_age', e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Coach</label>
                  <input value={f.coach ?? ''} onChange={(e) => handleChange(equipe.id, 'coach', e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Description</label>
                  <textarea value={f.description ?? ''} onChange={(e) => handleChange(equipe.id, 'description', e.target.value)} rows={2} className={`${inputCls} resize-none`} />
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
    </div>
  );
}
