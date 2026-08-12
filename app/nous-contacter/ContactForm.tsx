'use client';

import { useState, useTransition } from 'react';
import { sendContactMessage } from '@/app/actions/contact';

const objets = ['Inscription', 'Question', 'Partenariat', 'Autre'];

export default function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nom: '', email: '', objet: 'Inscription', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    startTransition(async () => {
      const res = await sendContactMessage(form);
      if (res.success) {
        setStatus('sent');
      } else {
        setStatus('error');
        setError(res.error ?? 'Une erreur est survenue.');
      }
    });
  };

  const inputCls = 'w-full bg-[#141d3f] border border-[rgba(232,213,163,0.12)] hover:border-[rgba(232,213,163,0.25)] focus:border-[#e8d5a3] focus:outline-none rounded px-4 py-3 text-sm text-[#f8f6f2] placeholder:text-[#8a96b8] transition-colors';

  return (
    <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.18)] p-6 sm:p-8">
      <h2 className="font-[family-name:var(--font-bebas)] text-3xl text-[#f8f6f2] mb-6">
        Envoyer un message
      </h2>

      {status === 'sent' ? (
        <div className="text-center py-8">
          <p className="text-[#e8d5a3] font-semibold mb-2">Message envoyé !</p>
          <p className="text-sm text-[#8a96b8]">Nous vous répondrons dans les meilleurs délais.</p>
          <button
            onClick={() => { setStatus('idle'); setForm({ nom: '', email: '', objet: 'Inscription', message: '' }); }}
            className="mt-6 text-sm text-[#e8d5a3] hover:text-[#f2e8c6]"
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1.5">Nom</label>
              <input name="nom" required value={form.nom} onChange={handleChange} placeholder="Votre nom" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1.5">Email</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="votre@email.fr" className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1.5">Objet</label>
            <select name="objet" value={form.objet} onChange={handleChange} className={inputCls}>
              {objets.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1.5">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Votre message..."
              className={`${inputCls} resize-none`}
            />
          </div>

          {status === 'error' && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold py-3.5 rounded text-sm transition-colors"
          >
            {pending ? 'Envoi...' : 'Envoyer le message'}
          </button>
        </form>
      )}
    </div>
  );
}
