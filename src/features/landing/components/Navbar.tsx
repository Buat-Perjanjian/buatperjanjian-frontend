'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Menu01Icon,
  Cancel01Icon,
  ArrowRight01Icon,
  AiBrain02Icon,
  FileEditIcon,
  AiSecurity01Icon,
  FlashIcon,
  Download04Icon,
  PencilEdit02Icon,
  ArrowDown01Icon,
} from '@hugeicons/core-free-icons';
import { Logo } from '@/components/ui/logo';

const productItems = [
  {
    icon: AiBrain02Icon,
    title: 'AI Chat Assistant',
    description: 'Buat kontrak lewat percakapan AI',
    href: '#fitur',
  },
  {
    icon: FileEditIcon,
    title: 'Template Kontrak',
    description: 'PKWT, PKWTT, Freelance, NDA',
    href: '/templates',
  },
  {
    icon: PencilEdit02Icon,
    title: 'Editor Dokumen',
    description: 'Edit langsung di browser',
    href: '#fitur',
  },
  {
    icon: AiSecurity01Icon,
    title: 'Sesuai Hukum',
    description: 'UU Ketenagakerjaan & Cipta Kerja',
    href: '#fitur',
  },
  {
    icon: FlashIcon,
    title: 'Wizard Interaktif',
    description: 'Panduan langkah demi langkah',
    href: '#fitur',
  },
  {
    icon: Download04Icon,
    title: 'Download PDF',
    description: 'Export profesional siap cetak',
    href: '#fitur',
  },
];

const navLinks = [
  { label: 'Harga', href: '/harga' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductOpen(false);
      }
    }
    if (productOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [productOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className={`mx-auto transition-all duration-500 ease-out ${
        scrolled
          ? 'mt-3 max-w-4xl px-2'
          : 'mt-0 max-w-6xl px-6'
      }`}>
        <div className={`flex items-center justify-between transition-all duration-500 ease-out ${
          scrolled
            ? 'h-14 rounded-2xl border border-white/60 bg-white/80 px-5 shadow-lg shadow-slate-200/40 backdrop-blur-xl'
            : 'h-16 px-0'
        }`}>
          <Link href="/" className="transition-transform hover:scale-105">
            <Logo size="sm" />
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {/* Produk dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProductOpen(!productOpen)}
                className={`inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                  productOpen
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                Produk
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  size={14}
                  className={`transition-transform duration-200 ${productOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {productOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-1/2 top-full mt-3 w-[480px] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-2xl shadow-slate-200/50 backdrop-blur-xl"
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {productItems.map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={() => setProductOpen(false)}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-blue-50/60"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 transition-colors group-hover:bg-blue-100">
                            <HugeiconsIcon icon={item.icon} size={17} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-slate-800">{item.title}</p>
                            <p className="text-[11px] text-slate-400">{item.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-slate-500 transition-all duration-200 hover:bg-slate-50 hover:text-slate-800"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-1.5 md:flex">
            <Link
              href="/login"
              className="rounded-full px-4 py-1.5 text-[13px] font-medium text-slate-500 transition-all duration-200 hover:text-slate-800"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="group inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2 text-[13px] font-medium text-white shadow-md shadow-blue-200/50 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200/60"
            >
              Mulai Gratis
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-50 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <HugeiconsIcon icon={mobileOpen ? Cancel01Icon : Menu01Icon} size={20} color="currentColor" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mx-3 mt-2 overflow-hidden rounded-2xl border border-slate-100 bg-white/95 px-5 shadow-2xl shadow-slate-200/50 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 py-4">
              <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-300">Produk</p>
              {productItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-blue-50/60"
                  onClick={() => setMobileOpen(false)}
                >
                  <HugeiconsIcon icon={item.icon} size={16} className="text-blue-600" />
                  <span className="text-sm text-slate-600">{item.title}</span>
                </a>
              ))}
              <hr className="my-2 border-slate-100" />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-2.5 text-sm text-slate-500 transition-colors hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-slate-100" />
              <Link href="/login" className="px-3 py-2.5 text-sm text-slate-500" onClick={() => setMobileOpen(false)}>
                Masuk
              </Link>
              <Link
                href="/register"
                className="mt-1 rounded-xl bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white shadow-md shadow-blue-200/50"
                onClick={() => setMobileOpen(false)}
              >
                Mulai Gratis
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
