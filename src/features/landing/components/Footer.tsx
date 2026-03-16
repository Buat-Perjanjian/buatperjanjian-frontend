import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <Link href="/">
              <Logo size="sm" />
            </Link>
            <p className="mt-3 text-xs text-slate-400">
              Platform AI untuk kontrak kerja legal Indonesia.
            </p>
          </div>
          <div className="flex gap-8 text-xs text-slate-400">
            <a href="#" className="transition-colors hover:text-slate-600">Syarat & Ketentuan</a>
            <a href="#" className="transition-colors hover:text-slate-600">Kebijakan Privasi</a>
            <a href="#" className="transition-colors hover:text-slate-600">Kontak</a>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} BuatPerjanjian.com. Hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
