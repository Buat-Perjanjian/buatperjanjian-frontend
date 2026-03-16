'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Download04Icon,
  PencilEdit02Icon,
  Delete02Icon,
  Loading03Icon,
  AlertCircleIcon,
} from '@hugeicons/core-free-icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { documentsApi } from '@/services/api/documents';

interface DocumentActionsProps {
  documentId: string;
}

export function DocumentActions({ documentId }: DocumentActionsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showDelete, setShowDelete] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: () => documentsApi.delete(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      router.push('/documents');
    },
  });

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadError(null);
    try {
      const res = await documentsApi.downloadPdf(documentId);
      const blob = new Blob([res.data as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kontrak-${documentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setDownloadError('Gagal mengunduh PDF. Pastikan dokumen sudah di-generate.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      {/* Error Banner */}
      {downloadError && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <HugeiconsIcon icon={AlertCircleIcon} size={18} color="#dc2626" />
          <p className="text-sm text-red-700">{downloadError}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isDownloading ? (
            <HugeiconsIcon
              icon={Loading03Icon}
              size={18}
              color="currentColor"
              className="animate-spin"
            />
          ) : (
            <HugeiconsIcon icon={Download04Icon} size={18} color="currentColor" />
          )}
          Download PDF
        </button>
        <button
          onClick={() => router.push(`/wizard/${documentId}`)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
          <HugeiconsIcon icon={PencilEdit02Icon} size={18} color="currentColor" />
          Edit
        </button>
        <button
          onClick={() => setShowDelete(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 shadow-sm transition-colors hover:bg-red-50"
        >
          <HugeiconsIcon icon={Delete02Icon} size={18} color="currentColor" />
          Hapus
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-slate-900">Hapus Dokumen</DialogTitle>
            <DialogDescription className="text-slate-500">
              Apakah Anda yakin ingin menghapus dokumen ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <button
              onClick={() => setShowDelete(false)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200/60 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              disabled={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              {deleteMutation.isPending && (
                <HugeiconsIcon
                  icon={Loading03Icon}
                  size={16}
                  color="currentColor"
                  className="animate-spin"
                />
              )}
              Hapus
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
