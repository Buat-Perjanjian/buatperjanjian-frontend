'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { documentsApi } from '@/services/api/documents';
import { WizardFormData } from '../schemas/contractSchema';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function useAutosaveDraft(
  documentId: string,
  watch: UseFormWatch<WizardFormData>,
  enabled: boolean = true
) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>('');

  const saveDraft = useCallback(
    async (data: WizardFormData) => {
      const serialized = JSON.stringify(data);
      if (serialized === lastSavedRef.current) return;

      setSaveStatus('saving');
      try {
        await documentsApi.saveDraft(documentId, data as unknown as Record<string, unknown>);
        lastSavedRef.current = serialized;
        setSaveStatus('saved');
      } catch {
        setSaveStatus('error');
      }
    },
    [documentId]
  );

  useEffect(() => {
    if (!enabled) return;

    const subscription = watch((data) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        saveDraft(data as WizardFormData);
      }, 2000);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [watch, saveDraft, enabled]);

  return { saveStatus };
}
