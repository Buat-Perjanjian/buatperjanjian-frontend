import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-[#f8fafc] py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600">
                <span className="text-xs font-bold text-white">BP</span>
              </div>
              <span className="text-sm font-bold text-slate-900">BuatPerjanjian</span>
            </Link>
            <p className="mt-2 text-xs text-slate-400">
              Platform AI untuk kontrak kerja legal Indonesia.
            </p>
          </div>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="transition-colors hover:text-slate-600">Syarat & Ketentuan</a>
            <a href="#" className="transition-colors hover:text-slate-600">Kebijakan Privasi</a>
            <a href="#" className="transition-colors hover:text-slate-600">Kontak</a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} BuatPerjanjian.com. Hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
