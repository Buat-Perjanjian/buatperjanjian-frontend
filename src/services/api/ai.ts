import api from '@/lib/api';

interface ChatMessage {
  role: string;
  content: string;
}

export const aiApi = {
  rewrite: (text: string) => api.post('/ai/rewrite', { text }),
  explain: (question: string) => api.post('/ai/explain', { question }),
  analyze: (data: { file_url?: string; document_id?: string }) => api.post('/ai/analyze', data),
  rebuild: (fileUrl: string) => api.post('/ai/rebuild', { file_url: fileUrl }),
  chat: (messages: ChatMessage[], contractType?: string, currentFields?: Record<string, unknown>, documentId?: string) =>
    api.post('/ai/chat', { messages, contract_type: contractType, current_fields: currentFields, document_id: documentId }),
};
