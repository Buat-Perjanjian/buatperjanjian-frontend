'use client';

import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { WizardFormData } from '../schemas/contractSchema';
import { HugeiconsIcon } from '@hugeicons/react';
import { Briefcase01Icon } from '@hugeicons/core-free-icons';

interface StepJobDetailsProps {
  form: UseFormReturn<WizardFormData>;
}

export function StepJobDetails({ form }: StepJobDetailsProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
          <HugeiconsIcon icon={Briefcase01Icon} size={20} color="#4f46e5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Detail Pekerjaan</h2>
          <p className="text-sm text-slate-500">Masukkan informasi pekerjaan dan kompensasi.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="jabatan" className="text-sm font-medium text-slate-700">Jabatan *</Label>
          <Input
            id="jabatan"
            {...register('jabatan')}
            placeholder="Software Engineer"
            className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
          />
          {errors.jabatan && (
            <p className="text-sm text-red-500">{errors.jabatan.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="departemen" className="text-sm font-medium text-slate-700">Departemen</Label>
          <Input
            id="departemen"
            {...register('departemen')}
            placeholder="Engineering"
            className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="deskripsi_pekerjaan" className="text-sm font-medium text-slate-700">Deskripsi Pekerjaan *</Label>
        <Textarea
          id="deskripsi_pekerjaan"
          {...register('deskripsi_pekerjaan')}
          placeholder="Jelaskan tugas dan tanggung jawab..."
          rows={4}
          className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
        />
        {errors.deskripsi_pekerjaan && (
          <p className="text-sm text-red-500">{errors.deskripsi_pekerjaan.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="gaji" className="text-sm font-medium text-slate-700">Gaji Pokok (Rp) *</Label>
          <Input
            id="gaji"
            {...register('gaji')}
            placeholder="10000000"
            type="number"
            className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
          />
          {errors.gaji && (
            <p className="text-sm text-red-500">{errors.gaji.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tunjangan" className="text-sm font-medium text-slate-700">Tunjangan</Label>
          <Input
            id="tunjangan"
            {...register('tunjangan')}
            placeholder="BPJS, makan, transport"
            className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tanggal_gajian" className="text-sm font-medium text-slate-700">Tanggal Gajian</Label>
          <Input
            id="tanggal_gajian"
            {...register('tanggal_gajian')}
            placeholder="25"
            type="number"
            className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="masa_kontrak" className="text-sm font-medium text-slate-700">Masa Kontrak</Label>
          <Input
            id="masa_kontrak"
            {...register('masa_kontrak')}
            placeholder="12 bulan"
            className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tanggal_mulai" className="text-sm font-medium text-slate-700">Tanggal Mulai *</Label>
          <Input
            id="tanggal_mulai"
            type="date"
            {...register('tanggal_mulai')}
            className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
          />
          {errors.tanggal_mulai && (
            <p className="text-sm text-red-500">{errors.tanggal_mulai.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tanggal_selesai" className="text-sm font-medium text-slate-700">Tanggal Selesai</Label>
          <Input
            id="tanggal_selesai"
            type="date"
            {...register('tanggal_selesai')}
            className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="jam_kerja" className="text-sm font-medium text-slate-700">Jam Kerja</Label>
        <Textarea
          id="jam_kerja"
          {...register('jam_kerja')}
          placeholder="Senin-Jumat, 09:00 - 18:00 WIB"
          rows={2}
          className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lokasi_kerja" className="text-sm font-medium text-slate-700">Lokasi Kerja *</Label>
        <Input
          id="lokasi_kerja"
          {...register('lokasi_kerja')}
          placeholder="Jakarta Selatan"
          className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
        />
        {errors.lokasi_kerja && (
          <p className="text-sm text-red-500">{errors.lokasi_kerja.message}</p>
        )}
      </div>
    </div>
  );
}
