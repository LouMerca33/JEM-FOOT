import type { ReactNode } from 'react';
import Link from 'next/link';

// ── Design tokens (admin) ──────────────────────────────────────────────────
// Repris de la charte du site public (navy/burgundy/cream), avec un peu plus
// de contraste et de profondeur pensés pour un outil de gestion plutôt
// qu'une page vitrine : cartes surélevées, ombres douces, accents dorés
// utilisés avec parcimonie.

export function AdminPageHeader({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: string;
  action?: ReactNode;
}) {
  return (
    <div className="relative -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 lg:-mx-8 lg:-mt-8 mb-8 overflow-hidden bg-[#141d3f] border-b border-[rgba(232,213,163,0.08)]">
      <div className="absolute inset-0 pitch-bg" />
      <div className="relative px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="flex items-start gap-4">
          {icon && (
            <span className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(122,31,61,0.35)] border border-[rgba(232,213,163,0.2)] items-center justify-center text-xl text-[#e8d5a3]">
              {icon}
            </span>
          )}
          <div>
            <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.04em] text-[#f8f6f2]">{title}</h1>
            {description && <p className="text-sm text-[#8a96b8] mt-1.5 max-w-xl">{description}</p>}
          </div>
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  );
}

export function AdminCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`bg-[#1e2c56] border border-[rgba(232,213,163,0.08)] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.18)] p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function AdminCardTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-bebas)] text-2xl tracking-[0.03em] text-[#f8f6f2] mb-4">
      {children}
    </h2>
  );
}

type BadgeTone = 'success' | 'neutral' | 'gold' | 'danger';

const badgeTones: Record<BadgeTone, string> = {
  success: 'bg-green-900/40 text-green-400',
  neutral: 'bg-[rgba(232,213,163,0.1)] text-[#8a96b8]',
  gold: 'bg-[rgba(232,213,163,0.15)] text-[#e8d5a3]',
  danger: 'bg-red-900/30 text-red-400',
};

export function AdminBadge({ tone, children }: { tone: BadgeTone; children: ReactNode }) {
  return (
    <span className={`inline-block text-xs px-2 py-0.5 rounded font-medium ${badgeTones[tone]}`}>
      {children}
    </span>
  );
}

export function AdminPrimaryButton({
  children,
  onClick,
  disabled,
  type = 'button',
  href,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  href?: string;
  className?: string;
}) {
  const cls = `inline-block bg-[#7a1f3d] hover:bg-[#9c2b4f] disabled:opacity-50 text-[#f8f6f2] font-semibold px-5 py-2.5 rounded-lg text-sm shadow-[0_2px_10px_rgba(122,31,61,0.35)] hover:shadow-[0_2px_14px_rgba(122,31,61,0.5)] transition-all ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function AdminEmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="text-center py-12 text-sm text-[#8a96b8]">
      {children}
    </div>
  );
}
