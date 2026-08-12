import { db, schema } from '@/lib/db';
import { desc } from 'drizzle-orm';
import type { ContactMessage } from '@/lib/types';
import MessagesAdmin from './MessagesAdmin';
import { AdminPageHeader } from '@/components/admin/ui';

export default async function AdminMessagesPage() {
  let messages: ContactMessage[] = [];
  try {
    messages = await db.select().from(schema.contactMessages).orderBy(desc(schema.contactMessages.created_at));
  } catch {}

  const nonLus = messages.filter((m) => !m.lu).length;

  return (
    <div>
      <AdminPageHeader
        title="Messages"
        description={`Ce que les visiteurs envoient via le formulaire de contact.${nonLus > 0 ? ` ${nonLus} non lu${nonLus > 1 ? 's' : ''}.` : ''}`}
        icon="✉"
      />
      <MessagesAdmin messages={messages} />
    </div>
  );
}
