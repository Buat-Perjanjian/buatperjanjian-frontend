'use client';

import { useMutation } from '@tanstack/react-query';
import { aiApi } from '@/services/api/ai';

export function useAIExplain() {
  return useMutation({
    mutationFn: (question: string) => aiApi.explain(question),
  });
}
