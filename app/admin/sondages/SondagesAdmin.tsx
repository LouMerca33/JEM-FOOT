'use client';

import { useState, useTransition } from 'react';
import {
  createSondage,
  toggleSondage,
  deleteSondage,
  addSondageOption,
  deleteSondageOption,
} from '../actions';
import type { SondageWithOptions } from './page';

export default function SondagesAdmin({ sondages }: { sondages: SondageWithOptions[] }) {
  const [pending, startTransition] = useTransition();
  const [creating, setCreating] = useState(false);
  const [question, setQuestion] = useState('');
  const [newOptionText, setNewOptionText] = useState<Record<string, string>>({});

  const inputCls = 'w-full bg-[#141d3f] border border-[rgba(232,213,163,0.12)] focus:border-[#e8d5a3] focus:outline-none rounded px-3 py-2 text-sm text-[#f8f6f2] placeholder:text-[#8a96b8] transition-colors';

  const handleCreate = () => {
    if (!question.trim()) return;
    startTransition(async () => {
      await createSondage(question.trim());
      setQuestion('');
      setCreating(false);
    });
  };

  const handleAddOption = (sondageId: string, ordre: number) => {
    const texte = (newOptionText[sondageId] ?? '').trim();
    if (!texte) return;
    startTransition(async () => {
      await addSondageOption(sondageId, texte, ordre);
      setNewOptionText((v) => ({ ...v, [sondageId]: '' }));
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.18)] p-6">
        {!creating ? (
          <button onClick={() => setCreating(true)} className="text-sm text-[#e8d5a3] hover:text-[#f2e8c6] transition-colors">
            + Créer un sondage
          </button>
        ) : (
          <>
            <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-[#f8f6f2] mb-4">Nouveau sondage</h2>
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Question</label>
              <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ex: Joueur du mois ?" className={inputCls} />
            </div>
            <div className="flex gap-3">
              <button onClick={handleCreate} disabled={pending || !question.trim()}
                className="bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold px-5 py-2.5 rounded text-sm transition-colors">
                {pending ? 'Création...' : 'Créer'}
              </button>
              <button onClick={() => { setCreating(false); setQuestion(''); }} className="text-sm text-[#8a96b8] hover:text-[#f8f6f2] px-3 py-2.5">Annuler</button>
            </div>
            <p className="text-xs text-[#8a96b8] mt-3">Tu pourras ajouter les options de réponse juste après la création.</p>
          </>
        )}
      </div>

      <div className="space-y-4">
        {sondages.map((s) => {
          const total = s.options.reduce((sum, o) => sum + o.votes, 0);
          return (
            <div key={s.id} className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.18)] p-6">
              <div className="flex items-start justify-between mb-4 gap-4">
                <div>
                  <h3 className="font-[family-name:var(--font-bebas)] text-2xl text-[#f8f6f2]">{s.question}</h3>
                  <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${s.actif ? 'bg-green-900/40 text-green-400' : 'bg-[rgba(232,213,163,0.1)] text-[#8a96b8]'}`}>
                    {s.actif ? 'Actif — visible sur le site' : 'Inactif'}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => startTransition(() => toggleSondage(s.id, s.actif))}
                    disabled={pending}
                    className="text-xs text-[#8a96b8] hover:text-[#f8f6f2] disabled:opacity-50 transition-colors"
                  >
                    {s.actif ? 'Désactiver' : 'Activer'}
                  </button>
                  <button
                    onClick={() => { if (confirm('Supprimer ce sondage et tous ses votes ?')) startTransition(() => deleteSondage(s.id)); }}
                    disabled={pending}
                    className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors"
                  >
                    Suppr.
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {s.options.map((o) => (
                  <div key={o.id} className="flex items-center justify-between bg-[#141d3f] rounded px-3 py-2">
                    <span className="text-sm text-[#f8f6f2]">{o.texte}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#8a96b8]">
                        {o.votes} vote{o.votes !== 1 ? 's' : ''}{total > 0 ? ` · ${Math.round((o.votes / total) * 100)}%` : ''}
                      </span>
                      <button
                        onClick={() => { if (confirm('Supprimer cette option ?')) startTransition(() => deleteSondageOption(o.id)); }}
                        disabled={pending}
                        className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors"
                      >
                        Suppr.
                      </button>
                    </div>
                  </div>
                ))}
                {s.options.length === 0 && (
                  <p className="text-xs text-[#8a96b8] italic">Aucune option pour l&apos;instant — ajoutes-en au moins deux.</p>
                )}
              </div>

              <div className="flex gap-3">
                <input
                  value={newOptionText[s.id] ?? ''}
                  onChange={(e) => setNewOptionText((v) => ({ ...v, [s.id]: e.target.value }))}
                  placeholder="Nouvelle option de réponse"
                  className={inputCls}
                />
                <button
                  onClick={() => handleAddOption(s.id, s.options.length)}
                  disabled={pending || !(newOptionText[s.id] ?? '').trim()}
                  className="flex-shrink-0 bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold px-4 py-2 rounded text-sm transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </div>
          );
        })}
        {sondages.length === 0 && (
          <p className="text-sm text-[#8a96b8] italic">Aucun sondage pour l&apos;instant.</p>
        )}
      </div>
    </div>
  );
}
