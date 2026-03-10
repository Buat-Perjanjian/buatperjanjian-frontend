'use client';

import { UseFormReturn } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { clausesApi } from '@/services/api/clauses';
import { WizardFormData } from '../schemas/contractSchema';
import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon, Add01Icon, Cancel01Icon, Loading03Icon } from '@hugeicons/core-free-icons';

interface StepClausesProps {
  form: UseFormReturn<WizardFormData>;
}

export function StepClauses({ form }: StepClausesProps) {
  const contractType = form.watch('contract_type');
  const selectedClauses = form.watch('selected_clauses') || [];

  const { data: clausesRes, isLoading } = useQuery({
    queryKey: ['clauses', contractType],
    queryFn: () => clausesApi.getAll(contractType),
  });

  const clauses = clausesRes?.data ?? [];

  const toggleClause = (clauseId: string) => {
    const current = form.getValues('selected_clauses') || [];
    const updated = current.includes(clauseId)
      ? current.filter((id) => id !== clauseId)
      : [...current, clauseId];
    form.setValue('selected_clauses', updated, { shouldValidate: true });
  };

  const isSelected = (clauseId: string) => selectedClauses.includes(clauseId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <HugeiconsIcon icon={Loading03Icon} size={20} className="animate-spin" color="#64748b" />
        <span className="ml-2 text-sm text-slate-500">Memuat klausul...</span>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Pilih Klausul</h2>
        <p className="mt-1 text-sm text-slate-500">
          Tambahkan klausul tambahan ke kontrak Anda.
        </p>
      </div>

      {selectedClauses.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">Klausul terpilih ({selectedClauses.length})</p>
          <div className="flex flex-wrap gap-2">
            {selectedClauses.map((id) => {
              const clause = clauses.find((c) => c.id === id);
              return (
                <Badge
                  key={id}
                  variant="secondary"
                  className="gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 pr-1.5 text-indigo-700"
                >
                  {clause?.title || id}
                  <button
                    type="button"
                    className="ml-0.5 rounded-md p-0.5 transition-colors hover:bg-indigo-100"
                    onClick={() => toggleClause(id)}
                  >
                    <HugeiconsIcon icon={Cancel01Icon} size={12} color="#4f46e5" />
                    <span className="sr-only">Hapus klausul</span>
                  </button>
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {clauses.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">
          Belum ada klausul tersedia untuk tipe kontrak ini.
        </p>
      ) : (
        <div className="grid gap-3">
          {clauses.map((clause) => {
            const selected = isSelected(clause.id);
            return (
              <div
                key={clause.id}
                className={cn(
                  'cursor-pointer rounded-2xl border bg-white p-4 transition-all hover:border-indigo-300 hover:shadow-sm',
                  selected
                    ? 'border-indigo-500 bg-indigo-50/50 shadow-sm'
                    : 'border-slate-200/60'
                )}
                onClick={() => toggleClause(clause.id)}
                role="checkbox"
                aria-checked={selected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleClause(clause.id);
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors',
                      selected
                        ? 'bg-indigo-600'
                        : 'border border-slate-300 bg-white'
                    )}
                  >
                    {selected ? (
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} size={12} color="#ffffff" />
                    ) : (
                      <HugeiconsIcon icon={Add01Icon} size={10} color="#cbd5e1" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900">{clause.title}</p>
                    {clause.description && (
                      <p className="mt-0.5 text-xs text-slate-500">{clause.description}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
