'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  File02Icon,
  PencilEdit02Icon,
  CheckmarkCircle02Icon,
  Building06Icon,
} from '@hugeicons/core-free-icons';
import type { Document, Company } from '@/types';
import type { IconSvgElement } from '@hugeicons/react';

interface StatsCardsProps {
  documents: Document[];
  companies: Company[];
}

interface StatItem {
  label: string;
  value: number;
  icon: IconSvgElement;
  iconColor: string;
  bgLight: string;
  bgDark: string;
}

export function StatsCards({ documents, companies }: StatsCardsProps) {
  const totalDocuments = documents.length;
  const draftCount = documents.filter((d) => d.status === 'draft').length;
  const completedCount = documents.filter((d) =>
    ['generated', 'paid', 'signed'].includes(d.status)
  ).length;
  const companyCount = companies.length;

  const stats: StatItem[] = [
    {
      label: 'Total Dokumen',
      value: totalDocuments,
      icon: File02Icon,
      iconColor: '#4f46e5',
      bgLight: 'bg-indigo-50',
      bgDark: 'dark:bg-indigo-950/50',
    },
    {
      label: 'Draft',
      value: draftCount,
      icon: PencilEdit02Icon,
      iconColor: '#d97706',
      bgLight: 'bg-amber-50',
      bgDark: 'dark:bg-amber-950/50',
    },
    {
      label: 'Selesai',
      value: completedCount,
      icon: CheckmarkCircle02Icon,
      iconColor: '#059669',
      bgLight: 'bg-emerald-50',
      bgDark: 'dark:bg-emerald-950/50',
    },
    {
      label: 'Perusahaan',
      value: companyCount,
      icon: Building06Icon,
      iconColor: '#7c3aed',
      bgLight: 'bg-violet-50',
      bgDark: 'dark:bg-violet-950/50',
    },
  ];

  return (
    <>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group rounded-2xl border border-slate-100 bg-white p-5 transition-all hover:border-slate-200 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500 dark:text-zinc-400">{stat.label}</p>
            <div className={`rounded-xl p-2 ${stat.bgLight} ${stat.bgDark}`}>
              <HugeiconsIcon icon={stat.icon} size={18} color={stat.iconColor} />
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-zinc-100">{stat.value}</p>
        </div>
      ))}
    </>
  );
}
