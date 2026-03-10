'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { documentsApi } from '@/services/api/documents';
import type { Document, DocumentVersion } from '@/types';
import { History, RotateCcw, Loader2 } from 'lucide-react';

interface DocumentViewerProps {
  document: Document;
  versions: DocumentVersion[];
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
      <div className="space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight">{doc.title || 'Tanpa Judul'}</h1>
          <Badge variant={status.variant} className={status.className}>
            {status.label}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {doc.contract_type && <span>Tipe: {doc.contract_type}</span>}
          <span>Dibuat: {format(new Date(doc.created_at), 'dd MMM yyyy, HH:mm')}</span>
          <span>Diperbarui: {format(new Date(doc.updated_at), 'dd MMM yyyy, HH:mm')}</span>
        </div>
      </div>

      {/* Contract Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pratinjau Kontrak</CardTitle>
        </CardHeader>
        <CardContent>
          {latestVersion?.content_html ? (
            <div
              className="prose prose-sm max-w-none rounded-lg border bg-white p-8 shadow-sm"
              dangerouslySetInnerHTML={{ __html: latestVersion.content_html }}
            />
          ) : (
            <div className="rounded-lg border border-dashed p-12 text-center">
              <p className="text-muted-foreground">
                Belum ada konten kontrak. Silakan generate kontrak terlebih dahulu.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Version History */}
      {versions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <History className="h-4 w-4" />
              Riwayat Versi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...versions]
                .sort((a, b) => b.version_number - a.version_number)
                .map((version) => (
                  <div
                    key={version.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">Versi {version.version_number}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(version.created_at), 'dd MMM yyyy, HH:mm')}
                      </p>
                    </div>
                    {version.id !== latestVersion?.id && (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={restoreMutation.isPending && restoringId === version.id}
                        onClick={() => {
                          setRestoringId(version.id);
                          restoreMutation.mutate(version.id);
                        }}
                      >
                        {restoreMutation.isPending && restoringId === version.id ? (
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        ) : (
                          <RotateCcw className="mr-1 h-3 w-3" />
                        )}
                        Pulihkan
                      </Button>
                    )}
                    {version.id === latestVersion?.id && (
                      <Badge variant="secondary">Terbaru</Badge>
                    )}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
