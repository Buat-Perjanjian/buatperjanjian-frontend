import api from '@/lib/api';
import { AuthResponse } from '@/types';

export const authApi = {
  register: (data: { email: string; password: string; full_name?: string }) =>
    api.post<AuthResponse>('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};
