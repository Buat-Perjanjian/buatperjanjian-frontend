'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { documentsApi } from '@/services/api/documents';
import { DocumentViewer } from '../components/DocumentViewer';
import { DocumentActions } from '../components/DocumentActions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { DocumentVersion } from '@/types';

interface DocumentDetailPageProps {
  documentId: string;
}

export function DocumentDetailPage({ documentId }: DocumentDetailPageProps) {
  const router = useRouter();

  const { data: docRes, isLoading: docLoading } = useQuery({
    queryKey: ['document', documentId],
    queryFn: () => documentsApi.getOne(documentId),
  });

  const { data: versionsRes, isLoading: versionsLoading } = useQuery({
    queryKey: ['document-versions', documentId],
    queryFn: () => documentsApi.getVersions(documentId),
  });

  const isLoading = docLoading || versionsLoading;
  const doc = docRes?.data;
  const versions = (versionsRes?.data ?? []) as DocumentVersion[];

  if (isLoading) {
    return (
      <Card className="flex items-center justify-center p-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">Memuat dokumen...</span>
      </Card>
    );
  }

  if (!doc) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Dokumen tidak ditemukan.</p>
        <Button variant="outline" onClick={() => router.push('/documents')}>
          Kembali ke Dokumen
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push('/documents')}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </Button>

      <DocumentActions documentId={documentId} />
      <DocumentViewer document={doc} versions={versions} />
    </div>
  );
}
