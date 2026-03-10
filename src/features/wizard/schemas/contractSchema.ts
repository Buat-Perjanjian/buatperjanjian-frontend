'use client';

import { z } from 'zod';

export const contractTypeSchema = z.object({
  contract_type: z.enum(['PKWT', 'PKWTT', 'Freelance', 'NDA'], {
    message: 'Pilih tipe kontrak',
  }),
});

export const companyInfoSchema = z.object({
  company_id: z.string().optional(),
  nama_perusahaan: z.string().min(1, 'Nama perusahaan wajib diisi'),
  alamat_perusahaan: z.string().min(1, 'Alamat perusahaan wajib diisi'),
  telepon_perusahaan: z.string().optional(),
  nama_perwakilan: z.string().min(1, 'Nama perwakilan wajib diisi'),
  jabatan_perwakilan: z.string().min(1, 'Jabatan perwakilan wajib diisi'),
});

export const employeeInfoSchema = z.object({
  nama_karyawan: z.string().min(1, 'Nama karyawan wajib diisi'),
  alamat_karyawan: z.string().min(1, 'Alamat karyawan wajib diisi'),
  no_ktp: z.string().min(1, 'No KTP wajib diisi'),
  tempat_lahir: z.string().min(1, 'Tempat lahir wajib diisi'),
  tanggal_lahir: z.string().min(1, 'Tanggal lahir wajib diisi'),
});

export const jobDetailsSchema = z.object({
  jabatan: z.string().min(1, 'Jabatan wajib diisi'),
  deskripsi_pekerjaan: z.string().min(1, 'Deskripsi pekerjaan wajib diisi'),
  gaji: z.string().min(1, 'Gaji wajib diisi'),
  tunjangan: z.string().optional(),
  masa_kontrak: z.string().optional(),
  tanggal_mulai: z.string().min(1, 'Tanggal mulai wajib diisi'),
  lokasi_kerja: z.string().min(1, 'Lokasi kerja wajib diisi'),
});

export const clausesSchema = z.object({
  selected_clauses: z.array(z.string()),
});

export const wizardFormSchema = z.object({
  ...contractTypeSchema.shape,
  ...companyInfoSchema.shape,
  ...employeeInfoSchema.shape,
  ...jobDetailsSchema.shape,
  ...clausesSchema.shape,
});

export type WizardFormData = z.infer<typeof wizardFormSchema>;

export const stepSchemas = [
  contractTypeSchema,
  companyInfoSchema,
  employeeInfoSchema,
  jobDetailsSchema,
  clausesSchema,
  z.object({}), // preview step - no validation
  z.object({}), // payment step - no validation
] as const;

export const WIZARD_STEPS = [
  { title: 'Tipe Kontrak', description: 'Pilih jenis kontrak' },
  { title: 'Info Perusahaan', description: 'Data perusahaan' },
  { title: 'Info Karyawan', description: 'Data karyawan' },
  { title: 'Detail Pekerjaan', description: 'Informasi pekerjaan' },
  { title: 'Klausul', description: 'Pilih klausul tambahan' },
  { title: 'Pratinjau', description: 'Tinjau kontrak' },
  { title: 'Pembayaran', description: 'Selesaikan pembayaran' },
] as const;

export const defaultWizardValues: WizardFormData = {
  contract_type: 'PKWT',
  company_id: '',
  nama_perusahaan: '',
  alamat_perusahaan: '',
  telepon_perusahaan: '',
  nama_perwakilan: '',
  jabatan_perwakilan: '',
  nama_karyawan: '',
  alamat_karyawan: '',
  no_ktp: '',
  tempat_lahir: '',
  tanggal_lahir: '',
  jabatan: '',
  deskripsi_pekerjaan: '',
  gaji: '',
  tunjangan: '',
  masa_kontrak: '',
  tanggal_mulai: '',
  lokasi_kerja: '',
  selected_clauses: [],
};
