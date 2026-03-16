'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WizardFormData, wizardFormSchema, defaultWizardValues } from '@/features/wizard/schemas/contractSchema';

export function useBuilderForm(initialData?: Partial<WizardFormData>) {
  const form = useForm<WizardFormData>({
    resolver: zodResolver(wizardFormSchema),
    defaultValues: {
      ...defaultWizardValues,
      ...initialData,
    },
    mode: 'onChange',
  });

  return form;
}
