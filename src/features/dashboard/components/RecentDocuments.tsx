'use client';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  File02Icon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons';
import type { Document } from '@/types';

interface RecentDocumentsProps {
  documents: Document[];
}

const statusConfig: Record<
  Document['status'],
  { label: string; dotColor: string; bgColor: string; textColor: string }
> = {
  draft: {
    label: 'Draft',
    dotColor: 'bg-amber-400',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
  },
  generated: {
    label: 'Generated',
    dotColor: 'bg-indigo-400',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
  },
  paid: {
    label: 'Paid',
    dotColor: 'bg-emerald-400',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
  },
  signed: {
    label: 'Signed',
    dotColor: 'bg-emerald-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
  },
};

export function RecentDocuments({ documents }: RecentDocumentsProps) {
  const router = useRouter();

  const recent = [...documents]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200/60 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
          <HugeiconsIcon icon={File02Icon} size={24} color="#94a3b8" />
        </div>
        <p className="text-sm text-slate-500">
          Belum ada dokumen. Mulai buat kontrak pertama Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200/60">
            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Judul
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Tipe Kontrak
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Status
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Tanggal
            </th>
            <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span className="sr-only">Aksi</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {recent.map((doc) => {
            const status = statusConfig[doc.status];
            return (
              <tr
                key={doc.id}
                className="cursor-pointer transition-colors hover:bg-slate-50/70"
                onClick={() => router.push(`/documents/${doc.id}`)}
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-900">
                    {doc.title || 'Tanpa Judul'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-500">
                    {doc.contract_type || '-'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.bgColor} ${status.textColor}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${status.dotColor}`} />
                    {status.label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-500">
                    {format(new Date(doc.created_at), 'dd MMM yyyy')}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    color="#94a3b8"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
