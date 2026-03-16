import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left — Branding Panel */}
      <div className="hidden w-[45%] flex-col justify-between bg-slate-900 p-12 lg:flex">
        <Link href="/">
          <Logo size="sm" className="[&_span]:text-white [&_span_.text-indigo-600]:text-indigo-400" />
        </Link>
        <div>
          <h2 className="text-3xl font-bold leading-tight text-white">
            Buat kontrak kerja<br />
            <span className="text-indigo-400">legal & profesional</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Platform AI yang membantu Anda membuat kontrak kerja sesuai hukum Indonesia. Cepat, mudah, dan gratis.
          </p>
        </div>
        <p className="text-xs text-slate-600">
          &copy; {new Date().getFullYear()} BuatPerjanjian.com
        </p>
      </div>

      {/* Right — Form */}
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12">
        <div className="mb-8 lg:hidden">
          <Link href="/">
            <Logo size="md" />
          </Link>
          <p className="mt-2 text-center text-sm text-slate-400">
            Platform Kontrak Kerja Legal Indonesia
          </p>
        </div>
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
