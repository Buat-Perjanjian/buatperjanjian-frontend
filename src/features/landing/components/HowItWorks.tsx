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
  bgColor: string;
}

const steps: Step[] = [
  {
    number: '1',
    icon: FileSearchIcon,
    title: 'Pilih Template',
    description: 'Pilih jenis kontrak: PKWT, PKWTT, Freelance, atau NDA sesuai kebutuhan Anda.',
    bgColor: 'bg-blue-600',
  },
  {
    number: '2',
    icon: PencilEdit02Icon,
    title: 'Isi Data via AI Chat',
    description: 'Ceritakan kebutuhan Anda ke AI atau isi form wizard — kontrak langsung terbentuk.',
    bgColor: 'bg-orange-500',
  },
  {
    number: '3',
    icon: Download04Icon,
    title: 'Download & Gunakan',
    description: 'Edit jika perlu, lalu download PDF. Kontrak siap cetak dan tanda tangan.',
    bgColor: 'bg-blue-600',
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-slate-50/80" />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-600 ring-1 ring-blue-100">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            Cara Kerja
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Tiga langkah,{' '}
            <span className="text-blue-600">
              kontrak jadi
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-slate-500">
            Tidak perlu paham hukum. Platform kami memandu dari awal sampai selesai.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-2xl border border-white bg-white p-8 text-center shadow-lg shadow-slate-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Number background */}
              <span className="absolute -right-4 -top-4 text-[120px] font-black leading-none text-slate-50 transition-colors group-hover:text-blue-50">
                {s.number}
              </span>

              <div className="relative">
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${s.bgColor} text-white shadow-lg`}>
                  <HugeiconsIcon icon={s.icon} size={28} />
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connector line */}
        <div className="mt-8 hidden items-center justify-center md:flex">
          <div className="h-1 w-2/3 rounded-full bg-blue-100" />
        </div>
      </div>
    </section>
  );
}
