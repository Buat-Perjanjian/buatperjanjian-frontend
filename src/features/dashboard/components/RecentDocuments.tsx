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
  { label: string; dotColor: string; bgColor: string; textColor: string; darkBg: string; darkText: string }
> = {
  draft: {
    label: 'Draft',
    dotColor: 'bg-amber-400',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    darkBg: 'dark:bg-amber-950/50',
    darkText: 'dark:text-amber-400',
  },
  generated: {
    label: 'Generated',
    dotColor: 'bg-indigo-400',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    darkBg: 'dark:bg-indigo-950/50',
    darkText: 'dark:text-indigo-400',
  },
  paid: {
    label: 'Paid',
    dotColor: 'bg-emerald-400',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    darkBg: 'dark:bg-emerald-950/50',
    darkText: 'dark:text-emerald-400',
  },
  signed: {
    label: 'Signed',
    dotColor: 'bg-emerald-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    darkBg: 'dark:bg-emerald-950/50',
    darkText: 'dark:text-emerald-400',
  },
};

export function RecentDocuments({ documents }: RecentDocumentsProps) {
  const router = useRouter();

  const recent = [...documents]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-zinc-800">
          <HugeiconsIcon icon={File02Icon} size={20} color="#94a3b8" />
        </div>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Belum ada dokumen.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {recent.map((doc) => {
        const status = statusConfig[doc.status];
        return (
          <button
            key={doc.id}
            onClick={() => router.push(`/documents/${doc.id}`)}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800/50"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-zinc-100">
                {doc.title || 'Tanpa Judul'}
              </p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="text-xs text-slate-400 dark:text-zinc-500">
                  {doc.contract_type || '-'}
                </span>
                <span className="text-xs text-slate-300 dark:text-zinc-600">·</span>
                <span className="text-xs text-slate-400 dark:text-zinc-500">
                  {format(new Date(doc.created_at), 'dd MMM yyyy')}
                </span>
              </div>
            </div>
            <div className="ml-3 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${status.bgColor} ${status.textColor} ${status.darkBg} ${status.darkText}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${status.dotColor}`} />
                {status.label}
              </span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} color="#94a3b8" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
