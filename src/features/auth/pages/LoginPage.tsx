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

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Kata sandi wajib diisi'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      toast.success('Berhasil masuk!');
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || 'Email atau kata sandi salah';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Masuk</h2>
        <p className="mt-2 text-sm text-slate-400">
          Masuk ke akun BuatPerjanjian.com Anda
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            placeholder="Masukkan kata sandi"
            autoComplete="current-password"
            className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
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
          Masuk
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-400">
        Belum punya akun?{' '}
        <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
          Daftar
        </Link>
      </p>
    </div>
  );
}
