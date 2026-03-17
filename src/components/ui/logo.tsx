import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { icon: 24, full: { w: 150, h: 24 } },
  md: { icon: 32, full: { w: 200, h: 32 } },
  lg: { icon: 40, full: { w: 250, h: 40 } },
};

export function Logo({ variant = 'full', size = 'md', className }: LogoProps) {
  const s = sizes[size];

  if (variant === 'icon') {
    return (
      <Image
        src="/logo-icon.svg"
        alt="BuatPerjanjian"
        width={s.icon}
        height={s.icon}
        className={cn('shrink-0', className)}
        priority
      />
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Image
        src="/logo-icon.svg"
        alt=""
        width={s.icon}
        height={s.icon}
        className="shrink-0"
        priority
      />
      <span
        className={cn(
          'font-bold tracking-tight text-slate-900 dark:text-zinc-100',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-base',
          size === 'lg' && 'text-lg',
        )}
      >
        Buat<span className="text-orange-500 dark:text-orange-400">Perjanjian</span>
      </span>
    </div>
  );
}
