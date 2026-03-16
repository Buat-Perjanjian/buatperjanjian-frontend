'use client';

import { useQuery } from '@tanstack/react-query';
import { documentsApi } from '@/services/api/documents';
import { useBuilderForm } from '../hooks/useBuilderForm';
import { useChatState } from '../hooks/useChatState';
import { useAutoPreview } from '../hooks/useAutoPreview';
import { BuilderLayout } from '../components/BuilderLayout';
import { ChatPanel } from '../components/ChatPanel';
import { EditablePreview } from '../components/EditablePreview';
import { WizardFormData } from '@/features/wizard/schemas/contractSchema';
import { HugeiconsIcon } from '@hugeicons/react';
import { Loading03Icon } from '@hugeicons/core-free-icons';

interface BuilderPageProps {
  documentId: string;
}

export function BuilderPage({ documentId }: BuilderPageProps) {
  const { data: docRes, isLoading: isDocLoading } = useQuery({
    queryKey: ['document', documentId],
    queryFn: () => documentsApi.getOne(documentId),
  });

  const document = docRes?.data;

  const initialData: Partial<WizardFormData> | undefined = document
    ? {
        contract_type: document.contract_type || undefined,
        ...((document as unknown as { versions?: Array<{ content_json?: Record<string, unknown> }> })
          ?.versions?.[0]?.content_json as Partial<WizardFormData> | undefined),
      }
    : undefined;

  const form = useBuilderForm(initialData);

  const { messages, isLoading: isChatLoading, sendMessage, handleFileUpload } = useChatState({
    form,
    documentId,
  });

  const { previewHtml, setPreviewHtml, isGenerating } = useAutoPreview({
    form,
    documentId,
    enabled: !isDocLoading,
  });

  if (isDocLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <HugeiconsIcon icon={Loading03Icon} size={28} className="animate-spin" color="#64748b" />
        <span className="ml-3 text-slate-500 dark:text-zinc-400">Memuat dokumen...</span>
      </div>
    );
  }

  return (
    <BuilderLayout
      title={document?.title || 'Contract Builder'}
      isGenerating={isGenerating}
      chatPanel={
        <ChatPanel
          messages={messages}
          isLoading={isChatLoading}
          onSend={sendMessage}
          onFileUpload={handleFileUpload}
          form={form}
        />
      }
      previewPanel={
        <EditablePreview
          html={previewHtml}
          onUpdate={(html) => setPreviewHtml(html)}
          documentId={documentId}
          onSave={async () => {
            if (previewHtml) {
              await documentsApi.saveDraft(documentId, { data: form.getValues() });
            }
          }}
        />
      }
    />
  );
}
