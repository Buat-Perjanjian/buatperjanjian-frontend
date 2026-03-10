'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PaymentSummaryProps {
  documentTitle: string;
  contractType: string;
  amount: number;
}

export function PaymentSummary({ documentTitle, contractType, amount }: PaymentSummaryProps) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Ringkasan Pembayaran</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Dokumen</span>
          <span className="text-sm font-medium truncate ml-4">{documentTitle}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Tipe Kontrak</span>
          <Badge variant="secondary">{contractType}</Badge>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Total</span>
          <span className="text-lg font-bold">{formattedPrice}</span>
        </div>
      </CardContent>
    </Card>
  );
}
