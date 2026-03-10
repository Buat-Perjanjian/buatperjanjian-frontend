'use client';

import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { WizardFormData } from '../schemas/contractSchema';

interface StepJobDetailsProps {
  form: UseFormReturn<WizardFormData>;
}

export function StepJobDetails({ form }: StepJobDetailsProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Detail Pekerjaan</h2>
        <p className="text-sm text-muted-foreground">Masukkan informasi pekerjaan dan kompensasi.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="jabatan">Jabatan *</Label>
        <Input id="jabatan" {...register('jabatan')} placeholder="Software Engineer" />
        {errors.jabatan && (
          <p className="text-sm text-destructive">{errors.jabatan.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="deskripsi_pekerjaan">Deskripsi Pekerjaan *</Label>
        <Textarea
          id="deskripsi_pekerjaan"
          {...register('deskripsi_pekerjaan')}
          placeholder="Jelaskan tugas dan tanggung jawab..."
          rows={4}
        />
        {errors.deskripsi_pekerjaan && (
          <p className="text-sm text-destructive">{errors.deskripsi_pekerjaan.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="gaji">Gaji (Rp) *</Label>
          <Input id="gaji" {...register('gaji')} placeholder="10000000" type="number" />
          {errors.gaji && (
            <p className="text-sm text-destructive">{errors.gaji.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tunjangan">Tunjangan</Label>
          <Input id="tunjangan" {...register('tunjangan')} placeholder="BPJS, makan, transport" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="masa_kontrak">Masa Kontrak</Label>
          <Input id="masa_kontrak" {...register('masa_kontrak')} placeholder="12 bulan" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tanggal_mulai">Tanggal Mulai *</Label>
          <Input id="tanggal_mulai" type="date" {...register('tanggal_mulai')} />
          {errors.tanggal_mulai && (
            <p className="text-sm text-destructive">{errors.tanggal_mulai.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lokasi_kerja">Lokasi Kerja *</Label>
        <Input id="lokasi_kerja" {...register('lokasi_kerja')} placeholder="Jakarta Selatan" />
        {errors.lokasi_kerja && (
          <p className="text-sm text-destructive">{errors.lokasi_kerja.message}</p>
        )}
      </div>
    </div>
  );
}
