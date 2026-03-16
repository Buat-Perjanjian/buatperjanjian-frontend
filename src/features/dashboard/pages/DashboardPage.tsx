'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { dashboardApi } from '../services/dashboardApi';
import { StatsCards } from '../components/StatsCards';
import { RecentDocuments } from '../components/RecentDocuments';
import { QuickActions } from '../components/QuickActions';
import { NavCard } from '../components/NavCard';
import { HugeiconsIcon } from '@hugeicons/react';
import { Loading03Icon } from '@hugeicons/core-free-icons';

function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-2xl border border-slate-200/60 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${className}`}>
      <div className="flex h-full min-h-[100px] items-center justify-center">
        <HugeiconsIcon icon={Loading03Icon} size={20} className="animate-spin text-slate-300 dark:text-zinc-600" />
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { user } = useAuth();

  const { data: documentsRes, isLoading: docsLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: () => dashboardApi.getDocuments(),
  });

  const { data: companiesRes, isLoading: companiesLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: () => dashboardApi.getCompanies(),
  });

  const isLoading = docsLoading || companiesLoading;
  const documents = documentsRes?.data ?? [];
  const companies = companiesRes?.data ?? [];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat pagi';
    if (hour < 17) return 'Selamat siang';
    return 'Selamat malam';
  };

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          {getGreeting()}, {user?.full_name || 'User'}!
        </h1>
        <p className="mt-1 text-sm text-slate-400 dark:text-zinc-500">
          Kelola kontrak dan dokumen hukum Anda dengan mudah.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Row 1: Stats */}
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <StatsCards documents={documents} companies={companies} />
        )}

        {/* Row 2: Quick Actions (2 cards, each span 2) */}
        {isLoading ? (
          <>
            <SkeletonCard className="sm:col-span-2 min-h-[180px]" />
            <SkeletonCard className="sm:col-span-2 min-h-[180px]" />
          </>
        ) : (
          <QuickActions />
        )}

        {/* Row 3: Recent Docs (span 3) + Nav (span 1) */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:border-slate-200 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-zinc-100">
            Dokumen Terbaru
          </h3>
          {isLoading ? (
            <div className="flex h-[120px] items-center justify-center">
              <HugeiconsIcon icon={Loading03Icon} size={20} className="animate-spin text-slate-300 dark:text-zinc-600" />
            </div>
          ) : (
            <RecentDocuments documents={documents} />
          )}
        </div>

        <div className="col-span-1 rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:border-slate-200 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-zinc-100">
            Menu
          </h3>
          <NavCard />
        </div>
      </div>
    </div>
  );
}
