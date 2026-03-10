'use client';

import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Stepper } from './Stepper';
import { ContractPreview } from './ContractPreview';
import { SaveStatus } from '../hooks/useAutosaveDraft';
import { FileText, PenLine } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardLayoutProps {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onNext: () => void;
  onPrev: () => void;
  onStepClick: (step: number) => void;
  saveStatus: SaveStatus;
  previewHtml: string | null;
  title: string;
  children: ReactNode;
  nextLabel?: string;
  showNext?: boolean;
}

const saveStatusLabels: Record<SaveStatus, string> = {
  idle: '',
  saving: 'Menyimpan...',
  saved: 'Tersimpan',
  error: 'Gagal menyimpan',
};

export function WizardLayout({
  currentStep,
  isFirstStep,
  isLastStep,
  onNext,
  onPrev,
  onStepClick,
  saveStatus,
  previewHtml,
  title,
  children,
  nextLabel,
  showNext = true,
}: WizardLayoutProps) {
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');

  return (
    <div className="flex flex-col h-full min-h-0 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold truncate">{title || 'Wizard Kontrak'}</h1>
        {saveStatus !== 'idle' && (
          <span
            className={cn(
              'text-xs shrink-0',
              saveStatus === 'saving' && 'text-muted-foreground',
              saveStatus === 'saved' && 'text-green-600',
              saveStatus === 'error' && 'text-destructive'
            )}
          >
            {saveStatusLabels[saveStatus]}
          </span>
        )}
      </div>

      {/* Stepper */}
      <Stepper currentStep={currentStep} onStepClick={onStepClick} />

      {/* Mobile view toggle */}
      <div className="flex gap-2 md:hidden">
        <Button
          type="button"
          variant={mobileView === 'form' ? 'default' : 'outline'}
          size="sm"
          className="flex-1"
          onClick={() => setMobileView('form')}
        >
          <PenLine className="mr-1.5 h-3.5 w-3.5" />
          Form
        </Button>
        <Button
          type="button"
          variant={mobileView === 'preview' ? 'default' : 'outline'}
          size="sm"
          className="flex-1"
          onClick={() => setMobileView('preview')}
        >
          <FileText className="mr-1.5 h-3.5 w-3.5" />
          Pratinjau
        </Button>
      </div>

      {/* Two-panel layout */}
      <div className="flex flex-1 gap-6 min-h-0 overflow-hidden">
        {/* Form panel */}
        <div
          className={cn(
            'flex-1 overflow-y-auto',
            mobileView === 'preview' ? 'hidden md:block' : 'block'
          )}
        >
          {children}
        </div>

        {/* Preview panel */}
        <div
          className={cn(
            'w-full md:w-[45%] md:max-w-[500px] shrink-0 overflow-y-auto',
            mobileView === 'form' ? 'hidden md:block' : 'block'
          )}
        >
          <ContractPreview html={previewHtml} />
        </div>
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-between border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={isFirstStep}
        >
          Sebelumnya
        </Button>
        {showNext && (
          <Button type="button" onClick={onNext}>
            {nextLabel || (isLastStep ? 'Selesai' : 'Selanjutnya')}
          </Button>
        )}
      </div>
    </div>
  );
}
