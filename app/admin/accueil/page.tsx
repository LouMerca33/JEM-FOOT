import { getSettings } from '@/lib/settings';
import AccueilAdmin from './AccueilAdmin';

export default async function AdminAccueilPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.04em] text-[#f8f6f2] mb-2">Page d&apos;accueil</h1>
      <p className="text-sm text-[#8a96b8] mb-8">Les chiffres clés et la phrase d&apos;accroche affichés en haut du site.</p>
      <AccueilAdmin settings={settings} />
    </div>
  );
}
