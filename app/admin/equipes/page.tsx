import { db, schema } from '@/lib/db';
import { asc } from 'drizzle-orm';
import type { Equipe } from '@/lib/types';
import EquipesAdmin from './EquipesAdmin';

export default async function AdminEquipesPage() {
  let equipes: Equipe[] = [];
  try {
    equipes = await db.select().from(schema.equipes).orderBy(asc(schema.equipes.ordre));
  } catch {}

  return (
    <div>
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.04em] text-[#f8f6f2] mb-8">Équipes</h1>
      <EquipesAdmin equipes={equipes} />
    </div>
  );
}
