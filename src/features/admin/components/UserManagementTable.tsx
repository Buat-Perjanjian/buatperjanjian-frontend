'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { adminApi } from '@/services/api/admin';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, ArrowRight01Icon, UserIcon, Loading03Icon } from '@hugeicons/core-free-icons';
import type { User } from '@/types';

export function UserManagementTable() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'users', page],
    queryFn: () => adminApi.getUsers({ page, limit }),
  });

  const responseBody = data?.data;
  const users: User[] = responseBody?.data ?? [];
  const total: number = responseBody?.meta?.total ?? users.length;
  const totalPages = responseBody?.meta?.total_pages ?? Math.max(1, Math.ceil(total / limit));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-12">
        <HugeiconsIcon icon={Loading03Icon} size={20} className="animate-spin text-indigo-500" />
        <p className="text-slate-500">Memuat data pengguna...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200/60 bg-slate-50/50">
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Email</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Nama</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Role</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Terdaftar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 mb-3">
                    <HugeiconsIcon icon={UserIcon} size={24} color="#94a3b8" />
                  </div>
                  <p className="text-slate-500">Belum ada pengguna</p>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-900">{user.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{user.full_name || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className={`rounded-lg border-0 px-2.5 py-0.5 text-xs font-medium ${
                        user.role === 'admin' || user.role === 'superadmin'
                          ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{new Date(user.created_at).toLocaleDateString('id-ID')}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200/60 px-6 py-4 bg-slate-50/30">
          <p className="text-sm text-slate-500">
            Halaman <span className="font-medium text-slate-700">{page}</span> dari{' '}
            <span className="font-medium text-slate-700">{totalPages}</span>
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} className="mr-1" />
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              Selanjutnya
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
