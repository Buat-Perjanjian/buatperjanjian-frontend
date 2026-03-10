'use client';

import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Stepper } from './Stepper';
import { ContractPreview } from './ContractPreview';
import { SaveStatus } from '../hooks/useAutosaveDraft';
import { HugeiconsIcon } from '@hugeicons/react';
import { File02Icon, ArrowLeft01Icon, ArrowRight01Icon, CloudSavingDone01Icon, Alert02Icon } from '@hugeicons/core-free-icons';
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

const saveStatusConfig: Record<SaveStatus, { label: string; className: string }> = {
  idle: { label: '', className: '' },
  saving: { label: 'Menyimpan...', className: 'text-slate-400' },
  saved: { label: 'Tersimpan', className: 'text-emerald-600' },
  error: { label: 'Gagal menyimpan', className: 'text-red-500' },
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
        <h1 className="text-lg font-bold truncate text-slate-900">{title || 'Wizard Kontrak'}</h1>
        {saveStatus !== 'idle' && (
          <span className={cn('inline-flex items-center gap-1.5 text-xs shrink-0', saveStatusConfig[saveStatus].className)}>
            {saveStatus === 'saved' && <HugeiconsIcon icon={CloudSavingDone01Icon} size={14} color="currentColor" />}
            {saveStatus === 'error' && <HugeiconsIcon icon={Alert02Icon} size={14} color="currentColor" />}
            {saveStatusConfig[saveStatus].label}
          </span>
        )}
      </div>

      {/* Stepper */}
      <Stepper currentStep={currentStep} onStepClick={onStepClick} />

      {/* Mobile view toggle */}
      <div className="flex gap-2 md:hidden">
        <button
          type="button"
          className={cn(
            'flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
            mobileView === 'form'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'border border-slate-200/60 bg-white text-slate-600 hover:bg-slate-50'
          )}
          onClick={() => setMobileView('form')}
        >
          <HugeiconsIcon icon={File02Icon} size={14} color="currentColor" />
          Form
        </button>
        <button
          type="button"
          className={cn(
            'flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
            mobileView === 'preview'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'border border-slate-200/60 bg-white text-slate-600 hover:bg-slate-50'
          )}
          onClick={() => setMobileView('preview')}
        >
          <HugeiconsIcon icon={File02Icon} size={14} color="currentColor" />
          Pratinjau
        </button>
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
          <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
            {children}
          </div>
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
      <div className="flex items-center justify-between border-t border-slate-200/60 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={isFirstStep}
          className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} color="currentColor" className="mr-1.5" />
          Sebelumnya
        </Button>
        {showNext && (
          <Button
            type="button"
            onClick={onNext}
            className="rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {nextLabel || (isLastStep ? 'Selesai' : 'Selanjutnya')}
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} color="currentColor" className="ml-1.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
