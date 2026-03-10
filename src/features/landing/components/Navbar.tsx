'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-slate-200/60 bg-[#f8fafc]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <span className="text-sm font-bold text-white">BP</span>
          </div>
          <span className="text-lg font-bold text-slate-900">
            BuatPerjanjian
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#fitur" className="text-sm text-slate-500 transition-colors hover:text-slate-900">
            Fitur
          </a>
          <a href="#cara-kerja" className="text-sm text-slate-500 transition-colors hover:text-slate-900">
            Cara Kerja
          </a>
          <a href="#harga" className="text-sm text-slate-500 transition-colors hover:text-slate-900">
            Harga
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-200"
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
          className="border-t border-slate-200/60 bg-[#f8fafc] px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-3">
            <a href="#fitur" className="text-sm text-slate-600" onClick={() => setMobileOpen(false)}>Fitur</a>
            <a href="#cara-kerja" className="text-sm text-slate-600" onClick={() => setMobileOpen(false)}>Cara Kerja</a>
            <a href="#harga" className="text-sm text-slate-600" onClick={() => setMobileOpen(false)}>Harga</a>
            <hr className="border-slate-200" />
            <Link href="/login" className="text-sm text-slate-600">Masuk</Link>
            <Link href="/register" className="rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white">
              Daftar Gratis
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
