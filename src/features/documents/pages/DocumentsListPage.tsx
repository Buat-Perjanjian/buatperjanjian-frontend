'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { HugeiconsIcon } from '@hugeicons/react';
import { Add01Icon, Loading03Icon, FilterIcon } from '@hugeicons/core-free-icons';
import { documentsApi } from '@/services/api/documents';
import { DocumentTable } from '../components/DocumentTable';

const CONTRACT_TYPES = ['PKWT', 'PKWTT', 'Freelance', 'NDA'] as const;

const STATUS_TABS = [
  { value: 'all', label: 'Semua' },
  { value: 'draft', label: 'Draft' },
  { value: 'generated', label: 'Generated' },
  { value: 'paid', label: 'Lunas' },
] as const;

export function DocumentsListPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const { data: res, isLoading } = useQuery({
    queryKey: ['documents', statusFilter, typeFilter],
    queryFn: () =>
      documentsApi.getAll({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        contract_type: typeFilter !== 'all' ? typeFilter : undefined,
      }),
  });

  const documents = res?.data ?? [];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Dokumen Saya
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Kelola semua dokumen kontrak Anda.
            </p>
          </div>
          <button
            onClick={() => router.push('/templates')}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <HugeiconsIcon icon={Add01Icon} size={18} color="currentColor" />
            Buat Kontrak Baru
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Status Tabs */}
          <div className="inline-flex items-center rounded-xl border border-slate-200/60 bg-white p-1 shadow-sm">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  statusFilter === tab.value
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Type Filter Select */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <HugeiconsIcon icon={FilterIcon} size={16} color="#94a3b8" />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200/60 bg-white py-2 pl-9 pr-8 text-sm text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="all">Semua Tipe</option>
              {CONTRACT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center rounded-2xl border border-slate-200/60 bg-white p-12 shadow-sm">
            <HugeiconsIcon
              icon={Loading03Icon}
              size={24}
              color="#94a3b8"
              className="animate-spin"
            />
            <span className="ml-2 text-sm text-slate-500">
              Memuat dokumen...
            </span>
          </div>
        ) : (
          <DocumentTable documents={documents} />
        )}
      </div>
    </div>
  );
}
