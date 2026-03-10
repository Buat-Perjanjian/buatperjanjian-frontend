'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  MoreHorizontalIcon,
  EyeIcon,
  PencilEdit02Icon,
  Delete02Icon,
  Loading03Icon,
  File02Icon,
  Calendar03Icon,
} from '@hugeicons/core-free-icons';
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

interface DocumentTableProps {
  documents: Document[];
}

const statusConfig: Record<
  Document['status'],
  { label: string; bgClass: string; textClass: string }
> = {
  draft: { label: 'Draft', bgClass: 'bg-slate-100', textClass: 'text-slate-600' },
  generated: { label: 'Generated', bgClass: 'bg-blue-50', textClass: 'text-blue-700' },
  paid: { label: 'Lunas', bgClass: 'bg-emerald-50', textClass: 'text-emerald-700' },
  signed: { label: 'Ditandatangani', bgClass: 'bg-indigo-50', textClass: 'text-indigo-700' },
};

const contractTypeColors: Record<string, { bg: string; text: string }> = {
  PKWT: { bg: 'bg-blue-50', text: 'text-blue-700' },
  PKWTT: { bg: 'bg-purple-50', text: 'text-purple-700' },
  Freelance: { bg: 'bg-orange-50', text: 'text-orange-700' },
  NDA: { bg: 'bg-rose-50', text: 'text-rose-700' },
};

function ActionsDropdown({
  onView,
  onEdit,
  onDelete,
}: {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
      >
        <HugeiconsIcon icon={MoreHorizontalIcon} size={18} color="currentColor" />
        <span className="sr-only">Aksi</span>
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-1 w-40 rounded-xl border border-slate-200/60 bg-white py-1 shadow-lg">
          <button
            onClick={() => {
              setOpen(false);
              onView();
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
          >
            <HugeiconsIcon icon={EyeIcon} size={16} color="#64748b" />
            Lihat
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
          >
            <HugeiconsIcon icon={PencilEdit02Icon} size={16} color="#64748b" />
            Edit
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <HugeiconsIcon icon={Delete02Icon} size={16} color="#dc2626" />
            Hapus
          </button>
        </div>
      )}
    </div>
  );
}

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
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/60 bg-white p-12 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
          <HugeiconsIcon icon={File02Icon} size={24} color="#94a3b8" />
        </div>
        <p className="mt-4 text-sm font-medium text-slate-900">Belum ada dokumen.</p>
        <p className="mt-1 text-sm text-slate-500">
          Mulai buat kontrak pertama Anda dengan klik tombol di atas.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200/60 bg-slate-50/50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Judul
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Tipe Kontrak
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <button
                  className="inline-flex items-center gap-1 transition-colors hover:text-slate-900"
                  onClick={() => setSortAsc(!sortAsc)}
                >
                  <HugeiconsIcon icon={Calendar03Icon} size={14} color="currentColor" />
                  Tanggal Dibuat
                  <svg
                    className={`h-3 w-3 transition-transform ${sortAsc ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </th>
              <th className="w-[60px] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60">
            {sorted.map((doc) => {
              const status = statusConfig[doc.status];
              const typeColor = doc.contract_type
                ? contractTypeColors[doc.contract_type]
                : null;
              return (
                <tr
                  key={doc.id}
                  className="transition-colors hover:bg-slate-50/50"
                >
                  <td className="px-4 py-3.5 text-sm font-medium text-slate-900">
                    {doc.title || 'Tanpa Judul'}
                  </td>
                  <td className="px-4 py-3.5">
                    {doc.contract_type && typeColor ? (
                      <span
                        className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium ${typeColor.bg} ${typeColor.text}`}
                      >
                        {doc.contract_type}
                      </span>
                    ) : (
                      <span className="text-sm text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium ${status.bgClass} ${status.textClass}`}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-500">
                    {format(new Date(doc.created_at), 'dd MMM yyyy')}
                  </td>
                  <td className="px-4 py-3.5">
                    <ActionsDropdown
                      onView={() => router.push(`/documents/${doc.id}`)}
                      onEdit={() => router.push(`/wizard/${doc.id}`)}
                      onDelete={() => setDeleteId(doc.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-slate-900">Hapus Dokumen</DialogTitle>
            <DialogDescription className="text-slate-500">
              Apakah Anda yakin ingin menghapus dokumen ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <button
              onClick={() => setDeleteId(null)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200/60 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              disabled={deleteMutation.isPending}
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              {deleteMutation.isPending && (
                <HugeiconsIcon
                  icon={Loading03Icon}
                  size={16}
                  color="currentColor"
                  className="animate-spin"
                />
              )}
              Hapus
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
