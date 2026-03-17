import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

const footerLinks = {
  Produk: [
    { label: 'AI Chat Assistant', href: '/#fitur' },
    { label: 'Template Kontrak', href: '/templates' },
    { label: 'Editor Dokumen', href: '/#fitur' },
    { label: 'Download PDF', href: '/#fitur' },
  ],
  Perusahaan: [
    { label: 'Tentang Kami', href: '/tentang' },
    { label: 'Blog', href: '/blog' },
    { label: 'Harga', href: '/harga' },
  ],
  Legal: [
    { label: 'Syarat & Ketentuan', href: '/syarat-ketentuan' },
    { label: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white pt-16 pb-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/">
              <Logo size="sm" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Platform AI untuk membuat kontrak kerja legal Indonesia. Cepat, mudah, dan sesuai hukum.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">{title}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-slate-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} BuatPerjanjian.com. Hak cipta dilindungi.
          </p>
          <p className="text-xs text-slate-300">
            Dibuat dengan AI di Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
