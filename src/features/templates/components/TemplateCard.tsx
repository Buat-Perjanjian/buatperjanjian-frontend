'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { DocumentTemplate } from '@/types';
import { FileText } from 'lucide-react';

interface TemplateCardProps {
  template: DocumentTemplate;
  onSelect: (template: DocumentTemplate) => void;
}

const contractTypeColors: Record<string, string> = {
  PKWT: 'bg-blue-100 text-blue-800',
  PKWTT: 'bg-purple-100 text-purple-800',
  Freelance: 'bg-orange-100 text-orange-800',
  NDA: 'bg-rose-100 text-rose-800',
};

const contractTypeIcons: Record<string, string> = {
  PKWT: 'bg-blue-50 text-blue-600',
  PKWTT: 'bg-purple-50 text-purple-600',
  Freelance: 'bg-orange-50 text-orange-600',
  NDA: 'bg-rose-50 text-rose-600',
};

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const typeColor = template.contract_type
    ? contractTypeColors[template.contract_type] || ''
    : '';
  const iconBg = template.contract_type
    ? contractTypeIcons[template.contract_type] || 'bg-muted text-muted-foreground'
    : 'bg-muted text-muted-foreground';

  return (
    <Card
      className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-md"
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
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0 space-y-1.5">
            <p className="font-semibold text-sm leading-tight">{template.name}</p>
            {template.contract_type && (
              <Badge variant="outline" className={typeColor}>
                {template.contract_type}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
