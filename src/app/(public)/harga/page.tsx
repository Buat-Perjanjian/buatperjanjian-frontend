'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon, ArrowRight01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';

const plans = [
  {
    name: 'Gratis',
    price: 'Rp 0',
    period: '/selamanya',
    description: 'Untuk individu dan bisnis kecil yang baru mulai.',
    badge: 'Populer',
    badgeColor: 'bg-emerald-50 text-emerald-600',
    cta: 'Mulai Gratis',
    ctaStyle: 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-200/50',
    features: [
      { text: '3 kontrak per bulan', included: true },
      { text: '4 template (PKWT, PKWTT, Freelance, NDA)', included: true },
      { text: 'AI Chat Assistant', included: true },
      { text: 'Editor dokumen', included: true },
      { text: 'Download PDF', included: true },
      { text: 'Riwayat versi', included: false },
      { text: 'Branding perusahaan', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Pro',
    price: 'Rp 99.000',
    period: '/bulan',
    description: 'Untuk tim HR dan bisnis yang butuh lebih banyak kontrak.',
    badge: 'Segera Hadir',
    badgeColor: 'bg-orange-50 text-orange-600',
    cta: 'Hubungi Kami',
    ctaStyle: 'bg-slate-900 text-white hover:bg-slate-800',
    features: [
      { text: 'Unlimited kontrak', included: true },
      { text: 'Semua template + custom template', included: true },
      { text: 'AI Chat Assistant (prioritas)', included: true },
      { text: 'Editor dokumen', included: true },
      { text: 'Download PDF & DOCX', included: true },
      { text: 'Riwayat versi lengkap', included: true },
      { text: 'Branding perusahaan', included: true },
      { text: 'Email support', included: true },
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Untuk perusahaan besar dengan kebutuhan khusus.',
    badge: null,
    badgeColor: '',
    cta: 'Hubungi Sales',
    ctaStyle: 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50',
    features: [
      { text: 'Semua fitur Pro', included: true },
      { text: 'Template kustom tanpa batas', included: true },
      { text: 'API access', included: true },
      { text: 'SSO & role management', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'SLA 99.9% uptime', included: true },
      { text: 'On-premise deployment', included: true },
      { text: 'Priority phone support', included: true },
    ],
  },
];

const faqs = [
  {
    q: 'Apakah benar-benar gratis?',
    a: 'Ya, paket Gratis bisa digunakan tanpa biaya selama masa promosi. Tidak perlu kartu kredit.',
  },
  {
    q: 'Apakah kontrak yang dibuat sah secara hukum?',
    a: 'Template kami disusun berdasarkan UU Ketenagakerjaan No.13/2003 dan Perppu Cipta Kerja. Namun kami sarankan untuk tetap berkonsultasi dengan ahli hukum untuk kasus spesifik.',
  },
  {
    q: 'Kapan paket Pro tersedia?',
    a: 'Paket Pro sedang dalam pengembangan dan akan tersedia dalam waktu dekat. Daftar sekarang untuk mendapat notifikasi.',
  },
  {
    q: 'Bisakah saya upgrade atau downgrade kapan saja?',
    a: 'Ya, Anda bisa mengubah paket kapan saja. Perubahan akan berlaku di periode billing berikutnya.',
  },
];

export default function HargaPage() {
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
            Harga
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Pilih paket yang tepat<br className="hidden sm:block" /> untuk bisnis Anda
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-500">
            Mulai gratis, upgrade kapan saja. Tanpa biaya tersembunyi.
          </p>
        </motion.div>
      </section>

      {/* Plans */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 ${
                i === 0
                  ? 'border-orange-200 bg-white shadow-lg shadow-orange-100/30'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {plan.badge && (
                <span className={`absolute right-6 top-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${plan.badgeColor}`}>
                  {plan.badge}
                </span>
              )}

              <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900">{plan.price}</span>
                <span className="text-sm text-slate-400">{plan.period}</span>
              </div>

              <Link
                href={i === 0 ? '/register' : '#'}
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${plan.ctaStyle}`}
              >
                {plan.cta}
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </Link>

              <div className="my-6 h-px bg-slate-100" />

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2.5">
                    {f.included ? (
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} color="#f97316" className="mt-0.5 shrink-0" />
                    ) : (
                      <HugeiconsIcon icon={Cancel01Icon} size={16} className="mt-0.5 shrink-0 text-slate-300" />
                    )}
                    <span className={`text-sm ${f.included ? 'text-slate-600' : 'text-slate-400'}`}>{f.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-28 max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Pertanyaan Umum</h2>
        </motion.div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-2xl border border-slate-100 bg-white p-6"
            >
              <h3 className="text-sm font-semibold text-slate-900">{faq.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
