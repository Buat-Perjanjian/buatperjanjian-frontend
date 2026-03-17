'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';

export default function CtaSection() {
  return (
    <section className="px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-blue-600 p-14 text-center sm:p-20"
      >
        {/* Animated orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-pulse absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-white/10 blur-3xl" />
          <div className="animate-pulse absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-orange-400/15 blur-3xl" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl"
          >
            Siap buat kontrak<br />profesional pertama Anda?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-5 max-w-lg text-base text-white/70"
          >
            Mulai sekarang — gratis, cepat, dan sesuai hukum Indonesia. Tidak perlu konsultasi hukum yang mahal.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-blue-600 shadow-xl shadow-blue-700/20 transition-all hover:shadow-2xl hover:shadow-blue-700/30"
            >
              Mulai Gratis Sekarang
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              Sudah punya akun? Masuk
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
