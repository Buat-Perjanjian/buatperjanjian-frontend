'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Logo } from '@/components/ui/logo';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Logout03Icon,
  Home09Icon,
  File02Icon,
  Settings02Icon,
  SecurityCheckIcon,
  UserIcon,
  Menu01Icon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { IconSvgElement } from '@hugeicons/react';

interface NavItem {
  href: string;
  label: string;
  icon: IconSvgElement;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home09Icon },
  { href: '/documents', label: 'Dokumen', icon: File02Icon },
  { href: '/templates', label: 'Template', icon: File02Icon },
  { href: '/settings', label: 'Pengaturan', icon: Settings02Icon },
];

const adminNavItems: NavItem[] = [
  { href: '/admin', label: 'Admin', icon: SecurityCheckIcon },
];

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  const allNav = isAdmin ? [...navItems, ...adminNavItems] : navItems;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
            {/* Left: Logo + Nav */}
            <div className="flex items-center gap-8">
              <Link href="/dashboard">
                <Logo size="sm" />
              </Link>

              {/* Desktop nav */}
              <nav className="hidden items-center gap-1 md:flex">
                {allNav.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/dashboard' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300'
                          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200'
                      )}
                    >
                      <HugeiconsIcon icon={item.icon} size={14} color="currentColor" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="hidden items-center gap-2 rounded-lg border border-slate-100 px-3 py-1.5 sm:flex dark:border-zinc-700 dark:bg-zinc-800">
                <HugeiconsIcon icon={UserIcon} size={14} color="currentColor" className="text-slate-300 dark:text-zinc-500" />
                <span className="text-xs font-medium text-slate-600 dark:text-zinc-300">
                  {user?.full_name || user?.email || 'User'}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 dark:text-zinc-500 dark:hover:bg-red-950 dark:hover:text-red-400"
                onClick={logout}
                title="Keluar"
              >
                <HugeiconsIcon icon={Logout03Icon} size={18} color="currentColor" />
              </Button>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                <HugeiconsIcon icon={mobileMenuOpen ? Cancel01Icon : Menu01Icon} size={18} color="currentColor" />
              </button>
            </div>
          </div>

          {/* Mobile nav dropdown */}
          {mobileMenuOpen && (
            <nav className="border-t border-slate-200/60 bg-white px-4 py-2 md:hidden dark:border-zinc-800 dark:bg-zinc-900">
              {allNav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/dashboard' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200'
                    )}
                  >
                    <HugeiconsIcon icon={item.icon} size={18} color="currentColor" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </header>

        {/* Content */}
        <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
