'use client';

import { Badge } from '@/components/ui/badge';
import type { DocumentTemplate } from '@/types';
import { HugeiconsIcon } from '@hugeicons/react';
import { File02Icon } from '@hugeicons/core-free-icons';

interface TemplateCardProps {
  template: DocumentTemplate;
  onSelect: (template: DocumentTemplate) => void;
}

const contractTypeColors: Record<string, string> = {
  PKWT: 'bg-blue-50 text-blue-700 border-blue-200/60',
  PKWTT: 'bg-purple-50 text-purple-700 border-purple-200/60',
  Freelance: 'bg-orange-50 text-orange-700 border-orange-200/60',
  NDA: 'bg-rose-50 text-rose-700 border-rose-200/60',
};

const contractTypeIconColors: Record<string, { bg: string; color: string }> = {
  PKWT: { bg: 'bg-blue-50', color: '#2563eb' },
  PKWTT: { bg: 'bg-purple-50', color: '#7c3aed' },
  Freelance: { bg: 'bg-orange-50', color: '#ea580c' },
  NDA: { bg: 'bg-rose-50', color: '#e11d48' },
};

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const typeColor = template.contract_type
    ? contractTypeColors[template.contract_type] || ''
    : '';
  const iconStyle = template.contract_type
    ? contractTypeIconColors[template.contract_type] || { bg: 'bg-slate-50', color: '#64748b' }
    : { bg: 'bg-slate-50', color: '#64748b' };

  return (
    <div
      className="group cursor-pointer rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md"
      onClick={() => onSelect(template)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(template);
        }
      }}
    >
      <div className="flex items-start gap-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconStyle.bg}`}>
          <HugeiconsIcon icon={File02Icon} size={20} color={iconStyle.color} />
        </div>
        <div className="min-w-0 space-y-1.5">
          <p className="text-sm font-semibold leading-tight text-slate-900">{template.name}</p>
          {template.contract_type && (
            <Badge variant="outline" className={`text-xs ${typeColor}`}>
              {template.contract_type}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
