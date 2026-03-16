'use client';

import { ChatMsg } from '../hooks/useChatState';
import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { AiBeautifyIcon, UserIcon } from '@hugeicons/core-free-icons';

interface ChatMessageProps {
  message: ChatMsg;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const fields = message.extractedFields;
  const hasFields = fields && Object.keys(fields).length > 0;

  return (
    <div className={cn('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
      {/* Avatar */}
      <div className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
        isUser
          ? 'bg-indigo-600'
          : 'bg-gradient-to-br from-violet-500 to-indigo-600'
      )}>
        <HugeiconsIcon
          icon={isUser ? UserIcon : AiBeautifyIcon}
          size={16}
          color="white"
        />
      </div>

      {/* Content */}
      <div className={cn('max-w-[80%] space-y-2', isUser ? 'items-end' : 'items-start')}>
        {/* Name + time */}
        <div className={cn('flex items-center gap-2', isUser && 'flex-row-reverse')}>
          <span className="text-[11px] font-semibold text-slate-700 dark:text-zinc-300">
            {isUser ? 'Anda' : 'AI Assistant'}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-zinc-500">
            {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Message bubble */}
        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-sm leading-relaxed',
            isUser
              ? 'bg-indigo-600 text-white rounded-tr-md'
              : 'bg-white border border-slate-200/60 text-slate-700 rounded-tl-md shadow-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200',
            isStreaming && 'animate-pulse'
          )}
        >
          {/* Render markdown-like content for AI messages */}
          {isUser ? (
            message.content
          ) : (
            <div className="space-y-2 [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4">
              {message.content.split('\n').map((line, i) => {
                if (!line.trim()) return <br key={i} />;
                // Bold
                const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                return (
                  <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
                );
              })}
            </div>
          )}
        </div>

        {/* Extracted fields chips */}
        {hasFields && (
          <div className="flex flex-wrap gap-1.5 px-1">
            {Object.entries(fields).map(([key, value]) =>
              value ? (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {key.replace(/_/g, ' ')}
                </span>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}
