'use client';

import { UseFormReturn } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { companiesApi } from '@/services/api/companies';
import { WizardFormData } from '../schemas/contractSchema';
import { HugeiconsIcon } from '@hugeicons/react';
import { Building06Icon } from '@hugeicons/core-free-icons';

interface StepCompanyInfoProps {
  form: UseFormReturn<WizardFormData>;
}

export function StepCompanyInfo({ form }: StepCompanyInfoProps) {
  const { register, formState: { errors }, setValue, watch } = form;

  const { data: companiesRes } = useQuery({
    queryKey: ['companies'],
    queryFn: () => companiesApi.getAll(),
  });

  const companies = companiesRes?.data ?? [];
  const selectedCompanyId = watch('company_id');

  const handleCompanySelect = (companyId: string) => {
    if (companyId === '_manual') {
      setValue('company_id', '', { shouldValidate: true });
      setValue('nama_perusahaan', '', { shouldValidate: true });
      setValue('alamat_perusahaan', '', { shouldValidate: true });
      setValue('telepon_perusahaan', '', { shouldValidate: true });
      return;
    }
    const company = companies.find((c) => c.id === companyId);
    if (company) {
      setValue('company_id', company.id, { shouldValidate: true });
      setValue('nama_perusahaan', company.name, { shouldValidate: true });
      setValue('alamat_perusahaan', company.address || '', { shouldValidate: true });
      setValue('telepon_perusahaan', company.phone || '', { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
          <HugeiconsIcon icon={Building06Icon} size={20} color="#4f46e5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Informasi Perusahaan</h2>
          <p className="text-sm text-slate-500">Masukkan data perusahaan (pihak pertama).</p>
        </div>
      </div>

      {companies.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700">Pilih Perusahaan</Label>
          <Select value={selectedCompanyId || '_manual'} onValueChange={handleCompanySelect}>
            <SelectTrigger className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white">
              <SelectValue placeholder="Pilih perusahaan atau isi manual" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_manual">Isi manual</SelectItem>
              {companies.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="nomor_kontrak" className="text-sm font-medium text-slate-700">Nomor Kontrak</Label>
        <Input
          id="nomor_kontrak"
          {...register('nomor_kontrak')}
          placeholder="001/PKS/2026"
          className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nama_perusahaan" className="text-sm font-medium text-slate-700">Nama Perusahaan *</Label>
        <Input
          id="nama_perusahaan"
          {...register('nama_perusahaan')}
          placeholder="PT Contoh Indonesia"
          className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
        />
        {errors.nama_perusahaan && (
          <p className="text-sm text-red-500">{errors.nama_perusahaan.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamat_perusahaan" className="text-sm font-medium text-slate-700">Alamat Perusahaan *</Label>
        <Textarea
          id="alamat_perusahaan"
          {...register('alamat_perusahaan')}
          placeholder="Jl. Contoh No. 1, Jakarta"
          className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
        />
        {errors.alamat_perusahaan && (
          <p className="text-sm text-red-500">{errors.alamat_perusahaan.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telepon_perusahaan" className="text-sm font-medium text-slate-700">Telepon Perusahaan</Label>
        <Input
          id="telepon_perusahaan"
          {...register('telepon_perusahaan')}
          placeholder="021-1234567"
          className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nama_perwakilan" className="text-sm font-medium text-slate-700">Nama Perwakilan *</Label>
        <Input
          id="nama_perwakilan"
          {...register('nama_perwakilan')}
          placeholder="Nama direktur / perwakilan"
          className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
        />
        {errors.nama_perwakilan && (
          <p className="text-sm text-red-500">{errors.nama_perwakilan.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="jabatan_perwakilan" className="text-sm font-medium text-slate-700">Jabatan Perwakilan *</Label>
        <Input
          id="jabatan_perwakilan"
          {...register('jabatan_perwakilan')}
          placeholder="Direktur Utama"
          className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white"
        />
        {errors.jabatan_perwakilan && (
          <p className="text-sm text-red-500">{errors.jabatan_perwakilan.message}</p>
        )}
      </div>
    </div>
  );
}
