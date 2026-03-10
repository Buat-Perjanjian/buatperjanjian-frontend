'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Add01Icon,
  PencilEdit02Icon,
  Delete02Icon,
  File02Icon,
  Loading03Icon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons';
import { templatesApi } from '@/services/api/templates';
import { adminApi } from '@/services/api/admin';
import { toast } from 'sonner';
import type { DocumentTemplate } from '@/types';

const contractTypes = ['PKWT', 'PKWTT', 'Freelance', 'NDA'] as const;

function TemplateForm({
  initial,
  onSubmit,
  loading,
}: {
  initial?: Partial<DocumentTemplate>;
  onSubmit: (data: { name: string; contract_type: string; template_html?: string }) => void;
  loading: boolean;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [contractType, setContractType] = useState<string>(initial?.contract_type ?? 'PKWT');
  const [html, setHtml] = useState(initial?.template_html ?? '');

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="tpl-name" className="text-sm font-medium text-slate-700">Nama Template</Label>
        <Input
          id="tpl-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Kontrak PKWT Standar"
          className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="tpl-type" className="text-sm font-medium text-slate-700">Tipe Kontrak</Label>
        <Select value={contractType} onValueChange={setContractType}>
          <SelectTrigger id="tpl-type" className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {contractTypes.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="tpl-html" className="text-sm font-medium text-slate-700">Template HTML</Label>
        <Textarea
          id="tpl-html"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          rows={5}
          placeholder="<p>Isi template...</p>"
          className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors resize-none"
        />
      </div>
      <DialogFooter className="gap-2 pt-2">
        <DialogClose asChild>
          <Button variant="outline" className="rounded-xl border-slate-200">
            <HugeiconsIcon icon={Cancel01Icon} size={16} className="mr-1" />
            Batal
          </Button>
        </DialogClose>
        <Button
          disabled={loading || !name.trim()}
          onClick={() => onSubmit({ name, contract_type: contractType, template_html: html || undefined })}
          className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <HugeiconsIcon icon={Loading03Icon} size={16} className="animate-spin" />
              Menyimpan...
            </span>
          ) : 'Simpan'}
        </Button>
      </DialogFooter>
    </div>
  );
}

export function TemplateManagement() {
  const queryClient = useQueryClient();
  const [editTemplate, setEditTemplate] = useState<DocumentTemplate | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: () => templatesApi.getAll(),
  });

  const templates: DocumentTemplate[] = data?.data ?? [];

  const createMutation = useMutation({
    mutationFn: (d: { name: string; contract_type: string; template_html?: string }) => adminApi.createTemplate(d),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template berhasil dibuat');
      setCreateOpen(false);
    },
    onError: () => toast.error('Gagal membuat template'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...d }: { id: string; name?: string; contract_type?: string; template_html?: string }) =>
      adminApi.updateTemplate(id, d),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template berhasil diperbarui');
      setEditTemplate(null);
    },
    onError: () => toast.error('Gagal memperbarui template'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template berhasil dihapus');
      setDeleteId(null);
    },
    onError: () => toast.error('Gagal menghapus template'),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-12">
        <HugeiconsIcon icon={Loading03Icon} size={20} className="animate-spin text-indigo-500" />
        <p className="text-slate-500">Memuat template...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header with Add button */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={File02Icon} size={20} color="#4f46e5" />
          <h3 className="text-lg font-semibold text-slate-900">Template</h3>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <HugeiconsIcon icon={Add01Icon} size={16} className="mr-2" />
              Tambah Template
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-slate-900">Tambah Template Baru</DialogTitle>
            </DialogHeader>
            <TemplateForm onSubmit={(d) => createMutation.mutate(d)} loading={createMutation.isPending} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200/60 bg-slate-50/50">
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Nama</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Tipe</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Dibuat</th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {templates.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 mb-3">
                      <HugeiconsIcon icon={File02Icon} size={24} color="#94a3b8" />
                    </div>
                    <p className="text-slate-500">Belum ada template</p>
                  </td>
                </tr>
              ) : (
                templates.map((tpl) => (
                  <tr key={tpl.id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-900">{tpl.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="rounded-lg bg-indigo-50 text-indigo-700 border-0 px-2.5 py-0.5 text-xs font-medium hover:bg-indigo-100">
                        {tpl.contract_type ?? '-'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500">{new Date(tpl.created_at).toLocaleDateString('id-ID')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setEditTemplate(tpl)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                        >
                          <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
                          <span className="sr-only">Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteId(tpl.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                          <HugeiconsIcon icon={Delete02Icon} size={16} />
                          <span className="sr-only">Hapus</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit dialog */}
      <Dialog open={!!editTemplate} onOpenChange={(open) => !open && setEditTemplate(null)}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-slate-900">Edit Template</DialogTitle>
          </DialogHeader>
          {editTemplate && (
            <TemplateForm
              initial={editTemplate}
              onSubmit={(d) => updateMutation.mutate({ id: editTemplate.id, ...d })}
              loading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-slate-900">Hapus Template</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-500">
            Apakah Anda yakin ingin menghapus template ini? Tindakan ini tidak dapat dibatalkan.
          </p>
          <DialogFooter className="gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              className="rounded-xl border-slate-200"
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              disabled={deleteMutation.isPending}
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="rounded-xl"
            >
              {deleteMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <HugeiconsIcon icon={Loading03Icon} size={16} className="animate-spin" />
                  Menghapus...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <HugeiconsIcon icon={Delete02Icon} size={16} />
                  Hapus
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
