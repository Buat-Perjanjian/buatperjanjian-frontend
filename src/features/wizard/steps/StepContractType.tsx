'use client';

import { UseFormReturn } from 'react-hook-form';
import { WizardFormData } from '../schemas/contractSchema';
import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { File02Icon, UserIcon, Briefcase01Icon, FileValidationIcon } from '@hugeicons/core-free-icons';

interface StepContractTypeProps {
  form: UseFormReturn<WizardFormData>;
}

const contractTypes = [
  {
    value: 'PKWT' as const,
    title: 'PKWT',
    description: 'Perjanjian Kerja Waktu Tertentu — kontrak kerja dengan jangka waktu terbatas.',
    icon: File02Icon,
    color: '#4f46e5',
    bgSelected: 'bg-indigo-50',
  },
  {
    value: 'PKWTT' as const,
    title: 'PKWTT',
    description: 'Perjanjian Kerja Waktu Tidak Tertentu — kontrak kerja tetap tanpa batas waktu.',
    icon: UserIcon,
    color: '#7c3aed',
    bgSelected: 'bg-violet-50',
  },
  {
    value: 'Freelance' as const,
    title: 'Freelance',
    description: 'Perjanjian kerja lepas untuk proyek atau tugas tertentu.',
    icon: Briefcase01Icon,
    color: '#ea580c',
    bgSelected: 'bg-orange-50',
  },
  {
    value: 'NDA' as const,
    title: 'NDA',
    description: 'Non-Disclosure Agreement — perjanjian kerahasiaan informasi.',
    icon: FileValidationIcon,
    color: '#e11d48',
    bgSelected: 'bg-rose-50',
  },
];

export function StepContractType({ form }: StepContractTypeProps) {
  const selected = form.watch('contract_type');

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Pilih Tipe Kontrak</h2>
        <p className="mt-1 text-sm text-slate-500">
          Tentukan jenis perjanjian yang ingin Anda buat.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {contractTypes.map((type) => {
          const isSelected = selected === type.value;
          return (
            <div
              key={type.value}
              className={cn(
                'cursor-pointer rounded-2xl border bg-white p-4 transition-all hover:border-indigo-300 hover:shadow-md',
                isSelected
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
                  : 'border-slate-200/60 shadow-sm'
              )}
              onClick={() => form.setValue('contract_type', type.value, { shouldValidate: true })}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  form.setValue('contract_type', type.value, { shouldValidate: true });
                }
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors',
                    isSelected ? type.bgSelected : 'bg-slate-50'
                  )}
                >
                  <HugeiconsIcon
                    icon={type.icon}
                    size={20}
                    color={isSelected ? type.color : '#94a3b8'}
                  />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{type.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{type.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {form.formState.errors.contract_type && (
        <p className="text-sm text-red-500">{form.formState.errors.contract_type.message}</p>
      )}
    </div>
  );
}
