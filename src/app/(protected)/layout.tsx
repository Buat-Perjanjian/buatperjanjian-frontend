'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/documents', label: 'Dokumen', icon: FileText },
  { href: '/settings', label: 'Pengaturan', icon: Settings },
];

function Sidebar({ className, onClose }: { className?: string; onClose?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="p-4">
        <h2 className="text-lg font-bold tracking-tight">BuatPerjanjian</h2>
      </div>
      <Separator />
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Separator />
      <div className="p-4">
        <div className="mb-3 text-sm">
          <p className="font-medium truncate">{user?.full_name || 'User'}</p>
          <p className="text-muted-foreground truncate text-xs">{user?.email}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
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
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 border-r bg-muted/30 md:block">
          <Sidebar />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform md:hidden',
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
            <X className="h-5 w-5" />
            <span className="sr-only">Tutup menu</span>
          </Button>
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center border-b px-4 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Buka menu</span>
            </Button>
            <span className="ml-3 font-semibold">BuatPerjanjian</span>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
