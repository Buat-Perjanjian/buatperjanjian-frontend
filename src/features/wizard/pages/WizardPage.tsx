'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { documentsApi } from '@/services/api/documents';
import { WizardLayout } from '../components/WizardLayout';
import { useWizardState } from '../hooks/useWizardState';
import { useAutosaveDraft } from '../hooks/useAutosaveDraft';
import { WizardFormData } from '../schemas/contractSchema';
import { Loader2 } from 'lucide-react';

// Dynamic imports for code splitting
const StepContractType = dynamic(
  () => import('../steps/StepContractType').then((m) => ({ default: m.StepContractType })),
  { loading: () => <StepLoader /> }
);
const StepCompanyInfo = dynamic(
  () => import('../steps/StepCompanyInfo').then((m) => ({ default: m.StepCompanyInfo })),
  { loading: () => <StepLoader /> }
);
const StepEmployeeInfo = dynamic(
  () => import('../steps/StepEmployeeInfo').then((m) => ({ default: m.StepEmployeeInfo })),
  { loading: () => <StepLoader /> }
);
const StepJobDetails = dynamic(
  () => import('../steps/StepJobDetails').then((m) => ({ default: m.StepJobDetails })),
  { loading: () => <StepLoader /> }
);
const StepClauses = dynamic(
  () => import('../steps/StepClauses').then((m) => ({ default: m.StepClauses })),
  { loading: () => <StepLoader /> }
);
const StepPreview = dynamic(
  () => import('../steps/StepPreview').then((m) => ({ default: m.StepPreview })),
  { loading: () => <StepLoader /> }
);
const StepPayment = dynamic(
  () => import('../steps/StepPayment').then((m) => ({ default: m.StepPayment })),
  { loading: () => <StepLoader /> }
);

function StepLoader() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}

interface WizardPageProps {
  documentId: string;
}

export function WizardPage({ documentId }: WizardPageProps) {
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  // Fetch existing document data
  const { data: docRes, isLoading: isDocLoading } = useQuery({
    queryKey: ['document', documentId],
    queryFn: () => documentsApi.getOne(documentId),
  });

  const document = docRes?.data;

  // Extract initial data from document version content_json
  const initialData: Partial<WizardFormData> | undefined = document
    ? {
        contract_type: document.contract_type || undefined,
        ...((document as unknown as { versions?: Array<{ content_json?: Record<string, unknown> }> })
          ?.versions?.[0]?.content_json as Partial<WizardFormData> | undefined),
      }
    : undefined;

  const {
    currentStep,
    form,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep,
    isLastStep,
  } = useWizardState(initialData);

  const { saveStatus } = useAutosaveDraft(documentId, form.watch, !isDocLoading);

  const handleNext = useCallback(async () => {
    await nextStep();
  }, [nextStep]);

  const handlePreviewGenerated = useCallback((html: string) => {
    setPreviewHtml(html);
  }, []);

  if (isDocLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-3 text-muted-foreground">Memuat dokumen...</span>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepContractType form={form} />;
      case 1:
        return <StepCompanyInfo form={form} />;
      case 2:
        return <StepEmployeeInfo form={form} />;
      case 3:
        return <StepJobDetails form={form} />;
      case 4:
        return <StepClauses form={form} />;
      case 5:
        return (
          <StepPreview
            form={form}
            documentId={documentId}
            onPreviewGenerated={handlePreviewGenerated}
          />
        );
      case 6:
        return (
          <StepPayment
            documentId={documentId}
            contractType={form.getValues('contract_type')}
          />
        );
      default:
        return null;
    }
  };

  // Determine next button label based on step
  const getNextLabel = () => {
    if (currentStep === 5) return 'Lanjut ke Pembayaran';
    if (currentStep === 6) return undefined; // hide next on payment
    return undefined;
  };

  return (
    <WizardLayout
      currentStep={currentStep}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      onNext={handleNext}
      onPrev={prevStep}
      onStepClick={goToStep}
      saveStatus={saveStatus}
      previewHtml={previewHtml}
      title={document?.title || 'Wizard Kontrak'}
      nextLabel={getNextLabel()}
      showNext={currentStep !== 6}
    >
      {renderStep()}
    </WizardLayout>
  );
}
