'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? 'Identifiants incorrects.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  const inputCls = 'w-full bg-[#141d3f] border border-[rgba(232,213,163,0.12)] hover:border-[rgba(232,213,163,0.25)] focus:border-[#e8d5a3] focus:outline-none rounded px-4 py-3 text-sm text-[#f8f6f2] placeholder:text-[#8a96b8] transition-colors';

  return (
    <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.1)] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.18)] p-8">
      {error && (
        <div className="bg-[rgba(122,31,61,0.2)] border border-[rgba(122,31,61,0.4)] rounded px-4 py-3 mb-5 text-sm text-[#f8f6f2]">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1.5">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.fr" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1.5">Mot de passe</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputCls} />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold py-3.5 rounded text-sm transition-colors">
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}
