'use client';

import { useRef, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { WizardFormData } from '@/features/wizard/schemas/contractSchema';
import { ChatMsg } from '../hooks/useChatState';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { CollapsibleForm } from './CollapsibleForm';
import { HugeiconsIcon } from '@hugeicons/react';
import { AiBeautifyIcon } from '@hugeicons/core-free-icons';

interface ChatPanelProps {
  messages: ChatMsg[];
  isLoading: boolean;
  onSend: (text: string) => void;
  onFileUpload?: (file: File) => void;
  form: UseFormReturn<WizardFormData>;
}

const QUICK_CHIPS = [
  'Buat kontrak PKWT',
  'Buat NDA',
  'Tambah klausul',
  'Jelaskan pasal ini',
  'Ubah gaji',
];

export function ChatPanel({ messages, isLoading, onSend, onFileUpload, form }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full bg-slate-50/30 dark:bg-zinc-950/30">
      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600">
              <HugeiconsIcon icon={AiBeautifyIcon} size={16} color="white" />
            </div>
            <div className="rounded-2xl rounded-tl-md bg-white border border-slate-200/60 px-4 py-3 shadow-sm dark:bg-zinc-800 dark:border-zinc-700">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="ml-2 text-xs text-slate-400 dark:text-zinc-500">AI sedang mengetik...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Collapsible form sections */}
      <div className="border-t border-slate-200/60 dark:border-zinc-700 max-h-[35%] overflow-y-auto">
        <CollapsibleForm form={form} />
      </div>

      {/* Input with chips */}
      <ChatInput
        onSend={onSend}
        onFileUpload={onFileUpload}
        disabled={isLoading}
        chips={messages.length <= 1 ? QUICK_CHIPS : undefined}
        onChipClick={(chip) => onSend(chip)}
      />
    </div>
  );
}
