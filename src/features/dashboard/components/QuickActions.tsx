'use client';

import { useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Add01Icon,
  File02Icon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons';

export function QuickActions() {
  const router = useRouter();

  return (
    <>
      {/* Buat Kontrak Baru — span 2 cols */}
      <button
        onClick={() => router.push('/templates')}
        className="group col-span-1 sm:col-span-2 flex flex-col justify-between rounded-2xl bg-indigo-600 p-6 text-left transition-all hover:bg-indigo-700"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
          <HugeiconsIcon icon={Add01Icon} size={20} color="#ffffff" />
        </div>
        <div className="mt-4">
          <p className="text-lg font-bold text-white">Buat Kontrak Baru</p>
          <p className="mt-0.5 text-sm text-indigo-200">Mulai buat kontrak dengan AI assistant</p>
        </div>
        <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white/80 transition-colors group-hover:text-white">
          Mulai
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} color="currentColor" className="transition-transform group-hover:translate-x-0.5" />
        </div>
      </button>

      {/* Dokumen Saya — span 2 cols */}
      <button
        onClick={() => router.push('/documents')}
        className="group col-span-1 sm:col-span-2 flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 text-left transition-all hover:border-slate-200 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-zinc-800">
          <HugeiconsIcon icon={File02Icon} size={20} color="#64748b" />
        </div>
        <div className="mt-4">
          <p className="text-lg font-bold text-slate-900 dark:text-zinc-100">Dokumen Saya</p>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-zinc-400">Lihat dan kelola semua dokumen</p>
        </div>
        <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-slate-400 transition-colors group-hover:text-indigo-600 dark:text-zinc-500 dark:group-hover:text-indigo-400">
          Lihat semua
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} color="currentColor" className="transition-transform group-hover:translate-x-0.5" />
        </div>
      </button>
    </>
  );
}
