'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { adminApi } from '@/services/api/admin';
import { AdminStats } from '../components/AdminStats';
import { UserManagementTable } from '../components/UserManagementTable';
import { TemplateManagement } from '../components/TemplateManagement';
import { HugeiconsIcon } from '@hugeicons/react';
import { SecurityCheckIcon, UserIcon, File02Icon } from '@hugeicons/core-free-icons';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'templates'>('users');

  const { data: analyticsData } = useQuery({
    queryKey: ['admin', 'analytics'],
    queryFn: () => adminApi.getAnalytics(),
    enabled: user?.role === 'admin' || user?.role === 'superadmin',
  });

  if (user?.role !== 'admin' && user?.role !== 'superadmin') {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 mb-4">
            <HugeiconsIcon icon={SecurityCheckIcon} size={32} color="#ef4444" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Akses Ditolak</h1>
          <p className="mt-2 text-slate-500">
            Anda tidak memiliki izin untuk mengakses halaman ini.
          </p>
        </div>
      </div>
    );
  }

  const analytics = analyticsData?.data ?? null;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="space-y-6 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 shadow-sm">
            <HugeiconsIcon icon={SecurityCheckIcon} size={22} color="#ffffff" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Kelola pengguna, template, dan analitik</p>
          </div>
        </div>

        {/* Stats */}
        <AdminStats data={analytics} />

        {/* Tabs */}
        <div>
          <div className="flex gap-1 rounded-xl bg-slate-100/80 p-1 w-fit">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === 'users'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <HugeiconsIcon icon={UserIcon} size={16} />
              Pengguna
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === 'templates'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <HugeiconsIcon icon={File02Icon} size={16} />
              Template
            </button>
          </div>

          <div className="mt-5">
            {activeTab === 'users' && <UserManagementTable />}
            {activeTab === 'templates' && <TemplateManagement />}
          </div>
        </div>
      </div>
    </div>
  );
}
