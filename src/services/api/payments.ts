import api from '@/lib/api';

export const paymentsApi = {
  create: (documentId: string) => api.post('/payments', { document_id: documentId }),
};
