'use client';

import { useState, useTransition, useRef } from 'react';
import Image from 'next/image';
import type { GaleriePhoto, GalerieCategorie } from '@/lib/types';
import { addGaleriePhoto, deleteGaleriePhoto } from '../actions';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const PRESET = 'jem-foot';
const categories: GalerieCategorie[] = ['Match', 'Entraînement', 'Événement'];

async function uploadToCloudinary(file: File): Promise<string> {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', PRESET);
  fd.append('folder', 'jem-foot/galerie');
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: 'POST', body: fd });
  if (!res.ok) throw new Error('Upload échoué');
  return (await res.json()).secure_url as string;
}

export default function GalerieAdmin({ photos }: { photos: GaleriePhoto[] }) {
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({ image_url: '', titre: '', categorie: 'Match' as GalerieCategorie, equipe: '', date_photo: '' });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const inputCls = 'w-full bg-[#141d3f] border border-[rgba(232,213,163,0.12)] focus:border-[#e8d5a3] focus:outline-none rounded px-3 py-2 text-sm text-[#f8f6f2] placeholder:text-[#8a96b8] transition-colors';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadError('');
    setUploading(true);
    try {
      // Upload toutes les images sélectionnées en parallèle
      const urls = await Promise.all(Array.from(files).map(uploadToCloudinary));
      // Ajoute chaque photo directement en base
      startTransition(async () => {
        for (const url of urls) {
          await addGaleriePhoto({ ...form, image_url: url });
        }
        setForm(f => ({ ...f, image_url: '' }));
      });
    } catch {
      setUploadError('Erreur upload — vérifiez le preset Cloudinary "jem-foot"');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleAdd = () => {
    if (!form.image_url) return;
    startTransition(async () => {
      await addGaleriePhoto(form);
      setForm(f => ({ ...f, image_url: '' }));
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.18)] p-6">
        <h2 className="font-[family-name:var(--font-bebas)] text-2xl text-[#f8f6f2] mb-4">Ajouter des photos</h2>

        {/* Catégorie + Équipe d'abord */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1.5">Catégorie</label>
            <select value={form.categorie} onChange={e => setForm(f => ({ ...f, categorie: e.target.value as GalerieCategorie }))} className={inputCls}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-1.5">Équipe</label>
            <input value={form.equipe} onChange={e => setForm(f => ({ ...f, equipe: e.target.value }))} placeholder="U9, U11..." className={inputCls} />
          </div>
        </div>

        {/* Upload multi-fichiers */}
        <div className="mb-4">
          <label className="block text-xs font-bold uppercase tracking-widest text-[#e8d5a3] mb-2">Photos</label>
          <div className="flex flex-col sm:flex-row gap-3 items-start">
            <div>
              <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" id="galerie-upload" />
              <label
                htmlFor="galerie-upload"
                className={`inline-flex items-center gap-2 cursor-pointer border border-[rgba(232,213,163,0.2)] hover:border-[#e8d5a3] bg-[#141d3f] hover:bg-[rgba(232,213,163,0.06)] text-[#e8d5a3] text-sm px-4 py-2.5 rounded transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {uploading ? (
                  <><span className="w-3 h-3 border border-[#e8d5a3] border-t-transparent rounded-full animate-spin" />Envoi en cours…</>
                ) : (
                  <>↑ Choisir des photos (sélection multiple)</>
                )}
              </label>
            </div>
            <div className="flex-1">
              <input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="ou coller une URL directement" className={inputCls} />
            </div>
          </div>
          {uploadError && <p className="text-xs text-red-400 mt-2">{uploadError}</p>}
        </div>

        {form.image_url && (
          <button onClick={handleAdd} disabled={pending || uploading}
            className="bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold px-5 py-2.5 rounded text-sm transition-colors">
            {pending ? 'Ajout...' : 'Ajouter (URL)'}
          </button>
        )}
      </div>

      {/* Grid */}
      {photos.length === 0 ? (
        <p className="text-sm text-[#8a96b8] text-center py-8">Aucune photo pour l&apos;instant.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map(p => (
            <div key={p.id} className="relative group rounded-[8px] overflow-hidden border border-[rgba(232,213,163,0.08)] aspect-square">
              <Image src={p.image_url} alt={p.titre ?? ''} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-[rgba(13,20,41,0)] group-hover:bg-[rgba(13,20,41,0.6)] transition-colors flex items-center justify-center">
                <button
                  onClick={() => { if (confirm('Supprimer ?')) startTransition(() => deleteGaleriePhoto(p.id)); }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-700 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded"
                >
                  Supprimer
                </button>
              </div>
              {p.categorie && (
                <span className="absolute top-2 left-2 bg-[rgba(13,20,41,0.8)] text-[#e8d5a3] text-xs px-2 py-0.5 rounded">
                  {p.equipe ? `${p.equipe} · ` : ''}{p.categorie}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
