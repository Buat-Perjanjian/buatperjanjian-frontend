'use client';

import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { WizardFormData } from '../schemas/contractSchema';
import { cn } from '@/lib/utils';
import { FileText, Shield, Users, Handshake } from 'lucide-react';

interface StepContractTypeProps {
  form: UseFormReturn<WizardFormData>;
}

const contractTypes = [
  {
    value: 'PKWT' as const,
    title: 'PKWT',
    description: 'Perjanjian Kerja Waktu Tertentu — kontrak kerja dengan jangka waktu terbatas.',
    icon: FileText,
  },
  {
    value: 'PKWTT' as const,
    title: 'PKWTT',
    description: 'Perjanjian Kerja Waktu Tidak Tertentu — kontrak kerja tetap tanpa batas waktu.',
    icon: Users,
  },
  {
    value: 'Freelance' as const,
    title: 'Freelance',
    description: 'Perjanjian kerja lepas untuk proyek atau tugas tertentu.',
    icon: Handshake,
  },
  {
    value: 'NDA' as const,
    title: 'NDA',
    description: 'Non-Disclosure Agreement — perjanjian kerahasiaan informasi.',
    icon: Shield,
  },
];

export function StepContractType({ form }: StepContractTypeProps) {
  const selected = form.watch('contract_type');

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Pilih Tipe Kontrak</h2>
        <p className="text-sm text-muted-foreground">
          Tentukan jenis perjanjian yang ingin Anda buat.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {contractTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selected === type.value;
          return (
            <Card
              key={type.value}
              className={cn(
                'cursor-pointer transition-colors hover:border-primary/50',
                isSelected && 'border-primary ring-2 ring-primary/20'
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
              <CardContent className="flex items-start gap-3 p-4">
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{type.title}</p>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {form.formState.errors.contract_type && (
        <p className="text-sm text-destructive">{form.formState.errors.contract_type.message}</p>
      )}
    </div>
  );
}
