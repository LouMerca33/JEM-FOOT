'use client';

import { useState } from 'react';

const objets = ['Inscription', 'Question', 'Partenariat', 'Autre'];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ nom: '', email: '', objet: 'Inscription', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // mailto fallback — replace with API route when backend is set up
    const mailtoLink = `mailto:secretariat.em@gmail.fr?subject=${encodeURIComponent(`[${form.objet}] ${form.nom}`)}&body=${encodeURIComponent(`Nom: ${form.nom}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailtoLink;
    setStatus('sent');
  };

  const inputCls = 'w-full bg-[#141d3f] border border-[rgba(232,213,163,0.12)] hover:border-[rgba(232,213,163,0.25)] focus:border-[#e8d5a3] focus:outline-none rounded px-4 py-3 text-sm text-[#f8f6f2] placeholder:text-[#8a96b8] transition-colors';

  return (
    <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-[10px] p-6 sm:p-8">
      <h2 className="font-[family-name:var(--font-bebas)] text-3xl text-[#f8f6f2] mb-6">
        Envoyer un message
      </h2>

      {status === 'sent' ? (
        <div className="text-center py-8">
          <p className="text-[#e8d5a3] font-semibold mb-2">Message envoyé !</p>
          <p className="text-sm text-[#8a96b8]">Nous vous répondrons dans les meilleurs délais.</p>
          <button
            onClick={() => setStatus('idle')}
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

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold py-3.5 rounded text-sm transition-colors"
          >
            {status === 'sending' ? 'Envoi...' : 'Envoyer le message'}
          </button>
        </form>
      )}
    </div>
  );
}
