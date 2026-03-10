'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { documentsApi } from '@/services/api/documents';
import { DocumentTable } from '../components/DocumentTable';
import { Plus, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const CONTRACT_TYPES = ['PKWT', 'PKWTT', 'Freelance', 'NDA'] as const;

export function DocumentsListPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const { data: res, isLoading } = useQuery({
    queryKey: ['documents', statusFilter, typeFilter],
    queryFn: () =>
      documentsApi.getAll({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        contract_type: typeFilter !== 'all' ? typeFilter : undefined,
      }),
  });

  const documents = res?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dokumen Saya</h1>
          <p className="text-muted-foreground">Kelola semua dokumen kontrak Anda.</p>
        </div>
        <Button onClick={() => router.push('/templates')} className="gap-2">
          <Plus className="h-4 w-4" />
          Buat Kontrak Baru
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Tabs value={statusFilter} onValueChange={setStatusFilter}>
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="generated">Generated</TabsTrigger>
            <TabsTrigger value="paid">Lunas</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Tipe Kontrak" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Tipe</SelectItem>
            {CONTRACT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <Card className="flex items-center justify-center p-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">Memuat dokumen...</span>
        </Card>
      ) : (
        <DocumentTable documents={documents} />
      )}
    </div>
  );
}
