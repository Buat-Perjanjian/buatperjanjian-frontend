import api from '@/lib/api';
import { Document } from '@/types';

export const documentsApi = {
  create: (data: { company_id: string; contract_type: string; title?: string }) =>
    api.post<Document>('/documents', data),
  getAll: (params?: { status?: string; contract_type?: string }) =>
    api.get<Document[]>('/documents', { params }),
  getOne: (id: string) => api.get<Document>('/documents/' + id),
  saveDraft: (id: string, data: Record<string, unknown>) =>
    api.post('/documents/' + id + '/draft', data),
  generate: (id: string) => api.post('/documents/' + id + '/generate'),
  delete: (id: string) => api.delete('/documents/' + id),
  getVersions: (id: string) => api.get('/documents/' + id + '/versions'),
  restoreVersion: (docId: string, versionId: string) =>
    api.post('/documents/' + docId + '/versions/' + versionId + '/restore'),
  addClause: (id: string, clauseId: string) =>
    api.post('/documents/' + id + '/clauses', { clause_id: clauseId }),
  download: (id: string) => api.get('/documents/' + id + '/download', { responseType: 'blob' }),
  downloadPdf: (id: string) => api.get('/documents/' + id + '/download-pdf', { responseType: 'blob' }),
};
