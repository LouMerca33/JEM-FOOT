import { db, schema } from '@/lib/db';

export const DEFAULT_SETTINGS = {
  stat1_value: '120+',
  stat1_label: 'Licenciés cette saison',
  stat2_value: 'U7–U13',
  stat2_label: 'Toutes catégories',
  stat3_value: '2022',
  stat3_label: 'Fondation du club',
  stat4_value: '15+',
  stat4_label: 'Éducateurs formés FFF',
  hero_tagline: 'Respect · Plaisir · Engagement · Collectif',
} as const;

export type SettingKey = keyof typeof DEFAULT_SETTINGS;

// Fusionne les valeurs par défaut avec ce qui est en base (si la table
// n'existe pas encore ou est vide, on retombe sur les valeurs par défaut —
// rien ne casse tant que le SQL de site_settings n'a pas été exécuté).
export async function getSettings(): Promise<Record<SettingKey, string>> {
  const result: Record<string, string> = { ...DEFAULT_SETTINGS };
  try {
    const rows = await db.select().from(schema.siteSettings);
    for (const row of rows) {
      result[row.key] = row.value;
    }
  } catch {
    // Table absente : on garde les valeurs par défaut.
  }
  return result as Record<SettingKey, string>;
}
