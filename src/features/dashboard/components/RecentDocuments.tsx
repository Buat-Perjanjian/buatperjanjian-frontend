'use client';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Document } from '@/types';

interface RecentDocumentsProps {
  documents: Document[];
}

const statusConfig: Record<
  Document['status'],
  { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive'; className?: string }
> = {
  draft: { label: 'Draft', variant: 'secondary' },
  generated: { label: 'Generated', variant: 'default' },
  paid: { label: 'Paid', variant: 'outline', className: 'border-emerald-500 text-emerald-600' },
  signed: { label: 'Signed', variant: 'default', className: 'bg-emerald-600 hover:bg-emerald-600/80' },
};

export function RecentDocuments({ documents }: RecentDocumentsProps) {
  const router = useRouter();

  const recent = [...documents]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">
          Belum ada dokumen. Mulai buat kontrak pertama Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Judul</TableHead>
            <TableHead>Tipe Kontrak</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tanggal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recent.map((doc) => {
            const status = statusConfig[doc.status];
            return (
              <TableRow
                key={doc.id}
                className="cursor-pointer"
                onClick={() => router.push(`/documents/${doc.id}`)}
              >
                <TableCell className="font-medium">
                  {doc.title || 'Tanpa Judul'}
                </TableCell>
                <TableCell>{doc.contract_type || '-'}</TableCell>
                <TableCell>
                  <Badge variant={status.variant} className={status.className}>
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(doc.created_at), 'dd MMM yyyy')}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
