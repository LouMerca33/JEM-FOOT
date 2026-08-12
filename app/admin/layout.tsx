import type { Metadata } from 'next';
import { db, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';
import AdminChrome from '@/components/admin/AdminChrome';

export const metadata: Metadata = {
  title: 'Admin — J.E.M',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let unreadCount = 0;
  try {
    const unread = await db.select().from(schema.contactMessages).where(eq(schema.contactMessages.lu, false));
    unreadCount = unread.length;
  } catch {}

  return <AdminChrome unreadCount={unreadCount}>{children}</AdminChrome>;
}
