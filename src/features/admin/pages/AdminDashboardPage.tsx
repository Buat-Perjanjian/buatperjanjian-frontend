'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { adminApi } from '@/services/api/admin';
import { AdminStats } from '../components/AdminStats';
import { UserManagementTable } from '../components/UserManagementTable';
import { TemplateManagement } from '../components/TemplateManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminDashboardPage() {
  const { user } = useAuth();

  const { data: analyticsData } = useQuery({
    queryKey: ['admin', 'analytics'],
    queryFn: () => adminApi.getAnalytics(),
    enabled: user?.role === 'admin' || user?.role === 'superadmin',
  });

  if (user?.role !== 'admin' && user?.role !== 'superadmin') {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive">Akses Ditolak</h1>
          <p className="mt-2 text-muted-foreground">
            Anda tidak memiliki izin untuk mengakses halaman ini.
          </p>
        </div>
      </div>
    );
  }

  const analytics = analyticsData?.data ?? null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <AdminStats data={analytics} />
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Pengguna</TabsTrigger>
          <TabsTrigger value="templates">Template</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="mt-4">
          <UserManagementTable />
        </TabsContent>
        <TabsContent value="templates" className="mt-4">
          <TemplateManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
