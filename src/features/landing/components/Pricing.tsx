'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

const benefits = [
  'Semua 4 template kontrak (PKWT, PKWTT, Freelance, NDA)',
  'AI Chat Assistant untuk generate kontrak',
  'Editor dokumen langsung di browser',
  'Download PDF tanpa batas',
  'Sesuai UU Ketenagakerjaan Indonesia',
  'Wizard interaktif langkah demi langkah',
];

export default function Pricing() {
  return (
    <section id="harga" className="py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            Harga
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Gratis. Tanpa syarat.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
            Selama masa promosi, semua fitur premium bisa digunakan tanpa biaya. Tanpa kartu kredit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-14 max-w-lg"
        >
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            {/* Badge */}
            <div className="absolute right-6 top-6 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
              Gratis
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-slate-400 line-through">Rp 99.000</span>
                <span className="text-xs text-slate-400">/kontrak</span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight text-slate-900">Rp 0</span>
                <span className="text-sm text-slate-400">/selamanya*</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">*Selama masa promosi berlangsung</p>
            </div>

            <div className="my-8 h-px bg-slate-100" />

            {/* Benefits */}
            <ul className="space-y-3.5">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} color="#2563eb" className="mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-600">{b}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200/50 transition-all hover:bg-blue-700 hover:shadow-xl"
            >
              Mulai Buat Kontrak — Gratis
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
