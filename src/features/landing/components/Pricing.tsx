'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';

const benefits = [
  'Semua 4 template kontrak',
  'AI-generated kontrak',
  'Sesuai UU Ketenagakerjaan',
  'Download unlimited',
  'Wizard interaktif',
];

export default function Pricing() {
  return (
    <section id="harga" className="py-24 px-4">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Harga
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Gratis Selama Masa Promosi
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            Nikmati semua fitur premium tanpa biaya. Tanpa kartu kredit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mt-12 rounded-2xl border border-indigo-200 bg-white p-8 shadow-lg shadow-indigo-100/50 sm:p-10"
        >
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-1 text-xs font-semibold text-white">
            MASA PROMOSI
          </div>

          <div className="text-center">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-lg text-slate-400 line-through">Rp 99.000</span>
              <span className="text-sm text-slate-400">/kontrak</span>
            </div>
            <div className="mt-1 text-5xl font-extrabold text-slate-900">
              Rp 0
            </div>
            <p className="mt-2 text-sm text-slate-500">Gratis untuk semua fitur</p>
          </div>

          <div className="my-8 h-px bg-slate-100" />

          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} color="#4f46e5" />
                <span className="text-sm text-slate-700">{b}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/register"
            className="mt-8 flex w-full items-center justify-center rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-200"
          >
            Mulai Buat Kontrak — Gratis
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
