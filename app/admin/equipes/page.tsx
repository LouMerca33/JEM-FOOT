import { db, schema } from '@/lib/db';
import { asc } from 'drizzle-orm';
import type { Equipe } from '@/lib/types';
import EquipesAdmin from './EquipesAdmin';
import { AdminPageHeader } from '@/components/admin/ui';

export default async function AdminEquipesPage() {
  let equipes: Equipe[] = [];
  try {
    equipes = await db.select().from(schema.equipes).orderBy(asc(schema.equipes.ordre));
  } catch {}

  return (
    <div>
      <AdminPageHeader title="Équipes" description="Catégories, coachs, horaires et photos affichés sur /nos-equipes." icon="⊛" />
      <EquipesAdmin equipes={equipes} />
    </div>
  );
}
