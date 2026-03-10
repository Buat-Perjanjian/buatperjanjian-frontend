'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { documentsApi } from '@/services/api/documents';
import { Download, Pencil, Trash2, Loader2 } from 'lucide-react';

interface DocumentActionsProps {
  documentId: string;
}

export function DocumentActions({ documentId }: DocumentActionsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showDelete, setShowDelete] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => documentsApi.delete(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      router.push('/documents');
    },
  });

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
      // silently fail - could add toast here
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleDownload} disabled={isDownloading} className="gap-2">
          {isDownloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Download PDF
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push(`/wizard/${documentId}`)}
          className="gap-2"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="outline"
          className="gap-2 text-destructive hover:text-destructive"
          onClick={() => setShowDelete(true)}
        >
          <Trash2 className="h-4 w-4" />
          Hapus
        </Button>
      </div>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Dokumen</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus dokumen ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              disabled={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate()}
            >
              {deleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
