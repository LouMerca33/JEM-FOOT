'use client';

import { useEffect, useState, useTransition } from 'react';
import { voteSondage, getSondageResults } from '@/app/actions/sondage';

type Option = { option_id: string; texte: string; votes: number };

interface Props {
  sondageId: string;
  question: string;
  initialResults: Option[];
}

function getVoterId(): string {
  const key = 'jem_voter_id';
  let id = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  if (!id) {
    id = crypto.randomUUID();
    if (typeof window !== 'undefined') localStorage.setItem(key, id);
  }
  return id;
}

export default function SondageWidget({ sondageId, question, initialResults }: Props) {
  const [pending, startTransition] = useTransition();
  const [results, setResults] = useState<Option[]>(initialResults);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // localStorage n'existe pas côté serveur : on ne peut lire l'état "a déjà
  // voté" qu'après le montage côté client, d'où l'effet plutôt qu'un state
  // initial (qui provoquerait un mismatch d'hydratation SSR/client).
  useEffect(() => {
    const voted = localStorage.getItem(`jem_voted_${sondageId}`);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- synchronise avec localStorage, un système externe, après le montage client uniquement.
    if (voted) setHasVoted(true);
  }, [sondageId]);

  const total = results.reduce((sum, r) => sum + r.votes, 0);

  const handleVote = (optionId: string) => {
    setError(null);
    startTransition(async () => {
      const voterId = getVoterId();
      const res = await voteSondage(sondageId, optionId, voterId);
      if (res.success) {
        localStorage.setItem(`jem_voted_${sondageId}`, '1');
        setHasVoted(true);
        const fresh = await getSondageResults(sondageId);
        setResults(fresh);
      } else {
        setError(res.error ?? 'Une erreur est survenue');
        setHasVoted(true); // évite de re-proposer le vote si déjà voté ailleurs
      }
    });
  };

  return (
    <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.12)] rounded-[10px] p-6 max-w-xl mx-auto">
      <h3 className="font-[family-name:var(--font-bebas)] text-2xl text-[#f8f6f2] mb-5">{question}</h3>

      {!hasVoted ? (
        <div className="space-y-2.5">
          {results.map((opt) => (
            <button
              key={opt.option_id}
              disabled={pending}
              onClick={() => handleVote(opt.option_id)}
              className="w-full text-left bg-[#141d3f] hover:bg-[#1a2650] border border-[rgba(232,213,163,0.15)] hover:border-[#e8d5a3] disabled:opacity-50 rounded px-4 py-3 text-sm text-[#f8f6f2] transition-colors"
            >
              {opt.texte}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((opt) => {
            const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
            return (
              <div key={opt.option_id}>
                <div className="flex justify-between text-sm text-[#f8f6f2] mb-1">
                  <span>{opt.texte}</span>
                  <span className="text-[#e8d5a3] font-semibold">{pct}%</span>
                </div>
                <div className="h-2 bg-[#141d3f] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7a1f3d] transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
          <p className="text-xs text-[#8a96b8] mt-3">
            {total} vote{total > 1 ? 's' : ''} · Merci pour votre participation !
          </p>
        </div>
      )}

      {error && !hasVoted && <p className="text-xs text-[#e07a7a] mt-3">{error}</p>}
    </div>
  );
}
