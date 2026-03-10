import api from '@/lib/api';

export const adminApi = {
  getUsers: (params?: { page?: number; limit?: number }) =>
    api.get('/admin/users', { params }),
  getAnalytics: () => api.get('/admin/analytics'),
  createTemplate: (data: { name: string; contract_type: string; template_html?: string }) =>
    api.post('/admin/templates', data),
  updateTemplate: (id: string, data: { name?: string; contract_type?: string; template_html?: string }) =>
    api.put('/admin/templates/' + id, data),
  deleteTemplate: (id: string) => api.delete('/admin/templates/' + id),
};
