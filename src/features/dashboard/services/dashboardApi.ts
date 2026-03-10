import { documentsApi } from '@/services/api/documents';
import { companiesApi } from '@/services/api/companies';

export const dashboardApi = {
  getDocuments: () => documentsApi.getAll(),
  getCompanies: () => companiesApi.getAll(),
};
