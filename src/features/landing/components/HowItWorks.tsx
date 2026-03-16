'use client';

import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  FileSearchIcon,
  PencilEdit02Icon,
  Download04Icon,
} from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';

interface Step {
  number: string;
  icon: IconSvgElement;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '01',
    icon: FileSearchIcon,
    title: 'Pilih Template',
    description: 'Pilih jenis kontrak sesuai kebutuhan: PKWT, PKWTT, Freelance, atau NDA.',
  },
  {
    number: '02',
    icon: PencilEdit02Icon,
    title: 'Isi Data',
    description: 'Lengkapi data perusahaan dan karyawan melalui wizard interaktif.',
  },
  {
    number: '03',
    icon: Download04Icon,
    title: 'Download Kontrak',
    description: 'Kontrak siap diunduh, lengkap dan sesuai hukum Indonesia.',
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="bg-slate-50/30 py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Cara Kerja
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Tiga Langkah Mudah
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            Tidak perlu paham hukum. Wizard kami memandu Anda dari awal sampai selesai.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 bg-gradient-to-r from-indigo-200 to-transparent md:block" />
              )}

              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm">
                <HugeiconsIcon icon={s.icon} size={32} color="#4f46e5" />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  {s.number}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
