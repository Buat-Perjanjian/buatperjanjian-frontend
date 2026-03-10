'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Home09Icon,
  File02Icon,
  Settings02Icon,
  Logout03Icon,
  Menu01Icon,
  Cancel01Icon,
  SecurityCheckIcon,
} from '@hugeicons/core-free-icons';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { IconSvgElement } from '@hugeicons/react';

interface NavItem {
  href: string;
  label: string;
  icon: IconSvgElement;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home09Icon },
  { href: '/documents', label: 'Dokumen', icon: File02Icon },
  { href: '/settings', label: 'Pengaturan', icon: Settings02Icon },
];

const adminNavItems: NavItem[] = [
  { href: '/admin', label: 'Admin', icon: SecurityCheckIcon },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full flex-col">
      <div className="p-5">
        <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <span className="text-xs font-bold text-white">BP</span>
          </div>
          <span className="text-base font-bold text-slate-900">BuatPerjanjian</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 pt-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <HugeiconsIcon
                icon={item.icon}
                size={20}
                color={isActive ? '#4338ca' : '#94a3b8'}
              />
              {item.label}
            </Link>
          );
        })}

        {(user?.role === 'admin' || user?.role === 'superadmin') && (
          <>
            <div className="my-3 h-px bg-slate-100" />
            {adminNavItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <HugeiconsIcon
                    icon={item.icon}
                    size={20}
                    color={isActive ? '#4338ca' : '#94a3b8'}
                  />
                  {item.label}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <div className="mb-3 rounded-xl bg-slate-50 px-3 py-2.5">
          <p className="truncate text-sm font-medium text-slate-900">
            {user?.full_name || 'User'}
          </p>
          <p className="truncate text-xs text-slate-400">{user?.email}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
          onClick={logout}
        >
          <HugeiconsIcon icon={Logout03Icon} size={18} color="currentColor" />
          Keluar
        </Button>
      </div>
    </div>
  );
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[#f8fafc]">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-slate-200/60 bg-white md:block">
          <Sidebar />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200/60 bg-white transition-transform md:hidden',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-3"
            onClick={() => setSidebarOpen(false)}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} color="#64748b" />
            <span className="sr-only">Tutup menu</span>
          </Button>
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center border-b border-slate-200/60 bg-white px-4 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <HugeiconsIcon icon={Menu01Icon} size={20} color="#334155" />
              <span className="sr-only">Buka menu</span>
            </Button>
            <span className="ml-3 text-sm font-bold text-slate-900">BuatPerjanjian</span>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
