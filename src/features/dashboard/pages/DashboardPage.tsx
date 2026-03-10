'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { dashboardApi } from '../services/dashboardApi';
import { StatsCards } from '../components/StatsCards';
import { RecentDocuments } from '../components/RecentDocuments';
import { QuickActions } from '../components/QuickActions';
import { HugeiconsIcon } from '@hugeicons/react';
import { Loading03Icon } from '@hugeicons/core-free-icons';

function SkeletonCard() {
  return (
    <div className="h-[120px] animate-pulse rounded-2xl border border-slate-200/60 bg-white shadow-sm">
      <div className="flex h-full items-center justify-center">
        <HugeiconsIcon
          icon={Loading03Icon}
          size={24}
          className="animate-spin text-slate-300"
        />
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
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Greeting Section */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {getGreeting()}, {user?.full_name || 'User'}!
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola kontrak dan dokumen hukum Anda dengan mudah.
          </p>
        </div>

        {/* Stats Cards */}
        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <StatsCards documents={documents} companies={companies} />
        )}

        {/* Quick Actions */}
        <QuickActions />

        {/* Recent Documents */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Dokumen Terbaru
          </h2>
          {isLoading ? (
            <div className="flex h-[200px] items-center justify-center rounded-2xl border border-slate-200/60 bg-white shadow-sm">
              <HugeiconsIcon
                icon={Loading03Icon}
                size={28}
                className="animate-spin text-slate-300"
              />
            </div>
          ) : (
            <RecentDocuments documents={documents} />
          )}
        </div>
      </div>
    </div>
  );
}
