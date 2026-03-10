'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
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
                    'flex flex-col items-center gap-1',
                    isCompleted && 'cursor-pointer'
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors',
                      isCompleted && 'border-primary bg-primary text-primary-foreground',
                      isCurrent && 'border-primary text-primary',
                      !isCompleted && !isCurrent && 'border-muted-foreground/30 text-muted-foreground/50'
                    )}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] leading-tight text-center max-w-[80px]',
                      isCurrent ? 'font-medium text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </span>
                </button>
                {index < WIZARD_STEPS.length - 1 && (
                  <div
                    className={cn(
                      'mx-2 h-0.5 flex-1',
                      index < currentStep ? 'bg-primary' : 'bg-muted-foreground/20'
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile vertical stepper */}
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
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors',
                  isCompleted && 'border-primary bg-primary text-primary-foreground cursor-pointer',
                  isCurrent && 'border-primary text-primary',
                  !isCompleted && !isCurrent && 'border-muted-foreground/30 text-muted-foreground/50'
                )}
                aria-label={step.title}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isCompleted ? <Check className="h-3 w-3" /> : index + 1}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-sm font-medium">
          Langkah {currentStep + 1}: {WIZARD_STEPS[currentStep]?.title}
        </p>
      </nav>
    </>
  );
}
