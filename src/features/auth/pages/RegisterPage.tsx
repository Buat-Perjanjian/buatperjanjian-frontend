'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HugeiconsIcon } from '@hugeicons/react';
import { Loading03Icon } from '@hugeicons/core-free-icons';

const registerSchema = z
  .object({
    full_name: z.string().min(1, 'Nama lengkap wajib diisi'),
    email: z.string().email('Email tidak valid'),
    password: z.string().min(6, 'Kata sandi minimal 6 karakter'),
    confirm_password: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Kata sandi tidak cocok',
    path: ['confirm_password'],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const { register: authRegister } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsSubmitting(true);
    try {
      await authRegister(data.email, data.password, data.full_name);
      toast.success('Akun berhasil dibuat!');
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || 'Gagal membuat akun. Silakan coba lagi.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Daftar</h2>
        <p className="mt-2 text-sm text-slate-400">
          Buat akun BuatPerjanjian.com baru
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="text-sm text-slate-600">Nama Lengkap</Label>
          <Input
            id="full_name"
            type="text"
            placeholder="Nama lengkap Anda"
            autoComplete="name"
            className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
            {...register('full_name')}
          />
          {errors.full_name && (
            <p className="text-sm text-red-500">{errors.full_name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-slate-600">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="nama@email.com"
            autoComplete="email"
            className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm text-slate-600">Kata Sandi</Label>
          <Input
            id="password"
            type="password"
            placeholder="Minimal 6 karakter"
            autoComplete="new-password"
            className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm_password" className="text-sm text-slate-600">Konfirmasi Kata Sandi</Label>
          <Input
            id="confirm_password"
            type="password"
            placeholder="Ulangi kata sandi"
            autoComplete="new-password"
            className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
            {...register('confirm_password')}
          />
          {errors.confirm_password && (
            <p className="text-sm text-red-500">{errors.confirm_password.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 py-5 text-sm font-semibold hover:bg-indigo-700"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <HugeiconsIcon icon={Loading03Icon} size={16} className="mr-2 animate-spin" />
          )}
          Daftar
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-400">
        Sudah punya akun?{' '}
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
          Masuk
        </Link>
      </p>
    </div>
  );
}
