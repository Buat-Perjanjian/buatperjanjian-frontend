'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { usersApi } from '@/services/api/users';
import { companiesApi } from '@/services/api/companies';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HugeiconsIcon } from '@hugeicons/react';
import { UserIcon, Building06Icon, Settings02Icon, Add01Icon, Cancel01Icon, Loading03Icon, CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
import type { Company } from '@/types';

const profileSchema = z.object({
  full_name: z.string().min(1, 'Nama lengkap wajib diisi'),
});

const companySchema = z.object({
  name: z.string().min(1, 'Nama perusahaan wajib diisi'),
  address: z.string().optional(),
  phone: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;
type CompanyForm = z.infer<typeof companySchema>;

function ProfileTab() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { full_name: user?.full_name ?? '' },
  });

  const mutation = useMutation({
    mutationFn: (data: ProfileForm) => usersApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profil berhasil diperbarui');
    },
    onError: () => toast.error('Gagal memperbarui profil'),
  });

  return (
    <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm">
      <div className="px-6 py-5 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
            <HugeiconsIcon icon={UserIcon} size={20} color="#4f46e5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">Profil</h3>
            <p className="text-sm text-slate-500">Kelola informasi profil Anda</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-6">
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-5 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-sm font-medium text-slate-700">Nama Lengkap</Label>
            <Input
              id="full_name"
              {...register('full_name')}
              className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
            />
            {errors.full_name && (
              <p className="mt-1 text-sm text-red-500">{errors.full_name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email</Label>
            <Input
              id="email"
              value={user?.email ?? ''}
              disabled
              className="rounded-xl border-slate-200 bg-slate-100/70"
            />
            <p className="text-xs text-slate-400">Email tidak dapat diubah</p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Role</Label>
            <div className="mt-1">
              <Badge className="rounded-lg bg-indigo-50 text-indigo-700 border-0 px-3 py-1 text-xs font-medium hover:bg-indigo-100">
                {user?.role ?? '-'}
              </Badge>
            </div>
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6"
          >
            {mutation.isPending ? (
              <span className="flex items-center gap-2">
                <HugeiconsIcon icon={Loading03Icon} size={16} className="animate-spin" />
                Menyimpan...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
                Simpan
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

function CompanyTab() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: () => companiesApi.getAll(),
  });

  const companies: Company[] = data?.data ?? [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyForm>({
    resolver: zodResolver(companySchema),
  });

  const createMutation = useMutation({
    mutationFn: (d: CompanyForm) =>
      companiesApi.create({ name: d.name, address: d.address, phone: d.phone }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Perusahaan berhasil ditambahkan');
      reset();
      setShowForm(false);
    },
    onError: () => toast.error('Gagal menambahkan perusahaan'),
  });

  return (
    <div className="rounded-2xl bg-white border border-slate-200/60 shadow-sm">
      <div className="px-6 py-5 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
            <HugeiconsIcon icon={Building06Icon} size={20} color="#4f46e5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">Perusahaan</h3>
            <p className="text-sm text-slate-500">Kelola data perusahaan Anda</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-6 space-y-4">
        {isLoading ? (
          <div className="flex items-center gap-2 py-8 justify-center">
            <HugeiconsIcon icon={Loading03Icon} size={20} className="animate-spin text-slate-400" />
            <p className="text-slate-500">Memuat data...</p>
          </div>
        ) : companies.length === 0 ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 mb-3">
              <HugeiconsIcon icon={Building06Icon} size={24} color="#94a3b8" />
            </div>
            <p className="text-slate-500">Belum ada perusahaan terdaftar.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {companies.map((c) => (
              <div key={c.id} className="rounded-xl border border-slate-200/60 bg-slate-50/30 p-4 transition-colors hover:bg-slate-50">
                <p className="font-medium text-slate-900">{c.name}</p>
                {c.address && <p className="text-sm text-slate-500 mt-1">{c.address}</p>}
                {c.phone && <p className="text-sm text-slate-500">{c.phone}</p>}
              </div>
            ))}
          </div>
        )}

        {showForm ? (
          <form
            onSubmit={handleSubmit((d) => createMutation.mutate(d))}
            className="space-y-4 max-w-md rounded-xl border border-slate-200/60 bg-slate-50/30 p-5"
          >
            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-sm font-medium text-slate-700">Nama Perusahaan</Label>
              <Input
                id="company-name"
                {...register('name')}
                className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-address" className="text-sm font-medium text-slate-700">Alamat</Label>
              <Input
                id="company-address"
                {...register('address')}
                className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-phone" className="text-sm font-medium text-slate-700">Telepon</Label>
              <Input
                id="company-phone"
                {...register('phone')}
                className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                type="submit"
                disabled={createMutation.isPending}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {createMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <HugeiconsIcon icon={Loading03Icon} size={16} className="animate-spin" />
                    Menyimpan...
                  </span>
                ) : 'Simpan'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-slate-200"
                onClick={() => { setShowForm(false); reset(); }}
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} className="mr-1" />
                Batal
              </Button>
            </div>
          </form>
        ) : (
          <Button
            variant="outline"
            className="rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700"
            onClick={() => setShowForm(true)}
          >
            <HugeiconsIcon icon={Add01Icon} size={16} className="mr-2" />
            Tambah Perusahaan
          </Button>
        )}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profil' | 'perusahaan'>('profil');

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="space-y-6 p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 shadow-sm">
            <HugeiconsIcon icon={Settings02Icon} size={22} color="#ffffff" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Pengaturan</h1>
            <p className="text-sm text-slate-500">Kelola profil dan perusahaan Anda</p>
          </div>
        </div>

        {/* Custom Tabs */}
        <div>
          <div className="flex gap-1 rounded-xl bg-slate-100/80 p-1 w-fit">
            <button
              onClick={() => setActiveTab('profil')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === 'profil'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <HugeiconsIcon icon={UserIcon} size={16} />
              Profil
            </button>
            <button
              onClick={() => setActiveTab('perusahaan')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === 'perusahaan'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <HugeiconsIcon icon={Building06Icon} size={16} />
              Perusahaan
            </button>
          </div>

          <div className="mt-5">
            {activeTab === 'profil' && <ProfileTab />}
            {activeTab === 'perusahaan' && <CompanyTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
