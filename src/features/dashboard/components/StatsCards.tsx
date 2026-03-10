'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FilePen, CheckCircle, Building2 } from 'lucide-react';
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
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Draft',
      value: draftCount,
      icon: FilePen,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Selesai',
      value: completedCount,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Perusahaan',
      value: companyCount,
      icon: Building2,
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
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
