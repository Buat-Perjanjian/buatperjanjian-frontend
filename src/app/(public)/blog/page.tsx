'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon, Calendar03Icon } from '@hugeicons/core-free-icons';

const posts = [
  {
    title: 'Panduan Lengkap PKWT: Apa yang Perlu Anda Ketahui',
    excerpt: 'Perjanjian Kerja Waktu Tertentu (PKWT) adalah jenis kontrak yang paling umum digunakan. Pelajari syarat, ketentuan, dan cara membuatnya.',
    date: '15 Mar 2026',
    category: 'Panduan',
    slug: '#',
  },
  {
    title: 'Perbedaan PKWT dan PKWTT: Mana yang Tepat untuk Bisnis Anda?',
    excerpt: 'Memahami perbedaan mendasar antara kontrak waktu tertentu dan tidak tertentu, serta kapan harus menggunakan masing-masing.',
    date: '12 Mar 2026',
    category: 'Edukasi',
    slug: '#',
  },
  {
    title: '5 Kesalahan Umum dalam Membuat Kontrak Kerja',
    excerpt: 'Hindari kesalahan-kesalahan ini agar kontrak kerja Anda sah secara hukum dan melindungi kedua belah pihak.',
    date: '10 Mar 2026',
    category: 'Tips',
    slug: '#',
  },
  {
    title: 'NDA untuk Startup: Kapan dan Bagaimana Menggunakannya',
    excerpt: 'Non-Disclosure Agreement penting untuk melindungi rahasia bisnis Anda. Pelajari cara membuat NDA yang efektif.',
    date: '8 Mar 2026',
    category: 'Panduan',
    slug: '#',
  },
  {
    title: 'Update UU Cipta Kerja: Dampaknya pada Kontrak Kerja',
    excerpt: 'Perppu Cipta Kerja membawa perubahan signifikan pada aturan ketenagakerjaan. Simak apa saja yang berubah.',
    date: '5 Mar 2026',
    category: 'Regulasi',
    slug: '#',
  },
  {
    title: 'Cara Membuat Kontrak Freelance yang Melindungi Kedua Pihak',
    excerpt: 'Kontrak freelance yang baik harus jelas mengatur scope, pembayaran, dan hak kekayaan intelektual.',
    date: '1 Mar 2026',
    category: 'Panduan',
    slug: '#',
  },
];

const categoryColors: Record<string, string> = {
  Panduan: 'bg-orange-50 text-orange-600',
  Edukasi: 'bg-emerald-50 text-emerald-600',
  Tips: 'bg-amber-50 text-amber-600',
  Regulasi: 'bg-rose-50 text-rose-600',
};

export default function BlogPage() {
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
            Blog
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Artikel & Panduan
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-500">
            Tips, panduan, dan update terbaru seputar kontrak kerja dan hukum ketenagakerjaan Indonesia.
          </p>
        </motion.div>
      </section>

      {/* Posts Grid */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={post.slug}
                className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-7 transition-all hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100/50"
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${categoryColors[post.category] || 'bg-slate-50 text-slate-500'}`}>
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <HugeiconsIcon icon={Calendar03Icon} size={12} />
                    {post.date}
                  </span>
                </div>
                <h2 className="mt-4 text-base font-semibold text-slate-900 transition-colors group-hover:text-orange-500">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                  {post.excerpt}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-orange-500 transition-colors group-hover:text-orange-600">
                  Baca selengkapnya
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
