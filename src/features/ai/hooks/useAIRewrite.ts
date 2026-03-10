'use client';

import { useMutation } from '@tanstack/react-query';
import { aiApi } from '@/services/api/ai';

export function useAIRewrite() {
  return useMutation({
    mutationFn: (text: string) => aiApi.rewrite(text),
  });
}
