import { getSettings } from '@/lib/settings';
import AccueilAdmin from './AccueilAdmin';
import { AdminPageHeader } from '@/components/admin/ui';

export default async function AdminAccueilPage() {
  const settings = await getSettings();

  return (
    <div>
      <AdminPageHeader title="Page d'accueil" description="Les chiffres clés et la phrase d'accroche affichés en haut du site." icon="⌂" />
      <AccueilAdmin settings={settings} />
    </div>
  );
}
