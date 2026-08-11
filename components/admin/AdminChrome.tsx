'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Pas de sidebar admin sur l'écran de connexion : ni utile avant d'être
  // authentifié, ni responsive avec un formulaire de login déjà centré.
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0d1429] flex flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
