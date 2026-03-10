'use client';

import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { documentsApi } from '@/services/api/documents';
import { WizardFormData } from '../schemas/contractSchema';
import { HugeiconsIcon } from '@hugeicons/react';
import { Loading03Icon, SparklesIcon, CheckmarkCircle02Icon, Alert02Icon } from '@hugeicons/core-free-icons';

interface StepPreviewProps {
  form: UseFormReturn<WizardFormData>;
  documentId: string;
  onPreviewGenerated: (html: string) => void;
}

export function StepPreview({ form, documentId, onPreviewGenerated }: StepPreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      // Save draft first with latest data
      const data = form.getValues();
      await documentsApi.saveDraft(documentId, data as unknown as Record<string, unknown>);
      // Then generate
      const res = await documentsApi.generate(documentId);
      const html = (res.data as { preview_html?: string })?.preview_html || '';
      onPreviewGenerated(html);
      setGenerated(true);
    } catch {
      setError('Gagal generate kontrak. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Pratinjau Kontrak</h2>
        <p className="mt-1 text-sm text-slate-500">
          Generate dan tinjau kontrak Anda sebelum melanjutkan ke pembayaran.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-200/60 bg-slate-50/50 p-8">
        {!generated ? (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
              <HugeiconsIcon icon={SparklesIcon} size={28} color="#4f46e5" />
            </div>
            <p className="text-sm text-slate-500 text-center max-w-sm">
              Klik tombol di bawah untuk generate pratinjau kontrak berdasarkan data yang telah Anda isi.
            </p>
            <Button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {isGenerating ? (
                <>
                  <HugeiconsIcon icon={Loading03Icon} size={16} className="mr-2 animate-spin" color="currentColor" />
                  Generating...
                </>
              ) : (
                <>
                  <HugeiconsIcon icon={SparklesIcon} size={16} className="mr-2" color="currentColor" />
                  Generate Kontrak
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={28} color="#059669" />
            </div>
            <p className="text-sm text-emerald-600 text-center">
              Kontrak berhasil di-generate. Lihat pratinjau di panel sebelah kanan.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="rounded-xl border-slate-200"
            >
              {isGenerating ? (
                <HugeiconsIcon icon={Loading03Icon} size={16} className="mr-2 animate-spin" color="currentColor" />
              ) : (
                <HugeiconsIcon icon={SparklesIcon} size={16} className="mr-2" color="#4f46e5" />
              )}
              Generate Ulang
            </Button>
          </>
        )}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-500">
            <HugeiconsIcon icon={Alert02Icon} size={14} color="currentColor" />
            {error}
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400">
        Anda masih bisa kembali ke langkah sebelumnya untuk mengubah data.
      </p>
    </div>
  );
}
