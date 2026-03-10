'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { EyeIcon } from '@hugeicons/core-free-icons';

interface ContractPreviewProps {
  html: string | null;
}

export function ContractPreview({ html }: ContractPreviewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-3 flex items-center gap-2">
        <HugeiconsIcon icon={EyeIcon} size={14} color="#64748b" />
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Pratinjau Kontrak
        </h3>
      </div>
      <div className="flex-1 rounded-2xl border border-slate-200/60 bg-white shadow-sm overflow-auto">
        <div className="mx-auto max-w-[210mm] min-h-[297mm] p-8 md:p-12">
          {html ? (
            <div
              className="prose prose-sm max-w-none prose-headings:text-slate-900 prose-p:text-slate-600"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <div className="flex h-full min-h-[400px] items-center justify-center">
              <p className="text-center text-sm text-slate-400">
                Pratinjau kontrak akan muncul di sini setelah Anda mengisi data dan menekan Generate.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
