'use client';

import { WizardPage } from '@/features/wizard/pages/WizardPage';

export default function WizardRoute({
  params,
}: {
  params: { id: string };
}) {
  return <WizardPage documentId={params.id} />;
}
