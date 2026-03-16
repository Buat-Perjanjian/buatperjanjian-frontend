'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { HugeiconsIcon } from '@hugeicons/react';
import { SentIcon, AttachmentIcon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (text: string) => void;
  onFileUpload?: (file: File) => void;
  disabled?: boolean;
  chips?: string[];
  onChipClick?: (chip: string) => void;
}

export function ChatInput({ onSend, onFileUpload, disabled, chips, onChipClick }: ChatInputProps) {
  const [text, setText] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
      e.target.value = '';
    }
  };

  return (
    <div className="border-t border-slate-200/60 bg-white dark:border-zinc-700 dark:bg-zinc-900">
      {/* Quick action chips */}
      {chips && chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-3 pt-3">
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => onChipClick?.(chip)}
              disabled={disabled}
              className={cn(
                'inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 active:scale-95',
                'dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-indigo-950 dark:hover:text-indigo-300',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="flex items-end gap-2 p-3">
        {/* File upload */}
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
          onChange={handleFile}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={disabled}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/60 text-slate-400 transition-all hover:bg-slate-50 hover:text-slate-600 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          title="Upload file (PDF, DOCX, Image)"
        >
          <HugeiconsIcon icon={AttachmentIcon} size={18} color="currentColor" />
        </button>

        {/* Text input */}
        <div className="relative flex-1">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik pesan... (Enter untuk kirim, Shift+Enter baris baru)"
            rows={1}
            className="min-h-[40px] max-h-[120px] resize-none rounded-xl border-slate-200/60 bg-slate-50/50 pr-12 text-sm dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200 dark:placeholder:text-zinc-500"
            disabled={disabled}
          />
        </div>

        {/* Send button */}
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          className="h-10 w-10 shrink-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 dark:bg-indigo-600 dark:hover:bg-indigo-500"
        >
          <HugeiconsIcon icon={SentIcon} size={18} color="white" />
        </Button>
      </div>
    </div>
  );
}
