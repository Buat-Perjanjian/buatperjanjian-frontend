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
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Informasi Perusahaan</h2>
        <p className="text-sm text-muted-foreground">Masukkan data perusahaan (pihak pertama).</p>
      </div>

      {companies.length > 0 && (
        <div className="space-y-2">
          <Label>Pilih Perusahaan</Label>
          <Select value={selectedCompanyId || '_manual'} onValueChange={handleCompanySelect}>
            <SelectTrigger>
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
        <Label htmlFor="nama_perusahaan">Nama Perusahaan *</Label>
        <Input id="nama_perusahaan" {...register('nama_perusahaan')} placeholder="PT Contoh Indonesia" />
        {errors.nama_perusahaan && (
          <p className="text-sm text-destructive">{errors.nama_perusahaan.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamat_perusahaan">Alamat Perusahaan *</Label>
        <Textarea id="alamat_perusahaan" {...register('alamat_perusahaan')} placeholder="Jl. Contoh No. 1, Jakarta" />
        {errors.alamat_perusahaan && (
          <p className="text-sm text-destructive">{errors.alamat_perusahaan.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telepon_perusahaan">Telepon Perusahaan</Label>
        <Input id="telepon_perusahaan" {...register('telepon_perusahaan')} placeholder="021-1234567" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nama_perwakilan">Nama Perwakilan *</Label>
        <Input id="nama_perwakilan" {...register('nama_perwakilan')} placeholder="Nama direktur / perwakilan" />
        {errors.nama_perwakilan && (
          <p className="text-sm text-destructive">{errors.nama_perwakilan.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="jabatan_perwakilan">Jabatan Perwakilan *</Label>
        <Input id="jabatan_perwakilan" {...register('jabatan_perwakilan')} placeholder="Direktur Utama" />
        {errors.jabatan_perwakilan && (
          <p className="text-sm text-destructive">{errors.jabatan_perwakilan.message}</p>
        )}
      </div>
    </div>
  );
}
