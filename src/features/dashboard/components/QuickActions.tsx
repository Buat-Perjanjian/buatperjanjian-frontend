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
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => router.push('/templates')}
        className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md hover:brightness-110"
      >
        <HugeiconsIcon icon={Add01Icon} size={18} color="#ffffff" />
        Buat Kontrak Baru
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={16}
          color="#ffffff"
          className="opacity-60 transition-transform group-hover:translate-x-0.5"
        />
      </button>
      <button
        onClick={() => router.push('/documents')}
        className="group inline-flex items-center gap-2.5 rounded-xl border border-slate-200/60 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-700 hover:shadow-md"
      >
        <HugeiconsIcon icon={File02Icon} size={18} color="currentColor" />
        Lihat Semua Dokumen
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={16}
          color="currentColor"
          className="opacity-60 transition-transform group-hover:translate-x-0.5"
        />
      </button>
    </div>
  );
}
