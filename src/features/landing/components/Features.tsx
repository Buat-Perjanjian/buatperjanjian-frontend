'use client';

import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AiBrain02Icon,
  AiSecurity01Icon,
  FlashIcon,
  FileEditIcon,
} from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';

interface Feature {
  icon: IconSvgElement;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const features: Feature[] = [
  {
    icon: AiBrain02Icon,
    title: 'AI-Generated',
    description:
      'Kontrak dibuat otomatis oleh AI yang memahami hukum ketenagakerjaan Indonesia.',
    color: '#4f46e5',
    bgColor: '#eef2ff',
  },
  {
    icon: AiSecurity01Icon,
    title: 'Sesuai UU',
    description:
      'Setiap template sesuai UU Ketenagakerjaan No.13/2003 dan Perppu Cipta Kerja.',
    color: '#059669',
    bgColor: '#ecfdf5',
  },
  {
    icon: FlashIcon,
    title: 'Selesai 5 Menit',
    description:
      'Wizard interaktif memandu Anda langkah demi langkah. Tidak perlu paham hukum.',
    color: '#d97706',
    bgColor: '#fffbeb',
  },
  {
    icon: FileEditIcon,
    title: '4 Template',
    description:
      'PKWT, PKWTT, Freelance, dan NDA — siap pakai, tinggal isi data.',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="fitur" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Fitur Unggulan
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Semua yang Anda Butuhkan
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Buat kontrak kerja profesional tanpa perlu konsultasi hukum yang mahal.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: f.bgColor }}
              >
                <HugeiconsIcon icon={f.icon} size={24} color={f.color} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {f.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
