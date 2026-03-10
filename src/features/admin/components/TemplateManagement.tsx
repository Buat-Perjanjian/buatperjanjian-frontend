'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Pencil, Trash2, Plus } from 'lucide-react';
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
    <div className="space-y-4">
      <div>
        <Label htmlFor="tpl-name">Nama Template</Label>
        <Input id="tpl-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Kontrak PKWT Standar" />
      </div>
      <div>
        <Label htmlFor="tpl-type">Tipe Kontrak</Label>
        <Select value={contractType} onValueChange={setContractType}>
          <SelectTrigger id="tpl-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {contractTypes.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="tpl-html">Template HTML</Label>
        <Textarea id="tpl-html" value={html} onChange={(e) => setHtml(e.target.value)} rows={5} placeholder="<p>Isi template...</p>" />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Batal</Button>
        </DialogClose>
        <Button disabled={loading || !name.trim()} onClick={() => onSubmit({ name, contract_type: contractType, template_html: html || undefined })}>
          {loading ? 'Menyimpan...' : 'Simpan'}
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
    return <p className="py-8 text-center text-muted-foreground">Memuat template...</p>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Template</h3>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Template Baru</DialogTitle>
            </DialogHeader>
            <TemplateForm onSubmit={(d) => createMutation.mutate(d)} loading={createMutation.isPending} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Dibuat</TableHead>
              <TableHead className="w-24">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Belum ada template
                </TableCell>
              </TableRow>
            ) : (
              templates.map((tpl) => (
                <TableRow key={tpl.id}>
                  <TableCell className="font-medium">{tpl.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{tpl.contract_type ?? '-'}</Badge>
                  </TableCell>
                  <TableCell>{new Date(tpl.created_at).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => setEditTemplate(tpl)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(tpl.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Hapus</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit dialog */}
      <Dialog open={!!editTemplate} onOpenChange={(open) => !open && setEditTemplate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Template</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Apakah Anda yakin ingin menghapus template ini? Tindakan ini tidak dapat dibatalkan.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Batal</Button>
            <Button
              variant="destructive"
              disabled={deleteMutation.isPending}
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            >
              {deleteMutation.isPending ? 'Menghapus...' : 'Hapus'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
