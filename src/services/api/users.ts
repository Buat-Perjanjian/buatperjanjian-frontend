import api from '@/lib/api';

export const usersApi = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: { full_name: string }) => api.put('/users/profile', data),
};
