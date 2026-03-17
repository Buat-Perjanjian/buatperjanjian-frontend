'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AiChat02Icon,
  ArrowRight01Icon,
  SparklesIcon,
} from '@hugeicons/core-free-icons';

const CONTRACT_TYPES = [
  { label: 'PKWT', desc: 'Kontrak Waktu Tertentu' },
  { label: 'PKWTT', desc: 'Kontrak Tetap' },
  { label: 'Freelance', desc: 'Kontrak Lepas' },
  { label: 'NDA', desc: 'Kerahasiaan' },
];

export default function ChatHero() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/register');
  };

  const handleChipClick = (type: string) => {
    router.push(`/register?type=${type}`);
  };

  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 pt-20 pb-24">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-pulse absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="animate-pulse absolute -top-20 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-200/30 blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-orange-100/30 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 h-[350px] w-[350px] rounded-full bg-blue-50/40 blur-3xl" />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative mb-8 flex items-center gap-2 rounded-full border border-blue-200/50 bg-white/60 px-4 py-2 shadow-lg shadow-blue-100/30 backdrop-blur-md"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
          <HugeiconsIcon icon={SparklesIcon} size={12} color="white" />
        </span>
        <span className="text-xs font-semibold text-blue-600">
          Platform Kontrak AI #1 di Indonesia
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative max-w-4xl text-center text-[2.75rem] font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
      >
        <span className="text-slate-900">Buat kontrak kerja </span>
        <span className="text-blue-600">
          dalam hitungan menit
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="relative mt-7 max-w-xl text-center text-lg leading-relaxed text-slate-500"
      >
        AI yang memahami hukum ketenagakerjaan Indonesia. Buat PKWT, PKWTT, Freelance, dan NDA yang legal — tanpa perlu konsultan hukum.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="relative mt-10 flex flex-col items-center gap-3 sm:flex-row"
      >
        <button
          onClick={() => router.push('/register')}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-300/30 transition-all hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-300/40"
        >
          <span className="relative flex items-center gap-2">
            Mulai Buat Kontrak
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </button>
        <a
          href="#cara-kerja"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 px-7 py-4 text-sm font-medium text-slate-600 backdrop-blur-sm transition-all hover:border-slate-300 hover:bg-white hover:shadow-lg"
        >
          Lihat Cara Kerja
        </a>
      </motion.div>

      {/* Chat Input Preview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="relative mt-14 w-full max-w-2xl"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center rounded-2xl border border-white/60 bg-white/70 px-5 py-4 shadow-xl shadow-slate-200/40 backdrop-blur-md transition-all focus-within:border-blue-300 focus-within:bg-white/90 focus-within:shadow-2xl focus-within:shadow-blue-100/40">
            <div className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600">
              <HugeiconsIcon icon={AiChat02Icon} size={16} color="white" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Mau buat kontrak apa hari ini?"
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-400">Coba langsung:</span>
          {CONTRACT_TYPES.map((type) => (
            <button
              key={type.label}
              onClick={() => handleChipClick(type.label)}
              className="rounded-full border border-slate-200/80 bg-white/60 px-4 py-1.5 text-xs font-medium text-slate-500 backdrop-blur-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
            >
              {type.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Trusted by */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative mt-20 flex flex-col items-center gap-6"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">Dipercaya oleh</p>
        <div className="flex items-center gap-10 rounded-2xl border border-white/60 bg-white/50 px-10 py-5 backdrop-blur-sm sm:gap-14">
          <div className="text-center">
            <div className="text-2xl font-extrabold text-blue-600">500+</div>
            <div className="text-[11px] text-slate-400">Kontrak Dibuat</div>
          </div>
          <div className="h-8 w-px bg-slate-200/50" />
          <div className="text-center">
            <div className="text-2xl font-extrabold text-orange-500">50+</div>
            <div className="text-[11px] text-slate-400">Perusahaan</div>
          </div>
          <div className="h-8 w-px bg-slate-200/50" />
          <div className="text-center">
            <div className="text-2xl font-extrabold text-blue-600">99%</div>
            <div className="text-[11px] text-slate-400">Kepuasan</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
