'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { documentsApi } from '@/services/api/documents';
import type { Document } from '@/types';
import { MoreHorizontal, Eye, Pencil, Trash2, ArrowUpDown, Loader2 } from 'lucide-react';

interface DocumentTableProps {
  documents: Document[];
}

const statusConfig: Record<
  Document['status'],
  { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive'; className?: string }
> = {
  draft: { label: 'Draft', variant: 'secondary' },
  generated: { label: 'Generated', variant: 'default', className: 'bg-blue-600 hover:bg-blue-600/80' },
  paid: { label: 'Lunas', variant: 'outline', className: 'border-green-500 text-green-600' },
  signed: { label: 'Ditandatangani', variant: 'default', className: 'bg-emerald-600 hover:bg-emerald-600/80' },
};

const contractTypeColors: Record<string, string> = {
  PKWT: 'bg-blue-100 text-blue-800',
  PKWTT: 'bg-purple-100 text-purple-800',
  Freelance: 'bg-orange-100 text-orange-800',
  NDA: 'bg-rose-100 text-rose-800',
};

export function DocumentTable({ documents }: DocumentTableProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [sortAsc, setSortAsc] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => documentsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      setDeleteId(null);
    },
  });

  const sorted = [...documents].sort((a, b) => {
    const diff = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    return sortAsc ? -diff : diff;
  });

  if (documents.length === 0) {
    return (
      <div className="rounded-lg border p-12 text-center">
        <p className="text-muted-foreground">Belum ada dokumen.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Mulai buat kontrak pertama Anda dengan klik tombol di atas.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Tipe Kontrak</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 gap-1"
                  onClick={() => setSortAsc(!sortAsc)}
                >
                  Tanggal Dibuat
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead className="w-[60px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((doc) => {
              const status = statusConfig[doc.status];
              return (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">
                    {doc.title || 'Tanpa Judul'}
                  </TableCell>
                  <TableCell>
                    {doc.contract_type ? (
                      <Badge
                        variant="outline"
                        className={contractTypeColors[doc.contract_type] || ''}
                      >
                        {doc.contract_type}
                      </Badge>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant} className={status.className}>
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(doc.created_at), 'dd MMM yyyy')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Aksi</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/documents/${doc.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/wizard/${doc.id}`)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteId(doc.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Dokumen</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus dokumen ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              disabled={deleteMutation.isPending}
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            >
              {deleteMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
