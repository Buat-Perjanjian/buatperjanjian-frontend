'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { clausesApi } from '@/services/api/clauses';
import { ClauseCard } from './ClauseCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface ClauseSelectorProps {
  contractType?: string;
  selectedIds: string[];
  onToggle: (clauseId: string) => void;
}

const CONTRACT_TYPES = ['PKWT', 'PKWTT', 'Freelance', 'NDA'] as const;

export function ClauseSelector({ contractType, selectedIds, onToggle }: ClauseSelectorProps) {
  const [filterType, setFilterType] = useState<string>(contractType || 'all');

  const { data: res, isLoading } = useQuery({
    queryKey: ['clauses', filterType],
    queryFn: () => clausesApi.getAll(filterType !== 'all' ? filterType : undefined),
  });

  const clauses = res?.data ?? [];

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
      {!contractType && (
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter tipe kontrak" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Tipe</SelectItem>
            {CONTRACT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {clauses.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Belum ada klausul tersedia.
        </p>
      ) : (
        <div className="grid gap-3">
          {clauses.map((clause) => (
            <ClauseCard
              key={clause.id}
              clause={clause}
              selected={selectedIds.includes(clause.id)}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
