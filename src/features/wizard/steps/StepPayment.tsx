'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { documentsApi } from '@/services/api/documents';
import { HugeiconsIcon } from '@hugeicons/react';
import { Loading03Icon, Download04Icon, GiftIcon, Alert02Icon } from '@hugeicons/core-free-icons';

interface StepPaymentProps {
  documentId: string;
  contractType: string;
}

export function StepPayment({ documentId, contractType }: StepPaymentProps) {
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setError(null);
    try {
      const res = await documentsApi.download(documentId);
      const blob = new Blob([res.data as BlobPart], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kontrak-${documentId}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError('Gagal mengunduh dokumen. Pastikan dokumen sudah di-generate.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Unduh Kontrak</h2>
        <p className="mt-1 text-sm text-slate-500">Kontrak Anda sudah siap untuk diunduh.</p>
      </div>

      <div className="rounded-2xl border border-slate-200/60 bg-white shadow-sm">
        <div className="border-b border-slate-200/60 px-5 py-4">
          <h3 className="text-sm font-semibold text-slate-900">Ringkasan Kontrak</h3>
        </div>
        <div className="space-y-3 px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Tipe Kontrak</span>
            <Badge variant="secondary" className="rounded-lg bg-slate-100 text-slate-700">
              {contractType}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Harga</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400 line-through">Rp 99.000</span>
              <Badge className="rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/60 hover:bg-emerald-50">
                GRATIS
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-200/60 bg-emerald-50 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
          <HugeiconsIcon icon={GiftIcon} size={24} color="#059669" />
        </div>
        <p className="font-semibold text-emerald-800">Masa Promosi - Gratis!</p>
        <p className="text-sm text-emerald-700 text-center max-w-sm">
          Nikmati semua fitur BuatPerjanjian.com secara gratis selama masa promosi. Langsung unduh kontrak Anda.
        </p>
      </div>

      <Button
        type="button"
        className="w-full rounded-xl bg-indigo-600 py-3 text-white hover:bg-indigo-700"
        size="lg"
        onClick={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <HugeiconsIcon icon={Loading03Icon} size={18} className="mr-2 animate-spin" color="currentColor" />
        ) : (
          <HugeiconsIcon icon={Download04Icon} size={18} className="mr-2" color="currentColor" />
        )}
        Unduh Kontrak Gratis
      </Button>

      {error && (
        <div className="flex items-center justify-center gap-2 text-sm text-red-500">
          <HugeiconsIcon icon={Alert02Icon} size={14} color="currentColor" />
          {error}
        </div>
      )}
    </div>
  );
}
