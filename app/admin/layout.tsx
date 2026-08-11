import type { Metadata } from 'next';
import AdminChrome from '@/components/admin/AdminChrome';

export const metadata: Metadata = {
  title: 'Admin — J.E.M',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminChrome>{children}</AdminChrome>;
}
