'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { templatesApi } from '@/services/api/templates';
import { companiesApi } from '@/services/api/companies';
import { documentsApi } from '@/services/api/documents';
import { TemplateCard } from './TemplateCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { DocumentTemplate } from '@/types';
import { Loader2, ArrowLeft } from 'lucide-react';

export function TemplateSelector() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');

  const { data: templatesRes, isLoading: templatesLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: () => templatesApi.getAll(),
  });

  const { data: companiesRes, isLoading: companiesLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: () => companiesApi.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (data: { company_id: string; contract_type: string; title?: string }) =>
      documentsApi.create(data),
    onSuccess: (res) => {
      const newDoc = res.data;
      router.push(`/wizard/${newDoc.id}`);
    },
  });

  const templates = templatesRes?.data ?? [];
  const companies = companiesRes?.data ?? [];

  const handleSelectTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
  };

  const handleConfirm = () => {
    if (!selectedTemplate || !selectedCompanyId) return;
    createMutation.mutate({
      company_id: selectedCompanyId,
      contract_type: selectedTemplate.contract_type || 'PKWT',
      title: `Kontrak ${selectedTemplate.name}`,
    });
  };

  if (templatesLoading || companiesLoading) {
    return (
      <Card className="flex items-center justify-center p-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">Memuat template...</span>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mb-2 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Pilih Template Kontrak</h1>
        <p className="text-muted-foreground">
          Pilih template untuk memulai pembuatan kontrak baru.
        </p>
      </div>

      {templates.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">Belum ada template tersedia.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={handleSelectTemplate}
            />
          ))}
        </div>
      )}

      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat Kontrak Baru</DialogTitle>
            <DialogDescription>
              Template: {selectedTemplate?.name}. Pilih perusahaan untuk melanjutkan.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <Label htmlFor="company-select">Perusahaan</Label>
              {companies.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Belum ada perusahaan. Silakan tambahkan perusahaan terlebih dahulu di pengaturan.
                </p>
              ) : (
                <Select value={selectedCompanyId} onValueChange={setSelectedCompanyId}>
                  <SelectTrigger id="company-select">
                    <SelectValue placeholder="Pilih perusahaan" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
              Batal
            </Button>
            <Button
              disabled={!selectedCompanyId || createMutation.isPending}
              onClick={handleConfirm}
            >
              {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Mulai Buat Kontrak
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
