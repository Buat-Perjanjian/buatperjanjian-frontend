'use client';

import { useState, useCallback, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { WizardFormData } from '@/features/wizard/schemas/contractSchema';
import { aiApi } from '@/services/api/ai';

export interface ChatMsg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  extractedFields?: Record<string, unknown>;
  timestamp: Date;
}

interface UseChatStateOptions {
  form: UseFormReturn<WizardFormData>;
  documentId: string;
}

export function useChatState({ form, documentId }: UseChatStateOptions) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Halo! Saya asisten hukum **BuatPerjanjian**. Ceritakan kontrak apa yang ingin Anda buat, atau langsung isi form di bawah. Anda juga bisa upload file kontrak lama untuk saya extract datanya.',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(form);
  formRef.current = form;

  const applyFields = useCallback((fields: Record<string, unknown>) => {
    const currentForm = formRef.current;
    const formValues = currentForm.getValues();
    for (const [key, value] of Object.entries(fields)) {
      if (value && key in formValues) {
        currentForm.setValue(key as keyof WizardFormData, value as never, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    }
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: ChatMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const currentForm = formRef.current;
      const allMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const { data } = await aiApi.chat(
        allMessages,
        currentForm.getValues('contract_type'),
        currentForm.getValues() as Record<string, unknown>,
        documentId,
      );

      if (data.extracted_fields && typeof data.extracted_fields === 'object') {
        applyFields(data.extracted_fields as Record<string, unknown>);
      }

      const assistantMsg: ChatMsg = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        extractedFields: data.extracted_fields || undefined,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMsg = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, documentId, applyFields]);

  const handleFileUpload = useCallback(async (file: File) => {
    const fileMsg: ChatMsg = {
      id: `user-file-${Date.now()}`,
      role: 'user',
      content: `📎 Mengupload file: ${file.name}`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, fileMsg]);
    setIsLoading(true);

    try {
      // Read file as text for supported types
      let fileText = '';
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        fileText = await file.text();
      }

      // Use rebuild endpoint to extract contract data from file
      if (fileText) {
        const { data } = await aiApi.rebuild(fileText);
        const contractJson = data?.contract_json || {};

        // Map rebuild response to form fields
        const extracted: Record<string, string> = {};
        if (contractJson.pihak_pertama) extracted.nama_perusahaan = contractJson.pihak_pertama;
        if (contractJson.pihak_kedua) extracted.nama_karyawan = contractJson.pihak_kedua;
        if (contractJson.jabatan) extracted.jabatan = contractJson.jabatan;
        if (contractJson.gaji) extracted.gaji = contractJson.gaji;
        if (contractJson.masa_kontrak) extracted.masa_kontrak = contractJson.masa_kontrak;

        applyFields(extracted);

        const resultMsg: ChatMsg = {
          id: `assistant-file-${Date.now()}`,
          role: 'assistant',
          content: `Saya sudah menganalisis file **${file.name}** dan mengekstrak data kontrak. Beberapa field sudah saya isi otomatis. Silakan periksa dan lengkapi data yang masih kosong.`,
          extractedFields: extracted,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, resultMsg]);
      } else {
        // For non-text files, inform user
        const infoMsg: ChatMsg = {
          id: `assistant-file-${Date.now()}`,
          role: 'assistant',
          content: `File **${file.name}** diterima. Untuk saat ini saya bisa memproses file teks. Untuk PDF dan DOCX, fitur extract sedang dalam pengembangan. Silakan ceritakan isi kontrak Anda dan saya akan bantu mengisi form.`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, infoMsg]);
      }
    } catch {
      const errorMsg: ChatMsg = {
        id: `error-file-${Date.now()}`,
        role: 'assistant',
        content: 'Maaf, gagal memproses file. Silakan coba lagi atau ceritakan isi kontrak secara manual.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [applyFields]);

  return { messages, isLoading, sendMessage, handleFileUpload };
}
