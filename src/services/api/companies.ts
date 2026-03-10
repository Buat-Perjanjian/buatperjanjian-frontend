import api from '@/lib/api';
import { Company } from '@/types';

export const companiesApi = {
  create: (data: { name: string; address?: string; phone?: string }) =>
    api.post<Company>('/companies', data),
  getAll: () => api.get<Company[]>('/companies'),
};
