'use client';

import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { documentsApi } from '@/services/api/documents';
import { WizardFormData } from '../schemas/contractSchema';
import { Loader2, RefreshCw } from 'lucide-react';

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
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Pratinjau Kontrak</h2>
        <p className="text-sm text-muted-foreground">
          Generate dan tinjau kontrak Anda sebelum melanjutkan ke pembayaran.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed p-8">
        {!generated ? (
          <>
            <p className="text-sm text-muted-foreground text-center">
              Klik tombol di bawah untuk generate pratinjau kontrak berdasarkan data yang telah Anda isi.
            </p>
            <Button type="button" onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Kontrak'
              )}
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm text-green-600 text-center">
              Kontrak berhasil di-generate. Lihat pratinjau di panel sebelah kanan.
            </p>
            <Button type="button" variant="outline" onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Generate Ulang
            </Button>
          </>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <p className="text-xs text-muted-foreground">
        Anda masih bisa kembali ke langkah sebelumnya untuk mengubah data.
      </p>
    </div>
  );
}
