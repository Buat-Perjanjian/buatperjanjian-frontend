'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { paymentsApi } from '@/services/api/payments';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface PaymentButtonProps {
  documentId: string;
  onSuccess?: () => void;
}

export function PaymentButton({ documentId, onSuccess }: PaymentButtonProps) {
  const [isPaying, setIsPaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    setIsPaying(true);
    setError(null);
    try {
      await paymentsApi.create(documentId);
      setIsPaid(true);
      onSuccess?.();
    } catch {
      setError('Pembayaran gagal. Silakan coba lagi.');
    } finally {
      setIsPaying(false);
    }
  };

  if (isPaid) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <span className="text-sm font-medium text-green-800">Pembayaran Berhasil</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button
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
  );
}
