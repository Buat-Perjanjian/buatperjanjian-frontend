import api from '@/lib/api';
import { DocumentTemplate } from '@/types';

export const templatesApi = {
  getAll: (contractType?: string) =>
    api.get<DocumentTemplate[]>('/templates', { params: contractType ? { contract_type: contractType } : {} }),
  getOne: (id: string) => api.get<DocumentTemplate>('/templates/' + id),
};
