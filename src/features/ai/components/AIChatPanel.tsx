'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAIRewrite } from '../hooks/useAIRewrite';
import { useAIExplain } from '../hooks/useAIExplain';
import { Loader2, Sparkles, HelpCircle, X } from 'lucide-react';

interface AIChatPanelProps {
  onClose?: () => void;
}

export function AIChatPanel({ onClose }: AIChatPanelProps) {
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<'rewrite' | 'explain'>('rewrite');

  const rewriteMutation = useAIRewrite();
  const explainMutation = useAIExplain();

  const isLoading = rewriteMutation.isPending || explainMutation.isPending;

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    if (activeTab === 'rewrite') {
      rewriteMutation.mutate(input.trim());
    } else {
      explainMutation.mutate(input.trim());
    }
  };

  const result = activeTab === 'rewrite'
    ? (rewriteMutation.data?.data as { result?: string })?.result
    : (explainMutation.data?.data as { result?: string })?.result;

  const error = activeTab === 'rewrite'
    ? rewriteMutation.error
    : explainMutation.error;

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4" />
          Asisten AI
        </CardTitle>
        {onClose && (
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Tutup</span>
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'rewrite' | 'explain')}>
          <TabsList className="w-full">
            <TabsTrigger value="rewrite" className="flex-1 gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Tulis Ulang
            </TabsTrigger>
            <TabsTrigger value="explain" className="flex-1 gap-1.5">
              <HelpCircle className="h-3.5 w-3.5" />
              Jelaskan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rewrite" className="mt-3">
            <p className="text-xs text-muted-foreground mb-2">
              Masukkan teks klausul atau paragraf kontrak untuk ditulis ulang oleh AI.
            </p>
          </TabsContent>
          <TabsContent value="explain" className="mt-3">
            <p className="text-xs text-muted-foreground mb-2">
              Masukkan pertanyaan atau teks hukum yang ingin Anda pahami.
            </p>
          </TabsContent>
        </Tabs>

        <Textarea
          placeholder={
            activeTab === 'rewrite'
              ? 'Tempel teks yang ingin ditulis ulang...'
              : 'Tulis pertanyaan atau tempel teks hukum...'
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
        />

        <Button onClick={handleSubmit} disabled={!input.trim() || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Memproses...
            </>
          ) : activeTab === 'rewrite' ? (
            'Tulis Ulang'
          ) : (
            'Jelaskan'
          )}
        </Button>

        {error && (
          <p className="text-sm text-destructive">
            Gagal memproses. Silakan coba lagi.
          </p>
        )}

        {result && (
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Hasil AI:</p>
            <div className="text-sm whitespace-pre-wrap">{result}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
