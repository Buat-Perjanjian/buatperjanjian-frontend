'use client';

import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Settings02Icon,
  File02Icon,
  SecurityCheckIcon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons';
import { useAuth } from '@/features/auth/hooks/useAuth';

export function NavCard() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  const links = [
    { href: '/templates', label: 'Template', icon: File02Icon },
    { href: '/settings', label: 'Pengaturan', icon: Settings02Icon },
    ...(isAdmin ? [{ href: '/admin', label: 'Admin', icon: SecurityCheckIcon }] : []),
  ];

  return (
    <div className="space-y-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
        >
          <div className="flex items-center gap-2.5">
            <HugeiconsIcon icon={link.icon} size={16} color="currentColor" />
            {link.label}
          </div>
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} color="currentColor" className="opacity-40" />
        </Link>
      ))}
    </div>
  );
}
