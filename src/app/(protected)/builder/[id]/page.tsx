'use client';

import { BuilderPage } from '@/features/builder/pages/BuilderPage';

export default function BuilderRoute({ params }: { params: { id: string } }) {
  return <BuilderPage documentId={params.id} />;
}
