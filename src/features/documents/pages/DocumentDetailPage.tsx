'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, Loading03Icon, AlertCircleIcon } from '@hugeicons/core-free-icons';
import { documentsApi } from '@/services/api/documents';
import { DocumentViewer } from '../components/DocumentViewer';
import { DocumentActions } from '../components/DocumentActions';
import type { DocumentVersion } from '@/types';

interface DocumentDetailPageProps {
  documentId: string;
}

export function DocumentDetailPage({ documentId }: DocumentDetailPageProps) {
  const router = useRouter();

  const { data: docRes, isLoading: docLoading } = useQuery({
    queryKey: ['document', documentId],
    queryFn: () => documentsApi.getOne(documentId),
  });

  const { data: versionsRes, isLoading: versionsLoading } = useQuery({
    queryKey: ['document-versions', documentId],
    queryFn: () => documentsApi.getVersions(documentId),
  });

  const isLoading = docLoading || versionsLoading;
  const doc = docRes?.data;
  const versions = (versionsRes?.data ?? []) as DocumentVersion[];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
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
        </div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <div className="mx-auto max-w-5xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/60 bg-white p-12 shadow-sm">
            <HugeiconsIcon icon={AlertCircleIcon} size={32} color="#94a3b8" />
            <p className="mt-3 text-slate-500">Dokumen tidak ditemukan.</p>
            <button
              onClick={() => router.push('/documents')}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} color="currentColor" />
              Kembali ke Dokumen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/documents')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} color="currentColor" />
          Kembali
        </button>

        {/* Actions */}
        <DocumentActions documentId={documentId} />

        {/* Viewer */}
        <DocumentViewer document={doc} versions={versions} />
      </div>
    </div>
  );
}
