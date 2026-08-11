'use client';

import { useState, useTransition } from 'react';
import { saveSettings } from '../actions';
import type { SettingKey } from '@/lib/settings';

export default function AccueilAdmin({ settings }: { settings: Record<SettingKey, string> }) {
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const inputCls = 'w-full bg-[#141d3f] border border-[rgba(232,213,163,0.12)] focus:border-[#e8d5a3] focus:outline-none rounded px-3 py-2 text-sm text-[#f8f6f2] placeholder:text-[#8a96b8] transition-colors';

  const set = (key: SettingKey, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    startTransition(async () => {
      await saveSettings(form);
      setSaved(true);
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6">
        <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-[#f8f6f2] mb-4">Chiffres clés</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {([1, 2, 3, 4] as const).map((n) => (
            <div key={n} className="bg-[#141d3f] rounded p-4 space-y-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Valeur {n}</label>
                <input
                  value={form[`stat${n}_value` as SettingKey]}
                  onChange={(e) => set(`stat${n}_value` as SettingKey, e.target.value)}
                  placeholder="Ex: 120+"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Légende {n}</label>
                <input
                  value={form[`stat${n}_label` as SettingKey]}
                  onChange={(e) => set(`stat${n}_label` as SettingKey, e.target.value)}
                  placeholder="Ex: Licenciés cette saison"
                  className={inputCls}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6">
        <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-[#f8f6f2] mb-4">Phrase d&apos;accroche</h2>
        <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Sous-titre de la bannière d&apos;accueil</label>
        <input
          value={form.hero_tagline}
          onChange={(e) => set('hero_tagline', e.target.value)}
          className={inputCls}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={pending}
          className="bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold px-6 py-2.5 rounded text-sm transition-colors"
        >
          {pending ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        {saved && !pending && <span className="text-sm text-green-400">Enregistré ✓</span>}
      </div>
    </div>
  );
}
