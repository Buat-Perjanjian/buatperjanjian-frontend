'use client';

import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { WizardFormData } from '@/features/wizard/schemas/contractSchema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon } from '@hugeicons/core-free-icons';

interface CollapsibleFormProps {
  form: UseFormReturn<WizardFormData>;
}

interface SectionProps {
  title: string;
  filledCount: number;
  totalCount: number;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function Section({ title, filledCount, totalCount, isOpen, onToggle, children }: SectionProps) {
  return (
    <div className="border-b border-slate-100 dark:border-zinc-800 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-2.5 text-left hover:bg-slate-50/50 transition-colors dark:hover:bg-zinc-800/30"
      >
        <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">{title}</span>
        <div className="flex items-center gap-2">
          <span className={cn(
            'text-[10px] font-medium px-1.5 py-0.5 rounded-full',
            filledCount === totalCount
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
              : 'bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:text-zinc-400'
          )}>
            {filledCount}/{totalCount}
          </span>
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={14}
            color="currentColor"
            className={cn('transition-transform text-slate-400 dark:text-zinc-500', isOpen && 'rotate-180')}
          />
        </div>
      </button>
      {isOpen && (
        <div className="px-4 pb-3 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-[11px] text-slate-500 dark:text-zinc-400">{label}</Label>
      {children}
    </div>
  );
}

// Bubble selector for contract type
function BubbleSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            'rounded-full px-3 py-1.5 text-xs font-medium transition-all active:scale-95',
            value === opt.value
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-indigo-950 dark:hover:text-indigo-300'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function CollapsibleForm({ form }: CollapsibleFormProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const { register, watch, setValue } = form;
  const values = watch();

  const toggle = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const countFilled = (fields: string[]) => {
    return fields.filter((f) => {
      const val = values[f as keyof WizardFormData];
      return val && val !== '' && (!Array.isArray(val) || val.length > 0);
    }).length;
  };

  const inputCls = "h-8 text-sm rounded-lg border-slate-200/60 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200";

  return (
    <div className="bg-white/50 dark:bg-zinc-900/50">
      {/* Contract Type */}
      <Section
        title="Tipe Kontrak"
        filledCount={countFilled(['contract_type'])}
        totalCount={1}
        isOpen={openSections['type'] ?? false}
        onToggle={() => toggle('type')}
      >
        <BubbleSelect
          value={values.contract_type}
          options={[
            { value: 'PKWT', label: 'PKWT' },
            { value: 'PKWTT', label: 'PKWTT' },
            { value: 'Freelance', label: 'Freelance' },
            { value: 'NDA', label: 'NDA' },
          ]}
          onChange={(v) => setValue('contract_type', v as WizardFormData['contract_type'], { shouldDirty: true })}
        />
      </Section>

      {/* Company Info */}
      <Section
        title="Info Perusahaan"
        filledCount={countFilled(['nama_perusahaan', 'alamat_perusahaan', 'nama_perwakilan', 'jabatan_perwakilan'])}
        totalCount={4}
        isOpen={openSections['company'] ?? false}
        onToggle={() => toggle('company')}
      >
        <Field label="Nama Perusahaan">
          <Input {...register('nama_perusahaan')} className={inputCls} placeholder="PT ..." />
        </Field>
        <Field label="Alamat Perusahaan">
          <Input {...register('alamat_perusahaan')} className={inputCls} placeholder="Jl. ..." />
        </Field>
        <Field label="Nama Perwakilan">
          <Input {...register('nama_perwakilan')} className={inputCls} />
        </Field>
        <Field label="Jabatan Perwakilan">
          <Input {...register('jabatan_perwakilan')} className={inputCls} />
        </Field>
      </Section>

      {/* Employee Info */}
      <Section
        title="Info Karyawan"
        filledCount={countFilled(['nama_karyawan', 'alamat_karyawan', 'no_ktp', 'tempat_lahir', 'tanggal_lahir'])}
        totalCount={5}
        isOpen={openSections['employee'] ?? false}
        onToggle={() => toggle('employee')}
      >
        <Field label="Nama Karyawan">
          <Input {...register('nama_karyawan')} className={inputCls} />
        </Field>
        <Field label="Alamat Karyawan">
          <Input {...register('alamat_karyawan')} className={inputCls} />
        </Field>
        <Field label="No KTP">
          <Input {...register('no_ktp')} className={inputCls} />
        </Field>
        <Field label="Tempat Lahir">
          <Input {...register('tempat_lahir')} className={inputCls} />
        </Field>
        <Field label="Tanggal Lahir">
          <Input {...register('tanggal_lahir')} type="date" className={inputCls} />
        </Field>
      </Section>

      {/* Job Details */}
      <Section
        title="Detail Pekerjaan"
        filledCount={countFilled(['jabatan', 'deskripsi_pekerjaan', 'gaji', 'tanggal_mulai', 'lokasi_kerja'])}
        totalCount={5}
        isOpen={openSections['job'] ?? false}
        onToggle={() => toggle('job')}
      >
        <Field label="Jabatan">
          <Input {...register('jabatan')} className={inputCls} />
        </Field>
        <Field label="Deskripsi Pekerjaan">
          <Textarea {...register('deskripsi_pekerjaan')} rows={2} className="text-sm rounded-lg border-slate-200/60 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200" />
        </Field>
        <Field label="Gaji">
          <Input {...register('gaji')} className={inputCls} placeholder="Rp ..." />
        </Field>
        <Field label="Tanggal Mulai">
          <Input {...register('tanggal_mulai')} type="date" className={inputCls} />
        </Field>
        <Field label="Tanggal Selesai">
          <Input {...register('tanggal_selesai')} type="date" className={inputCls} />
        </Field>
        <Field label="Lokasi Kerja">
          <Input {...register('lokasi_kerja')} className={inputCls} />
        </Field>
        <Field label="Masa Kontrak">
          <Input {...register('masa_kontrak')} className={inputCls} placeholder="12 bulan" />
        </Field>
      </Section>
    </div>
  );
}
