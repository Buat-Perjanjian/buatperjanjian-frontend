'use client';

import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { Message01Icon, File02Icon } from '@hugeicons/core-free-icons';

interface BuilderLayoutProps {
  title: string;
  chatPanel: ReactNode;
  previewPanel: ReactNode;
  isGenerating?: boolean;
}

export function BuilderLayout({ title, chatPanel, previewPanel, isGenerating }: BuilderLayoutProps) {
  const [mobileView, setMobileView] = useState<'chat' | 'preview'>('chat');

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] -mx-4 -my-6 md:-mx-6">
      {/* Sub header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200/60 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-sm font-semibold text-slate-900 truncate dark:text-zinc-100">{title}</h1>
        {isGenerating && (
          <span className="inline-flex items-center gap-1.5 text-[11px] text-indigo-600 dark:text-indigo-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Generating...
          </span>
        )}
      </div>

      {/* Mobile toggle */}
      <div className="flex gap-2 p-2 md:hidden bg-slate-50 dark:bg-zinc-950">
        <button
          type="button"
          className={cn(
            'flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
            mobileView === 'chat'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'border border-slate-200/60 bg-white text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400'
          )}
          onClick={() => setMobileView('chat')}
        >
          <HugeiconsIcon icon={Message01Icon} size={14} color="currentColor" />
          Chat
        </button>
        <button
          type="button"
          className={cn(
            'flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
            mobileView === 'preview'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'border border-slate-200/60 bg-white text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400'
          )}
          onClick={() => setMobileView('preview')}
        >
          <HugeiconsIcon icon={File02Icon} size={14} color="currentColor" />
          Editor
        </button>
      </div>

      {/* Split panels */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left: Chat */}
        <div
          className={cn(
            'w-full md:w-[40%] lg:w-[35%] md:border-r border-slate-200/60 dark:border-zinc-800 flex flex-col',
            mobileView === 'preview' ? 'hidden md:flex' : 'flex'
          )}
        >
          {chatPanel}
        </div>

        {/* Right: Editor/Preview */}
        <div
          className={cn(
            'w-full md:w-[60%] lg:w-[65%] flex flex-col overflow-hidden',
            mobileView === 'chat' ? 'hidden md:flex' : 'flex'
          )}
        >
          {previewPanel}
        </div>
      </div>
    </div>
  );
}
