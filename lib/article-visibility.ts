import { and, eq, isNull, lte, or } from 'drizzle-orm';
import { schema } from '@/lib/db';

// Un article est visible publiquement s'il est marqué publié ET que sa date
// de publication programmée (le cas échéant) est passée.
export const articleVisibleWhere = and(
  eq(schema.articles.publie, true),
  or(isNull(schema.articles.publish_at), lte(schema.articles.publish_at, new Date())),
);
