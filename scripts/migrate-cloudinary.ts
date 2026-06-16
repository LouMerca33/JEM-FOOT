/**
 * Migration WordPress → Cloudinary
 * - Upload toutes les images WP en DB vers Cloudinary
 * - Met à jour les records en base
 * - Met à jour les URLs hardcodées dans le code
 */

import { v2 as cloudinary } from 'cloudinary';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../lib/schema';
import { eq } from 'drizzle-orm';
import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';

// ── Config ───────────────────────────────────────────────────────────────────

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key:    process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const sql = neon(process.env.DATABASE_URL!);
const db  = drizzle(sql, { schema });

const WP = 'jem-foot.fr';
const cache = new Map<string, string>(); // WP url → Cloudinary url
let uploaded = 0, skipped = 0, errors = 0;

// ── Helpers ──────────────────────────────────────────────────────────────────

function isWp(url: string | null | undefined): url is string {
  return !!url && url.includes(WP);
}

async function migrate(wpUrl: string, folder: string): Promise<string> {
  if (!isWp(wpUrl)) return wpUrl;
  if (cache.has(wpUrl)) { skipped++; return cache.get(wpUrl)!; }

  const filename = wpUrl.split('/').pop()!.replace(/\.[^.]+$/, '');
  try {
    const res = await cloudinary.uploader.upload(wpUrl, {
      folder:     `jem-foot/${folder}`,
      public_id:  filename,
      overwrite:  true,
    });
    cache.set(wpUrl, res.secure_url);
    console.log(`  ✓ ${filename}`);
    uploaded++;
    return res.secure_url;
  } catch (err: any) {
    console.error(`  ✗ ${filename}: ${err.message}`);
    errors++;
    return wpUrl; // garde l'original en cas d'erreur
  }
}

// ── Migration DB ──────────────────────────────────────────────────────────────

async function migrateDB() {
  console.log('\n📦 Migration base de données...\n');

  // Éducateurs
  console.log('→ Éducateurs');
  const educateurs = await db.select().from(schema.educateurs);
  for (const e of educateurs) {
    if (!isWp(e.photo_url)) continue;
    const url = await migrate(e.photo_url, 'educateurs');
    if (url !== e.photo_url) {
      await db.update(schema.educateurs)
        .set({ photo_url: url })
        .where(eq(schema.educateurs.id, e.id));
    }
  }

  // Équipes
  console.log('→ Équipes');
  const equipes = await db.select().from(schema.equipes);
  for (const e of equipes) {
    if (!isWp(e.image_url)) continue;
    const url = await migrate(e.image_url, 'equipes');
    if (url !== e.image_url) {
      await db.update(schema.equipes)
        .set({ image_url: url })
        .where(eq(schema.equipes.id, e.id));
    }
  }

  // Partenaires
  console.log('→ Partenaires');
  const partenaires = await db.select().from(schema.partenaires);
  for (const p of partenaires) {
    if (!isWp(p.logo_url)) continue;
    const url = await migrate(p.logo_url, 'partenaires');
    if (url !== p.logo_url) {
      await db.update(schema.partenaires)
        .set({ logo_url: url })
        .where(eq(schema.partenaires.id, p.id));
    }
  }

  // Articles
  console.log('→ Articles');
  const articles = await db.select().from(schema.articles);
  for (const a of articles) {
    if (!isWp(a.image_url)) continue;
    const url = await migrate(a.image_url, 'articles');
    if (url !== a.image_url) {
      await db.update(schema.articles)
        .set({ image_url: url })
        .where(eq(schema.articles.id, a.id));
    }
  }

  // Galerie
  console.log('→ Galerie');
  const galerie = await db.select().from(schema.galerie);
  for (const g of galerie) {
    if (!isWp(g.image_url)) continue;
    const url = await migrate(g.image_url, 'galerie');
    if (url !== g.image_url) {
      await db.update(schema.galerie)
        .set({ image_url: url })
        .where(eq(schema.galerie.id, g.id));
    }
  }
}

// ── Migration code ────────────────────────────────────────────────────────────

async function migrateCode() {
  console.log('\n📝 Migration fichiers code...\n');

  const files = globSync([
    'app/**/*.tsx',
    'components/**/*.tsx',
  ]);

  for (const file of files) {
    let content = readFileSync(file, 'utf8');
    let changed = false;

    // Trouver toutes les URLs WP dans ce fichier
    const matches = content.match(/https?:\/\/jem-foot\.fr\/wp-content\/uploads\/[^\s"'`]+/g);
    if (!matches) continue;

    const unique = [...new Set(matches)];

    // Déduire le dossier depuis le contexte du fichier
    const folder =
      file.includes('educateur') ? 'educateurs' :
      file.includes('equipe')    ? 'equipes' :
      file.includes('partenaire')? 'partenaires' :
      file.includes('boutique')  ? 'boutique' :
      file.includes('galerie')   ? 'galerie' :
      file.includes('Navbar') || file.includes('HeroVideo') || file.includes('Footer') ? 'logo' :
      file.includes('Stade')     ? 'stade' :
      file.includes('News')      ? 'articles' :
      file.includes('Teams')     ? 'equipes' :
      'misc';

    for (const wpUrl of unique) {
      const newUrl = await migrate(wpUrl, folder);
      if (newUrl !== wpUrl) {
        content = content.replaceAll(wpUrl, newUrl);
        changed = true;
      }
    }

    if (changed) {
      writeFileSync(file, content, 'utf8');
      console.log(`  ✓ ${file}`);
    }
  }
}

// ── Seed.ts ───────────────────────────────────────────────────────────────────

async function migrateSeed() {
  console.log('\n🌱 Migration seed.ts...\n');
  const file = 'scripts/seed.ts';
  let content = readFileSync(file, 'utf8');
  let changed = false;

  const matches = content.match(/https?:\/\/jem-foot\.fr\/wp-content\/uploads\/[^\s"'`]+/g);
  if (matches) {
    for (const wpUrl of [...new Set(matches)]) {
      // Déduire le dossier
      const folder =
        wpUrl.includes('Luiggy') || wpUrl.includes('Capture-decran') || wpUrl.includes('Yassine') || wpUrl.includes('WhatsApp') ? 'educateurs' :
        wpUrl.includes('U7') || wpUrl.includes('U8') || wpUrl.includes('U9') || wpUrl.includes('U10') || wpUrl.includes('U11') || wpUrl.includes('U13') || wpUrl.includes('JEM-U') ? 'equipes' :
        wpUrl.includes('MercadierLab') || wpUrl.includes('Sport') || wpUrl.includes('Barber') || wpUrl.includes('Auto') || wpUrl.includes('JSA') || wpUrl.includes('SPUC') ? 'partenaires' :
        'misc';

      const newUrl = await migrate(wpUrl, folder);
      if (newUrl !== wpUrl) {
        content = content.replaceAll(wpUrl, newUrl);
        changed = true;
      }
    }
  }

  if (changed) {
    writeFileSync(file, content, 'utf8');
    console.log(`  ✓ seed.ts mis à jour`);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Migration WordPress → Cloudinary\n');
  console.log(`Cloud: ${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`);

  await migrateDB();
  await migrateCode();
  await migrateSeed();

  console.log(`\n✅ Terminé — ${uploaded} uploadées, ${skipped} en cache, ${errors} erreurs`);

  if (cache.size > 0) {
    console.log('\n📋 Mapping complet :');
    for (const [wp, cdn] of cache) {
      console.log(`  ${wp.split('/').pop()} → ${cdn.split('/').slice(-2).join('/')}`);
    }
  }
}

main().catch(console.error);
