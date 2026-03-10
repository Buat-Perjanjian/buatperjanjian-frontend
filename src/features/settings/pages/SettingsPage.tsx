'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { usersApi } from '@/services/api/users';
import { companiesApi } from '@/services/api/companies';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
    <Card>
      <CardHeader>
        <CardTitle>Profil</CardTitle>
        <CardDescription>Kelola informasi profil Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="full_name">Nama Lengkap</Label>
            <Input id="full_name" {...register('full_name')} />
            {errors.full_name && (
              <p className="mt-1 text-sm text-destructive">{errors.full_name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user?.email ?? ''} disabled />
            <p className="mt-1 text-xs text-muted-foreground">Email tidak dapat diubah</p>
          </div>
          <div>
            <Label>Role</Label>
            <div className="mt-1">
              <Badge variant="secondary">{user?.role ?? '-'}</Badge>
            </div>
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </form>
      </CardContent>
    </Card>
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
    <Card>
      <CardHeader>
        <CardTitle>Perusahaan</CardTitle>
        <CardDescription>Kelola data perusahaan Anda</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <p className="text-muted-foreground">Memuat data...</p>
        ) : companies.length === 0 ? (
          <p className="text-muted-foreground">Belum ada perusahaan terdaftar.</p>
        ) : (
          <div className="space-y-3">
            {companies.map((c) => (
              <div key={c.id} className="rounded-md border p-4">
                <p className="font-medium">{c.name}</p>
                {c.address && <p className="text-sm text-muted-foreground">{c.address}</p>}
                {c.phone && <p className="text-sm text-muted-foreground">{c.phone}</p>}
              </div>
            ))}
          </div>
        )}

        {showForm ? (
          <form
            onSubmit={handleSubmit((d) => createMutation.mutate(d))}
            className="space-y-4 max-w-md rounded-md border p-4"
          >
            <div>
              <Label htmlFor="company-name">Nama Perusahaan</Label>
              <Input id="company-name" {...register('name')} />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="company-address">Alamat</Label>
              <Input id="company-address" {...register('address')} />
            </div>
            <div>
              <Label htmlFor="company-phone">Telepon</Label>
              <Input id="company-phone" {...register('phone')} />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Menyimpan...' : 'Simpan'}
              </Button>
              <Button type="button" variant="outline" onClick={() => { setShowForm(false); reset(); }}>
                Batal
              </Button>
            </div>
          </form>
        ) : (
          <Button variant="outline" onClick={() => setShowForm(true)}>
            Tambah Perusahaan
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pengaturan</h1>
      <Tabs defaultValue="profil">
        <TabsList>
          <TabsTrigger value="profil">Profil</TabsTrigger>
          <TabsTrigger value="perusahaan">Perusahaan</TabsTrigger>
        </TabsList>
        <TabsContent value="profil" className="mt-4">
          <ProfileTab />
        </TabsContent>
        <TabsContent value="perusahaan" className="mt-4">
          <CompanyTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
