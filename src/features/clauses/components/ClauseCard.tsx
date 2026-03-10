'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ClauseLibrary } from '@/types';
import { cn } from '@/lib/utils';
import { Check, Plus } from 'lucide-react';

interface ClauseCardProps {
  clause: ClauseLibrary;
  selected: boolean;
  onToggle: (clauseId: string) => void;
}

const contractTypeColors: Record<string, string> = {
  PKWT: 'bg-blue-100 text-blue-800',
  PKWTT: 'bg-purple-100 text-purple-800',
  Freelance: 'bg-orange-100 text-orange-800',
  NDA: 'bg-rose-100 text-rose-800',
};

export function ClauseCard({ clause, selected, onToggle }: ClauseCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-colors hover:border-primary/50',
        selected && 'border-primary bg-primary/5'
      )}
      onClick={() => onToggle(clause.id)}
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle(clause.id);
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
          {selected ? (
            <Check className="h-3 w-3" />
          ) : (
            <Plus className="h-3 w-3 text-muted-foreground/50" />
          )}
        </div>
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm">{clause.title}</p>
            {clause.contract_type && (
              <Badge
                variant="outline"
                className={cn('text-[10px] px-1.5 py-0', contractTypeColors[clause.contract_type] || '')}
              >
                {clause.contract_type}
              </Badge>
            )}
          </div>
          {clause.description && (
            <p className="text-xs text-muted-foreground">{clause.description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
