'use client';

import { useTransition } from 'react';
import type { ContactMessage } from '@/lib/types';
import { markMessageRead, deleteMessage } from '../actions';
import { AdminBadge, AdminEmptyState } from '@/components/admin/ui';

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function MessagesAdmin({ messages }: { messages: ContactMessage[] }) {
  const [pending, startTransition] = useTransition();

  if (messages.length === 0) {
    return (
      <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.18)]">
        <AdminEmptyState>Aucun message pour l&apos;instant.</AdminEmptyState>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`bg-[#1e2c56] border rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.18)] p-5 transition-colors ${
            m.lu ? 'border-[rgba(232,213,163,0.08)]' : 'border-[rgba(232,213,163,0.3)]'
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-[#f8f6f2]">{m.nom}</p>
                {!m.lu && <AdminBadge tone="gold">Nouveau</AdminBadge>}
                {m.objet && <AdminBadge tone="neutral">{m.objet}</AdminBadge>}
              </div>
              <a href={`mailto:${m.email}`} className="text-xs text-[#8a96b8] hover:text-[#e8d5a3] transition-colors">
                {m.email}
              </a>
            </div>
            <p className="text-xs text-[#8a96b8] flex-shrink-0">{formatDate(m.created_at)}</p>
          </div>

          <p className="text-sm text-[#c3cbe0] whitespace-pre-line leading-relaxed mb-4">{m.message}</p>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.objet ?? 'votre message'}`)}`}
              className="text-xs font-semibold text-[#e8d5a3] hover:text-[#f2e8c6] transition-colors"
            >
              Répondre par email
            </a>
            <button
              onClick={() => startTransition(() => markMessageRead(m.id, m.lu))}
              disabled={pending}
              className="text-xs text-[#8a96b8] hover:text-[#f8f6f2] disabled:opacity-50 transition-colors"
            >
              {m.lu ? 'Marquer non lu' : 'Marquer lu'}
            </button>
            <button
              onClick={() => { if (confirm('Supprimer ce message ?')) startTransition(() => deleteMessage(m.id)); }}
              disabled={pending}
              className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors"
            >
              Suppr.
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
