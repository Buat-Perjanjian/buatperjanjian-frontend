'use client';

import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { WizardFormData } from '../schemas/contractSchema';

interface StepEmployeeInfoProps {
  form: UseFormReturn<WizardFormData>;
}

export function StepEmployeeInfo({ form }: StepEmployeeInfoProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Informasi Karyawan</h2>
        <p className="text-sm text-muted-foreground">Masukkan data karyawan (pihak kedua).</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nama_karyawan">Nama Lengkap *</Label>
        <Input id="nama_karyawan" {...register('nama_karyawan')} placeholder="Nama lengkap karyawan" />
        {errors.nama_karyawan && (
          <p className="text-sm text-destructive">{errors.nama_karyawan.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamat_karyawan">Alamat *</Label>
        <Textarea id="alamat_karyawan" {...register('alamat_karyawan')} placeholder="Alamat lengkap karyawan" />
        {errors.alamat_karyawan && (
          <p className="text-sm text-destructive">{errors.alamat_karyawan.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="no_ktp">No. KTP *</Label>
        <Input id="no_ktp" {...register('no_ktp')} placeholder="3171234567890001" />
        {errors.no_ktp && (
          <p className="text-sm text-destructive">{errors.no_ktp.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tempat_lahir">Tempat Lahir *</Label>
          <Input id="tempat_lahir" {...register('tempat_lahir')} placeholder="Jakarta" />
          {errors.tempat_lahir && (
            <p className="text-sm text-destructive">{errors.tempat_lahir.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
          <Input id="tanggal_lahir" type="date" {...register('tanggal_lahir')} />
          {errors.tanggal_lahir && (
            <p className="text-sm text-destructive">{errors.tanggal_lahir.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
