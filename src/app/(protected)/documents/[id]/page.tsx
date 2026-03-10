'use client';

import { DocumentDetailPage } from '@/features/documents/pages/DocumentDetailPage';

export default function DocumentDetailRoute({
  params,
}: {
  params: { id: string };
}) {
  return <DocumentDetailPage documentId={params.id} />;
}
