'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  File02Icon,
  PencilEdit02Icon,
  CheckmarkCircle02Icon,
  Building06Icon,
} from '@hugeicons/core-free-icons';
import type { Document, Company } from '@/types';

interface StatsCardsProps {
  documents: Document[];
  companies: Company[];
}

export function StatsCards({ documents, companies }: StatsCardsProps) {
  const totalDocuments = documents.length;
  const draftCount = documents.filter((d) => d.status === 'draft').length;
  const completedCount = documents.filter((d) =>
    ['generated', 'paid', 'signed'].includes(d.status)
  ).length;
  const companyCount = companies.length;

  const stats = [
    {
      label: 'Total Dokumen',
      value: totalDocuments,
      icon: File02Icon,
      iconColor: '#4f46e5',
      bgColor: 'bg-indigo-50',
    },
    {
      label: 'Draft',
      value: draftCount,
      icon: PencilEdit02Icon,
      iconColor: '#d97706',
      bgColor: 'bg-amber-50',
    },
    {
      label: 'Selesai',
      value: completedCount,
      icon: CheckmarkCircle02Icon,
      iconColor: '#059669',
      bgColor: 'bg-emerald-50',
    },
    {
      label: 'Perusahaan',
      value: companyCount,
      icon: Building06Icon,
      iconColor: '#7c3aed',
      bgColor: 'bg-violet-50',
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <div className={`rounded-xl p-2.5 ${stat.bgColor}`}>
              <HugeiconsIcon
                icon={stat.icon}
                size={20}
                color={stat.iconColor}
              />
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
