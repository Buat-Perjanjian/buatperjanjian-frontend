'use client';

import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Target02Icon, UserGroupIcon } from '@hugeicons/core-free-icons';

const values = [
  {
    icon: Target02Icon,
    title: 'Misi Kami',
    description: 'Membuat kontrak kerja legal yang terjangkau dan mudah diakses oleh semua bisnis di Indonesia, dari startup hingga korporasi.',
  },
  {
    icon: Target02Icon,
    title: 'Visi Kami',
    description: 'Menjadi platform legaltech #1 di Indonesia yang memberdayakan bisnis dengan teknologi AI untuk kebutuhan hukum ketenagakerjaan.',
  },
  {
    icon: UserGroupIcon,
    title: 'Tim Kami',
    description: 'Dibangun oleh tim yang passionate tentang teknologi dan hukum, dengan pengalaman di bidang AI, software engineering, dan hukum ketenagakerjaan.',
  },
];

const stats = [
  { value: '2026', label: 'Tahun Didirikan' },
  { value: '500+', label: 'Kontrak Dibuat' },
  { value: '50+', label: 'Perusahaan' },
  { value: '4', label: 'Template Legal' },
];

export default function TentangPage() {
  return (
    <div className="pb-32">
      {/* Header */}
      <section className="px-6 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
            Tentang Kami
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Membuat hukum ketenagakerjaan<br className="hidden sm:block" /> lebih mudah diakses
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500">
            BuatPerjanjian lahir dari kebutuhan nyata — banyak bisnis di Indonesia yang kesulitan membuat kontrak kerja yang sah secara hukum karena biaya konsultasi yang mahal dan proses yang rumit.
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-slate-900">Cerita Kami</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
            <p>
              Kami memulai BuatPerjanjian pada awal 2026 dengan satu pertanyaan sederhana: mengapa membuat kontrak kerja harus mahal dan rumit?
            </p>
            <p>
              Di Indonesia, banyak UMKM dan startup yang tidak memiliki akses ke konsultan hukum. Akibatnya, mereka menggunakan template kontrak yang tidak sesuai hukum, atau bahkan tidak menggunakan kontrak sama sekali. Ini merugikan baik pemberi kerja maupun pekerja.
            </p>
            <p>
              Dengan memanfaatkan teknologi AI, kami membangun platform yang bisa menghasilkan kontrak kerja yang sesuai dengan UU Ketenagakerjaan Indonesia dalam hitungan menit. Tanpa perlu background hukum, tanpa biaya mahal.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-slate-100 bg-white p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                <HugeiconsIcon icon={v.icon} size={24} className="text-orange-500" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-8 rounded-2xl border border-slate-100 bg-white p-10 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-slate-900">{s.value}</div>
              <div className="mt-1 text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
