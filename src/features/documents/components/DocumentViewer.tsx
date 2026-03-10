'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Calendar03Icon,
  RotateLeft01Icon,
  Loading03Icon,
  File02Icon,
} from '@hugeicons/core-free-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { documentsApi } from '@/services/api/documents';
import type { Document, DocumentVersion } from '@/types';

interface DocumentViewerProps {
  document: Document;
  versions: DocumentVersion[];
}

const statusConfig: Record<
  Document['status'],
  { label: string; bgClass: string; textClass: string }
> = {
  draft: { label: 'Draft', bgClass: 'bg-slate-100', textClass: 'text-slate-600' },
  generated: { label: 'Generated', bgClass: 'bg-blue-50', textClass: 'text-blue-700' },
  paid: { label: 'Lunas', bgClass: 'bg-emerald-50', textClass: 'text-emerald-700' },
  signed: { label: 'Ditandatangani', bgClass: 'bg-indigo-50', textClass: 'text-indigo-700' },
};

export function DocumentViewer({ document: doc, versions }: DocumentViewerProps) {
  const queryClient = useQueryClient();
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const status = statusConfig[doc.status];

  const latestVersion = versions.length > 0
    ? versions.reduce((a, b) => (a.version_number > b.version_number ? a : b))
    : null;

  const restoreMutation = useMutation({
    mutationFn: (versionId: string) => documentsApi.restoreVersion(doc.id, versionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document', doc.id] });
      queryClient.invalidateQueries({ queryKey: ['document-versions', doc.id] });
      setRestoringId(null);
    },
  });

  return (
    <div className="space-y-6">
      {/* Document Info */}
      <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {doc.title || 'Tanpa Judul'}
          </h1>
          <span
            className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium ${status.bgClass} ${status.textClass}`}
          >
            {status.label}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-4 flex-wrap text-sm text-slate-500">
          {doc.contract_type && (
            <span className="inline-flex items-center gap-1.5">
              <HugeiconsIcon icon={File02Icon} size={14} color="#94a3b8" />
              Tipe: {doc.contract_type}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <HugeiconsIcon icon={Calendar03Icon} size={14} color="#94a3b8" />
            Dibuat: {format(new Date(doc.created_at), 'dd MMM yyyy, HH:mm')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <HugeiconsIcon icon={Calendar03Icon} size={14} color="#94a3b8" />
            Diperbarui: {format(new Date(doc.updated_at), 'dd MMM yyyy, HH:mm')}
          </span>
        </div>
      </div>

      {/* Contract Preview */}
      <div className="rounded-2xl border border-slate-200/60 bg-white shadow-sm">
        <div className="border-b border-slate-200/60 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Pratinjau Kontrak
          </h2>
        </div>
        <div className="p-6">
          {latestVersion?.content_html ? (
            <div
              className="prose prose-sm max-w-none rounded-xl border border-slate-200/60 bg-[#f8fafc] p-8"
              dangerouslySetInnerHTML={{ __html: latestVersion.content_html }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                <HugeiconsIcon icon={File02Icon} size={24} color="#94a3b8" />
              </div>
              <p className="mt-3 text-sm text-slate-500">
                Belum ada konten kontrak. Silakan generate kontrak terlebih dahulu.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Version History */}
      {versions.length > 0 && (
        <div className="rounded-2xl border border-slate-200/60 bg-white shadow-sm">
          <div className="border-b border-slate-200/60 px-6 py-4">
            <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
              <HugeiconsIcon icon={RotateLeft01Icon} size={18} color="#4f46e5" />
              Riwayat Versi
            </h2>
          </div>
          <div className="divide-y divide-slate-200/60 px-6">
            {[...versions]
              .sort((a, b) => b.version_number - a.version_number)
              .map((version) => (
                <div
                  key={version.id}
                  className="flex items-center justify-between py-3.5"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Versi {version.version_number}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {format(new Date(version.created_at), 'dd MMM yyyy, HH:mm')}
                    </p>
                  </div>
                  {version.id !== latestVersion?.id && (
                    <button
                      disabled={restoreMutation.isPending && restoringId === version.id}
                      onClick={() => {
                        setRestoringId(version.id);
                        restoreMutation.mutate(version.id);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/60 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
                    >
                      {restoreMutation.isPending && restoringId === version.id ? (
                        <HugeiconsIcon
                          icon={Loading03Icon}
                          size={14}
                          color="currentColor"
                          className="animate-spin"
                        />
                      ) : (
                        <HugeiconsIcon icon={RotateLeft01Icon} size={14} color="currentColor" />
                      )}
                      Pulihkan
                    </button>
                  )}
                  {version.id === latestVersion?.id && (
                    <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                      Terbaru
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
