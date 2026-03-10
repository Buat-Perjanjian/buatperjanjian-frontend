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
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 py-20">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-1.5"
      >
        <HugeiconsIcon icon={SparklesIcon} size={14} color="#4f46e5" />
        <span className="text-xs font-medium text-indigo-700">
          AI-Powered Contract Platform
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl text-center text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
      >
        Buat Kontrak Kerja{' '}
        <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Legal & Profesional
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-5 max-w-xl text-center text-base text-slate-500 sm:text-lg"
      >
        Platform AI yang membantu Anda membuat kontrak kerja sesuai hukum Indonesia. Cepat, mudah, dan gratis.
      </motion.p>

      {/* Chat Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 w-full max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg shadow-slate-200/50 transition-shadow focus-within:border-indigo-300 focus-within:shadow-xl focus-within:shadow-indigo-100/50">
            <HugeiconsIcon icon={AiChat02Icon} size={22} color="#94a3b8" className="mr-3 shrink-0" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Mau buat kontrak apa hari ini?"
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-base"
            />
            <button
              type="submit"
              className="ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
            </button>
          </div>
        </form>

        {/* Quick Action Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-400">Coba langsung:</span>
          {CONTRACT_TYPES.map((type) => (
            <button
              key={type.label}
              onClick={() => handleChipClick(type.label)}
              className="rounded-lg border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {type.label}
              <span className="ml-1 text-slate-400">{type.desc}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 flex items-center gap-8 text-center sm:gap-12"
      >
        <div>
          <div className="text-2xl font-bold text-slate-900">500+</div>
          <div className="text-xs text-slate-400">Kontrak Dibuat</div>
        </div>
        <div className="h-8 w-px bg-slate-200" />
        <div>
          <div className="text-2xl font-bold text-slate-900">4</div>
          <div className="text-xs text-slate-400">Template Legal</div>
        </div>
        <div className="h-8 w-px bg-slate-200" />
        <div>
          <div className="text-2xl font-bold text-slate-900">5 min</div>
          <div className="text-xs text-slate-400">Rata-rata Proses</div>
        </div>
      </motion.div>
    </section>
  );
}
