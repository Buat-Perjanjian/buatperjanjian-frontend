'use client';

import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { WizardFormData } from '../schemas/contractSchema';
import { HugeiconsIcon } from '@hugeicons/react';
import { UserIcon } from '@hugeicons/core-free-icons';

interface StepEmployeeInfoProps {
  form: UseFormReturn<WizardFormData>;
}

export function StepEmployeeInfo({ form }: StepEmployeeInfoProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
          <HugeiconsIcon icon={UserIcon} size={20} color="#4f46e5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Informasi Karyawan</h2>
          <p className="text-sm text-slate-500">Masukkan data karyawan (pihak kedua).</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nama_karyawan" className="text-sm font-medium text-slate-700">Nama Lengkap *</Label>
        <Input
          id="nama_karyawan"
          {...register('nama_karyawan')}
          placeholder="Nama lengkap karyawan"
          className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
        />
        {errors.nama_karyawan && (
          <p className="text-sm text-red-500">{errors.nama_karyawan.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamat_karyawan" className="text-sm font-medium text-slate-700">Alamat *</Label>
        <Textarea
          id="alamat_karyawan"
          {...register('alamat_karyawan')}
          placeholder="Alamat lengkap karyawan"
          className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
        />
        {errors.alamat_karyawan && (
          <p className="text-sm text-red-500">{errors.alamat_karyawan.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="no_ktp" className="text-sm font-medium text-slate-700">No. KTP *</Label>
        <Input
          id="no_ktp"
          {...register('no_ktp')}
          placeholder="3171234567890001"
          className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
        />
        {errors.no_ktp && (
          <p className="text-sm text-red-500">{errors.no_ktp.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tempat_lahir" className="text-sm font-medium text-slate-700">Tempat Lahir *</Label>
          <Input
            id="tempat_lahir"
            {...register('tempat_lahir')}
            placeholder="Jakarta"
            className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
          />
          {errors.tempat_lahir && (
            <p className="text-sm text-red-500">{errors.tempat_lahir.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tanggal_lahir" className="text-sm font-medium text-slate-700">Tanggal Lahir *</Label>
          <Input
            id="tanggal_lahir"
            type="date"
            {...register('tanggal_lahir')}
            className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
          />
          {errors.tanggal_lahir && (
            <p className="text-sm text-red-500">{errors.tanggal_lahir.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
