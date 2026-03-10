'use client';

import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
import { WIZARD_STEPS } from '../schemas/contractSchema';

interface StepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function Stepper({ currentStep, onStepClick }: StepperProps) {
  return (
    <>
      {/* Desktop horizontal stepper */}
      <nav className="hidden md:block" aria-label="Wizard steps">
        <ol className="flex items-center">
          {WIZARD_STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            return (
              <li key={step.title} className="flex flex-1 items-center last:flex-none">
                <button
                  type="button"
                  onClick={() => isCompleted && onStepClick(index)}
                  disabled={!isCompleted}
                  className={cn(
                    'flex flex-col items-center gap-1.5',
                    isCompleted && 'cursor-pointer'
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                      isCompleted && 'bg-indigo-600 text-white',
                      isCurrent && 'border-2 border-indigo-600 text-indigo-600 bg-indigo-50',
                      !isCompleted && !isCurrent && 'border-2 border-slate-200 text-slate-400 bg-slate-50'
                    )}
                  >
                    {isCompleted ? (
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} color="currentColor" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] leading-tight text-center max-w-[80px]',
                      isCurrent ? 'font-medium text-slate-900' : isCompleted ? 'text-indigo-600 font-medium' : 'text-slate-400'
                    )}
                  >
                    {step.title}
                  </span>
                </button>
                {index < WIZARD_STEPS.length - 1 && (
                  <div
                    className={cn(
                      'mx-2 h-0.5 flex-1 rounded-full',
                      index < currentStep ? 'bg-indigo-600' : 'bg-slate-200'
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile stepper */}
      <nav className="md:hidden" aria-label="Wizard steps">
        <div className="flex items-center gap-2 px-1">
          {WIZARD_STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            return (
              <button
                key={step.title}
                type="button"
                onClick={() => isCompleted && onStepClick(index)}
                disabled={!isCompleted}
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                  isCompleted && 'bg-indigo-600 text-white cursor-pointer',
                  isCurrent && 'border-2 border-indigo-600 text-indigo-600 bg-indigo-50',
                  !isCompleted && !isCurrent && 'border-2 border-slate-200 text-slate-400 bg-slate-50'
                )}
                aria-label={step.title}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isCompleted ? (
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={12} color="currentColor" />
                ) : (
                  index + 1
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-sm font-medium text-slate-900">
          Langkah {currentStep + 1}: {WIZARD_STEPS[currentStep]?.title}
        </p>
      </nav>
    </>
  );
}
