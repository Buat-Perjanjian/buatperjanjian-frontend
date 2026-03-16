'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { Logo } from '@/components/ui/logo';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/">
          <Logo size="sm" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          <a href="#fitur" className="text-[13px] font-medium text-slate-400 transition-colors hover:text-slate-900">
            Fitur
          </a>
          <a href="#cara-kerja" className="text-[13px] font-medium text-slate-400 transition-colors hover:text-slate-900">
            Cara Kerja
          </a>
          <a href="#harga" className="text-[13px] font-medium text-slate-400 transition-colors hover:text-slate-900">
            Harga
          </a>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-slate-800"
          >
            Daftar Gratis
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <HugeiconsIcon
            icon={mobileOpen ? Cancel01Icon : Menu01Icon}
            size={24}
            color="#334155"
          />
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-slate-100 bg-white px-6 py-5 md:hidden"
        >
          <div className="flex flex-col gap-4">
            <a href="#fitur" className="text-sm text-slate-500" onClick={() => setMobileOpen(false)}>Fitur</a>
            <a href="#cara-kerja" className="text-sm text-slate-500" onClick={() => setMobileOpen(false)}>Cara Kerja</a>
            <a href="#harga" className="text-sm text-slate-500" onClick={() => setMobileOpen(false)}>Harga</a>
            <hr className="border-slate-100" />
            <Link href="/login" className="text-sm text-slate-500">Masuk</Link>
            <Link href="/register" className="rounded-lg bg-slate-900 px-4 py-2.5 text-center text-sm font-medium text-white">
              Daftar Gratis
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
