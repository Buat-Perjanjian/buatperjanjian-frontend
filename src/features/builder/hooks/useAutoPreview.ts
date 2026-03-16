'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { WizardFormData } from '@/features/wizard/schemas/contractSchema';
import { documentsApi } from '@/services/api/documents';

interface UseAutoPreviewOptions {
  form: UseFormReturn<WizardFormData>;
  documentId: string;
  enabled: boolean;
}

export function useAutoPreview({ form, documentId, enabled }: UseAutoPreviewOptions) {
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastJsonRef = useRef<string>('');

  const generate = useCallback(async () => {
    if (!enabled) return;
    try {
      setIsGenerating(true);
      const values = form.getValues();
      // Save draft first
      await documentsApi.saveDraft(documentId, { data: values });
      // Then generate
      const { data } = await documentsApi.generate(documentId);
      if (data && (data as { preview_html?: string }).preview_html) {
        setPreviewHtml((data as { preview_html: string }).preview_html);
      }
    } catch {
      // Silently fail — preview will update on next change
    } finally {
      setIsGenerating(false);
    }
  }, [form, documentId, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const subscription = form.watch((values) => {
      const json = JSON.stringify(values);
      if (json === lastJsonRef.current) return;
      lastJsonRef.current = json;

      // Don't generate if no contract type
      if (!values.contract_type) return;

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        generate();
      }, 2000);
    });

    return () => {
      subscription.unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [form, enabled, generate]);

  return { previewHtml, setPreviewHtml, isGenerating, generate };
}
