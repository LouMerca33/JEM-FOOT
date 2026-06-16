import Link from 'next/link';

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
}

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
}: Props) {
  const base = 'inline-flex items-center justify-center font-semibold rounded transition-all duration-200';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variants = {
    primary: 'bg-[#7a1f3d] hover:bg-[#9c2b4f] text-[#f8f6f2]',
    outline: 'border border-[rgba(232,213,163,0.4)] hover:border-[#e8d5a3] text-[#e8d5a3] hover:bg-[rgba(232,213,163,0.08)]',
  };

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return <Link href={href} className={cls}>{children}</Link>;
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
