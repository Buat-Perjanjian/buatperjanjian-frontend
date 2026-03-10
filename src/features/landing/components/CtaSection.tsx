'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';

export default function CtaSection() {
  return (
    <section className="px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-12 text-center sm:p-16"
      >
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Siap Buat Kontrak Profesional?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-indigo-100">
          Mulai sekarang — gratis, cepat, dan sesuai hukum Indonesia.
          Tidak perlu konsultasi hukum yang mahal.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-lg shadow-indigo-900/20 transition-all hover:shadow-xl"
          >
            Buat Kontrak Sekarang
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Sudah punya akun? Masuk
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
