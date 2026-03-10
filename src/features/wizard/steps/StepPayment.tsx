'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { paymentsApi } from '@/services/api/payments';
import { documentsApi } from '@/services/api/documents';
import { Loader2, Download, CheckCircle2 } from 'lucide-react';

interface StepPaymentProps {
  documentId: string;
  contractType: string;
}

export function StepPayment({ documentId, contractType }: StepPaymentProps) {
  const [isPaying, setIsPaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handlePay = async () => {
    setIsPaying(true);
    setError(null);
    try {
      await paymentsApi.create(documentId);
      setIsPaid(true);
    } catch {
      setError('Pembayaran gagal. Silakan coba lagi.');
    } finally {
      setIsPaying(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const res = await documentsApi.download(documentId);
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
      setError('Gagal mengunduh dokumen.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Pembayaran</h2>
        <p className="text-sm text-muted-foreground">Selesaikan pembayaran untuk mendapatkan dokumen kontrak.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ringkasan Kontrak</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tipe Kontrak</span>
            <Badge variant="secondary">{contractType}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Harga</span>
            <span className="font-semibold">Rp 99.000</span>
          </div>
        </CardContent>
      </Card>

      {!isPaid ? (
        <div className="space-y-3">
          <Button
            type="button"
            className="w-full"
            size="lg"
            onClick={handlePay}
            disabled={isPaying}
          >
            {isPaying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              'Bayar Sekarang'
            )}
          </Button>
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
            <p className="font-semibold text-green-800">Pembayaran Berhasil</p>
            <p className="text-sm text-green-700 text-center">
              Kontrak Anda sudah siap untuk diunduh.
            </p>
          </div>
          <Button
            type="button"
            className="w-full"
            size="lg"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Unduh Kontrak
          </Button>
        </div>
      )}
    </div>
  );
}
