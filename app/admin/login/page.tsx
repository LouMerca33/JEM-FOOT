import type { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Connexion Admin — J.E.M',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0d1429] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-[#e8d5a3] flex items-center justify-center mb-4">
            <span className="font-[family-name:var(--font-bebas)] text-2xl tracking-[0.1em] text-[#e8d5a3]">JEM</span>
          </div>
          <h1 className="font-[family-name:var(--font-bebas)] text-3xl tracking-[0.06em] text-[#f8f6f2]">
            Espace Admin
          </h1>
          <p className="text-sm text-[#8a96b8] mt-1">Jeunes Espoirs Mérignacais</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
