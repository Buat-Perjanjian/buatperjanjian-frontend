'use client';

import { useState, useCallback, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  WizardFormData,
  defaultWizardValues,
  stepSchemas,
  WIZARD_STEPS,
} from '../schemas/contractSchema';
import { wizardFormSchema } from '../schemas/contractSchema';

export interface UseWizardStateReturn {
  currentStep: number;
  totalSteps: number;
  form: UseFormReturn<WizardFormData>;
  nextStep: () => Promise<boolean>;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  stepTitle: string;
}

export function useWizardState(initialData?: Partial<WizardFormData>): UseWizardStateReturn {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = WIZARD_STEPS.length;

  const form = useForm<WizardFormData>({
    resolver: zodResolver(wizardFormSchema),
    defaultValues: {
      ...defaultWizardValues,
      ...initialData,
    },
    mode: 'onTouched',
  });

  const nextStep = useCallback(async () => {
    const schema = stepSchemas[currentStep];
    if (schema) {
      const fields = Object.keys(schema.shape) as (keyof WizardFormData)[];
      const isValid = await form.trigger(fields.length > 0 ? fields : undefined);
      if (!isValid) return false;
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      return true;
    }
    return false;
  }, [currentStep, totalSteps, form]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step);
      }
    },
    [totalSteps]
  );

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const stepTitle = WIZARD_STEPS[currentStep]?.title ?? '';

  return useMemo(
    () => ({
      currentStep,
      totalSteps,
      form,
      nextStep,
      prevStep,
      goToStep,
      isFirstStep,
      isLastStep,
      stepTitle,
    }),
    [currentStep, totalSteps, form, nextStep, prevStep, goToStep, isFirstStep, isLastStep, stepTitle]
  );
}
