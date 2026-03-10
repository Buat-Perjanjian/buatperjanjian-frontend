'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';

export function QuickActions() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => router.push('/templates')} className="gap-2">
        <Plus className="h-4 w-4" />
        Buat Kontrak Baru
      </Button>
      <Button
        variant="outline"
        onClick={() => router.push('/documents')}
        className="gap-2"
      >
        <FileText className="h-4 w-4" />
        Lihat Semua Dokumen
      </Button>
    </div>
  );
}
