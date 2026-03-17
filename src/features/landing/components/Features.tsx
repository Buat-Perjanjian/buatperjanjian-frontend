'use client';

import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AiBrain02Icon,
  AiSecurity01Icon,
  FlashIcon,
  FileEditIcon,
  Download04Icon,
  PencilEdit02Icon,
} from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';

interface Feature {
  icon: IconSvgElement;
  title: string;
  description: string;
  tag: string;
  bgColor: string;
  iconColor: string;
}

const features: Feature[] = [
  {
    icon: AiBrain02Icon,
    title: 'AI Chat Assistant',
    description: 'Ceritakan kebutuhan Anda, AI kami akan menyusun kontrak yang tepat secara otomatis.',
    tag: 'AI',
    bgColor: 'bg-blue-600',
    iconColor: 'text-blue-600',
  },
  {
    icon: AiSecurity01Icon,
    title: 'Sesuai Hukum Indonesia',
    description: 'Setiap template mengikuti UU Ketenagakerjaan No.13/2003 dan Perppu Cipta Kerja.',
    tag: 'Legal',
    bgColor: 'bg-blue-600',
    iconColor: 'text-blue-600',
  },
  {
    icon: FlashIcon,
    title: 'Selesai dalam 5 Menit',
    description: 'Wizard interaktif memandu langkah demi langkah. Tidak perlu background hukum.',
    tag: 'Cepat',
    bgColor: 'bg-orange-500',
    iconColor: 'text-orange-500',
  },
  {
    icon: FileEditIcon,
    title: '4 Jenis Template',
    description: 'PKWT, PKWTT, Freelance, dan NDA — siap pakai untuk berbagai kebutuhan bisnis.',
    tag: 'Template',
    bgColor: 'bg-orange-500',
    iconColor: 'text-orange-500',
  },
  {
    icon: PencilEdit02Icon,
    title: 'Editor Dokumen',
    description: 'Edit langsung di browser dengan editor seperti Word. Kustomisasi sesuai kebutuhan.',
    tag: 'Editor',
    bgColor: 'bg-blue-600',
    iconColor: 'text-blue-600',
  },
  {
    icon: Download04Icon,
    title: 'Download PDF',
    description: 'Unduh kontrak dalam format PDF profesional, siap cetak dan tanda tangan.',
    tag: 'Export',
    bgColor: 'bg-blue-600',
    iconColor: 'text-blue-600',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="fitur" className="relative py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-blue-50/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-orange-50/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-600 ring-1 ring-blue-100">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            Produk
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Semua yang Anda butuhkan untuk{' '}
            <span className="text-blue-600">
              membuat kontrak profesional
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-500">
            Dari pembuatan hingga download — satu platform untuk semua kebutuhan kontrak kerja Anda.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-7 transition-all duration-300 hover:border-transparent hover:shadow-2xl hover:shadow-blue-100/40 hover:-translate-y-1"
            >
              <div className="relative">
                <div className="mb-5 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${f.bgColor} shadow-lg`}>
                    <HugeiconsIcon icon={f.icon} size={22} color="white" />
                  </div>
                  <span className="rounded-full bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                    {f.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
