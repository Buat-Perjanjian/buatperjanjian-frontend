import api from '@/lib/api';

export const aiApi = {
  rewrite: (text: string) => api.post('/ai/rewrite', { text }),
  explain: (question: string) => api.post('/ai/explain', { question }),
  analyze: (data: { file_url?: string; document_id?: string }) => api.post('/ai/analyze', data),
  rebuild: (fileUrl: string) => api.post('/ai/rebuild', { file_url: fileUrl }),
};
