'use client';

import { useState, useTransition, useRef } from 'react';
import Image from 'next/image';
import type { Educateur } from '@/lib/types';
import { saveEducateur, deleteEducateur, toggleEducateur } from '../actions';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const PRESET = 'jem-foot'; // Upload preset Cloudinary (mode Unsigned)

const emptyForm = { nom: '', role: '', quote: '', photo_url: '', ordre: 99 };

async function uploadToCloudinary(file: File): Promise<string> {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', PRESET);
  fd.append('folder', 'jem-foot/educateurs');
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
    method: 'POST',
    body: fd,
  });
  if (!res.ok) throw new Error('Upload échoué');
  const data = await res.json();
  return data.secure_url as string;
}

export default function EducateursAdmin({ educateurs }: { educateurs: Educateur[] }) {
  const [pending, startTransition] = useTransition();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const inputCls = 'w-full bg-[#141d3f] border border-[rgba(232,213,163,0.12)] focus:border-[#e8d5a3] focus:outline-none rounded px-3 py-2 text-sm text-[#f8f6f2] placeholder:text-[#8a96b8] transition-colors';

  const startEdit = (e: Educateur) => {
    setEditingId(e.id);
    setForm({ nom: e.nom, role: e.role, quote: e.quote ?? '', photo_url: e.photo_url ?? '', ordre: e.ordre ?? 99 });
    setAdding(false);
    setUploadError('');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setUploadError('Fichier image requis'); return; }
    if (file.size > 10 * 1024 * 1024) { setUploadError('Fichier trop lourd (max 10 Mo)'); return; }
    setUploadError('');
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setForm(f => ({ ...f, photo_url: url }));
    } catch {
      setUploadError('Erreur upload — vérifiez le preset Cloudinary "jem-foot"');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleSave = () => {
    startTransition(async () => {
      await saveEducateur({ ...form, id: editingId ?? undefined });
      setAdding(false);
      setEditingId(null);
      setForm(emptyForm);
      setUploadError('');
    });
  };

  const FormPanel = () => (
    <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.12)] rounded-[10px] p-6 mb-6">
      <h3 className="font-[family-name:var(--font-bebas)] text-xl text-[#f8f6f2] mb-4">
        {editingId ? "Modifier l'éducateur" : 'Ajouter un éducateur'}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Nom</label>
          <input value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} placeholder="Prénom NOM" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Rôle</label>
          <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Responsable U10..." className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Citation / Description</label>
          <input value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} placeholder="Sa citation ou description..." className={inputCls} />
        </div>

        {/* Photo */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-2">Photo</label>
          <div className="flex gap-4 items-start">
            {/* Preview */}
            <div className="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden bg-[#141d3f] border border-[rgba(232,213,163,0.12)] flex items-center justify-center">
              {form.photo_url ? (
                <Image src={form.photo_url} alt="Aperçu" width={80} height={80} className="object-cover w-full h-full" unoptimized />
              ) : (
                <span className="text-[#8a96b8] text-2xl">⊙</span>
              )}
            </div>
            <div className="flex-1 space-y-2">
              {/* Upload button */}
              <div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className={`inline-flex items-center gap-2 cursor-pointer border border-[rgba(232,213,163,0.2)] hover:border-[#e8d5a3] bg-[#141d3f] hover:bg-[rgba(232,213,163,0.06)] text-[#e8d5a3] text-sm px-4 py-2 rounded transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  {uploading ? (
                    <>
                      <span className="w-3 h-3 border border-[#e8d5a3] border-t-transparent rounded-full animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>↑ Choisir une photo</>
                  )}
                </label>
              </div>
              {/* URL fallback */}
              <input
                value={form.photo_url}
                onChange={e => setForm(f => ({ ...f, photo_url: e.target.value }))}
                placeholder="ou coller une URL directement"
                className={inputCls}
              />
              {uploadError && (
                <p className="text-xs text-red-400">{uploadError}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1">Ordre d'affichage</label>
          <input type="number" value={form.ordre} onChange={e => setForm(f => ({ ...f, ordre: parseInt(e.target.value) || 99 }))} className={inputCls} />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={pending || uploading || !form.nom}
          className="bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold px-5 py-2.5 rounded text-sm transition-colors"
        >
          {pending ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
        <button
          onClick={() => { setAdding(false); setEditingId(null); setForm(emptyForm); setUploadError(''); }}
          className="text-sm text-[#8a96b8] hover:text-[#f8f6f2] px-3 py-2.5"
        >
          Annuler
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {(adding || editingId) && <FormPanel />}

      {!adding && !editingId && (
        <button
          onClick={() => setAdding(true)}
          className="mb-6 bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2] font-semibold px-5 py-2.5 rounded text-sm transition-colors"
        >
          + Ajouter un éducateur
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {educateurs.map(e => (
          <div
            key={e.id}
            className={`bg-[#1e2c56] border rounded-[10px] overflow-hidden ${e.actif ? 'border-[rgba(232,213,163,0.08)]' : 'border-[rgba(122,31,61,0.3)] opacity-60'}`}
          >
            <div className="relative aspect-square bg-[#141d3f]">
              {e.photo_url ? (
                <Image src={e.photo_url} alt={e.nom} fill className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-[family-name:var(--font-bebas)] text-4xl text-[#e8d5a3]">
                    {e.nom.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-0.5">{e.role}</p>
              <p className="text-sm font-semibold text-[#f8f6f2] mb-1">{e.nom}</p>
              {e.quote && <p className="text-xs text-[#8a96b8] line-clamp-2 italic">{e.quote}</p>}
              <div className="flex gap-2 mt-3">
                <button onClick={() => startEdit(e)} className="text-xs text-[#e8d5a3] hover:text-[#f2e8c6]">
                  Modifier
                </button>
                <button
                  onClick={() => startTransition(() => toggleEducateur(e.id, e.actif))}
                  disabled={pending}
                  className="text-xs text-[#8a96b8] hover:text-[#f8f6f2] disabled:opacity-50"
                >
                  {e.actif ? 'Masquer' : 'Afficher'}
                </button>
                <button
                  onClick={() => { if (confirm('Supprimer définitivement ?')) startTransition(() => deleteEducateur(e.id)); }}
                  disabled={pending}
                  className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
