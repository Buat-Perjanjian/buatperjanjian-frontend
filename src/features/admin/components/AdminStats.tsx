'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, DollarSign, Bot } from 'lucide-react';

interface AdminStatsProps {
  data: {
    totalUsers: number;
    totalDocuments: number;
    totalRevenue: number;
    totalAIRequests: number;
  } | null;
}

export function AdminStats({ data }: AdminStatsProps) {
  const stats = [
    {
      label: 'Total Users',
      value: data?.totalUsers ?? 0,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Total Dokumen',
      value: data?.totalDocuments ?? 0,
      icon: FileText,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Total Revenue',
      value: data?.totalRevenue ?? 0,
      icon: DollarSign,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      format: (v: number) => `Rp ${v.toLocaleString('id-ID')}`,
    },
    {
      label: 'AI Requests',
      value: data?.totalAIRequests ?? 0,
      icon: Bot,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className={`rounded-md p-2 ${stat.bg}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {'format' in stat && stat.format
                  ? stat.format(stat.value)
                  : stat.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
