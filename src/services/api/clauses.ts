import api from '@/lib/api';
import { ClauseLibrary } from '@/types';

export const clausesApi = {
  getAll: (contractType?: string) =>
    api.get<ClauseLibrary[]>('/clauses', { params: contractType ? { contract_type: contractType } : {} }),
};
