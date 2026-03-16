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
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-24">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm"
      >
        <HugeiconsIcon icon={SparklesIcon} size={14} color="#4f46e5" />
        <span className="text-xs font-medium text-slate-600">
          AI-Powered Contract Platform
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl text-center text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
      >
        Buat Kontrak Kerja{' '}
        <span className="text-indigo-600">
          Legal & Profesional
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 max-w-lg text-center text-base leading-relaxed text-slate-400 sm:text-lg"
      >
        Platform AI yang membantu Anda membuat kontrak kerja sesuai hukum Indonesia. Cepat, mudah, dan gratis.
      </motion.p>

      {/* Chat Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 w-full max-w-xl"
      >
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-sm transition-all focus-within:border-indigo-300 focus-within:shadow-md">
            <HugeiconsIcon icon={AiChat02Icon} size={20} color="#cbd5e1" className="mr-3 shrink-0" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Mau buat kontrak apa hari ini?"
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none"
            />
            <button
              type="submit"
              className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition-all hover:bg-indigo-700"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </button>
          </div>
        </form>

        {/* Quick Action Chips */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-300">Coba langsung:</span>
          {CONTRACT_TYPES.map((type) => (
            <button
              key={type.label}
              onClick={() => handleChipClick(type.label)}
              className="rounded-full border border-slate-150 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-500 transition-all hover:border-indigo-200 hover:text-indigo-600"
            >
              {type.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 flex items-center gap-10 text-center sm:gap-14"
      >
        <div>
          <div className="text-2xl font-bold text-slate-900">500+</div>
          <div className="text-xs text-slate-400">Kontrak Dibuat</div>
        </div>
        <div className="h-8 w-px bg-slate-100" />
        <div>
          <div className="text-2xl font-bold text-slate-900">4</div>
          <div className="text-xs text-slate-400">Template Legal</div>
        </div>
        <div className="h-8 w-px bg-slate-100" />
        <div>
          <div className="text-2xl font-bold text-slate-900">5 min</div>
          <div className="text-xs text-slate-400">Rata-rata Proses</div>
        </div>
      </motion.div>
    </section>
  );
}
