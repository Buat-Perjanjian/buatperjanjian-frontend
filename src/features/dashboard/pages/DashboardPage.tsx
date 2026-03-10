'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { dashboardApi } from '../services/dashboardApi';
import { StatsCards } from '../components/StatsCards';
import { RecentDocuments } from '../components/RecentDocuments';
import { QuickActions } from '../components/QuickActions';
import { Card } from '@/components/ui/card';

function SkeletonCard() {
  return <Card className="h-[108px] animate-pulse bg-muted/50" />;
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Selamat datang, {user?.full_name || 'User'}!
        </h1>
        <p className="text-muted-foreground">
          Kelola kontrak dan dokumen hukum Anda dengan mudah.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <StatsCards documents={documents} companies={companies} />
      )}

      <QuickActions />

      <div>
        <h2 className="mb-3 text-lg font-semibold">Dokumen Terbaru</h2>
        {isLoading ? (
          <Card className="h-[200px] animate-pulse bg-muted/50" />
        ) : (
          <RecentDocuments documents={documents} />
        )}
      </div>
    </div>
  );
}
