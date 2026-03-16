'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { templatesApi } from '@/services/api/templates';
import { companiesApi } from '@/services/api/companies';
import { documentsApi } from '@/services/api/documents';
import { TemplateCard } from './TemplateCard';
import { Button } from '@/components/ui/button';
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
import { HugeiconsIcon } from '@hugeicons/react';
import { Loading03Icon, ArrowLeft01Icon } from '@hugeicons/core-free-icons';

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
      router.push(`/builder/${newDoc.id}`);
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
      <div className="flex items-center justify-center rounded-2xl border border-slate-200/60 bg-white p-12 shadow-sm">
        <HugeiconsIcon icon={Loading03Icon} size={20} className="animate-spin" color="#64748b" />
        <span className="ml-2 text-sm text-slate-500">Memuat template...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => router.back()}
          className="mb-3 inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} color="currentColor" />
          Kembali
        </button>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pilih Template Kontrak</h1>
        <p className="mt-1 text-slate-500">
          Pilih template untuk memulai pembuatan kontrak baru.
        </p>
      </div>

      {templates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200/60 bg-white p-12 text-center">
          <p className="text-slate-500">Belum ada template tersedia.</p>
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
        <DialogContent className="rounded-2xl border border-slate-200/60 bg-white shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-slate-900">Buat Kontrak Baru</DialogTitle>
            <DialogDescription className="text-slate-500">
              Template: {selectedTemplate?.name}. Pilih perusahaan untuk melanjutkan.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <Label htmlFor="company-select" className="text-sm font-medium text-slate-700">Perusahaan</Label>
              {companies.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Belum ada perusahaan. Silakan tambahkan perusahaan terlebih dahulu di pengaturan.
                </p>
              ) : (
                <Select value={selectedCompanyId} onValueChange={setSelectedCompanyId}>
                  <SelectTrigger id="company-select" className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white">
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
            <Button
              variant="outline"
              onClick={() => setSelectedTemplate(null)}
              className="rounded-xl border-slate-200"
            >
              Batal
            </Button>
            <Button
              disabled={!selectedCompanyId || createMutation.isPending}
              onClick={handleConfirm}
              className="rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {createMutation.isPending && (
                <HugeiconsIcon icon={Loading03Icon} size={16} className="mr-2 animate-spin" color="currentColor" />
              )}
              Mulai Buat Kontrak
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
