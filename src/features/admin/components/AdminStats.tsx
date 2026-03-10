'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { UserIcon, File02Icon, MoneyBag02Icon, AiBrain02Icon } from '@hugeicons/core-free-icons';

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
      icon: UserIcon,
      iconColor: '#3b82f6',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Total Dokumen',
      value: data?.totalDocuments ?? 0,
      icon: File02Icon,
      iconColor: '#10b981',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      label: 'Total Revenue',
      value: data?.totalRevenue ?? 0,
      icon: MoneyBag02Icon,
      iconColor: '#f59e0b',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      format: (v: number) => `Rp ${v.toLocaleString('id-ID')}`,
    },
    {
      label: 'AI Requests',
      value: data?.totalAIRequests ?? 0,
      icon: AiBrain02Icon,
      iconColor: '#8b5cf6',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-600',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl bg-white border border-slate-200/60 shadow-sm p-5 transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bgColor}`}>
              <HugeiconsIcon icon={stat.icon} size={20} color={stat.iconColor} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {'format' in stat && stat.format
              ? stat.format(stat.value)
              : stat.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
