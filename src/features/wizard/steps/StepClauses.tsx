'use client';

import { UseFormReturn } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { clausesApi } from '@/services/api/clauses';
import { WizardFormData } from '../schemas/contractSchema';
import { cn } from '@/lib/utils';
import { Check, Plus, X, Loader2 } from 'lucide-react';

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
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">Memuat klausul...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Pilih Klausul</h2>
        <p className="text-sm text-muted-foreground">
          Tambahkan klausul tambahan ke kontrak Anda.
        </p>
      </div>

      {selectedClauses.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Klausul terpilih ({selectedClauses.length})</p>
          <div className="flex flex-wrap gap-2">
            {selectedClauses.map((id) => {
              const clause = clauses.find((c) => c.id === id);
              return (
                <Badge key={id} variant="secondary" className="gap-1 pr-1">
                  {clause?.title || id}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => toggleClause(id)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Hapus klausul</span>
                  </Button>
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {clauses.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Belum ada klausul tersedia untuk tipe kontrak ini.
        </p>
      ) : (
        <div className="grid gap-3">
          {clauses.map((clause) => {
            const selected = isSelected(clause.id);
            return (
              <Card
                key={clause.id}
                className={cn(
                  'cursor-pointer transition-colors hover:border-primary/50',
                  selected && 'border-primary bg-primary/5'
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
                <CardContent className="flex items-start gap-3 p-4">
                  <div
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors',
                      selected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground/30'
                    )}
                  >
                    {selected ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3 text-muted-foreground/50" />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm">{clause.title}</p>
                    {clause.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">{clause.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
