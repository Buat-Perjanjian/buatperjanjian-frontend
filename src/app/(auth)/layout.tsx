import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
              <span className="text-sm font-bold text-white">BP</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              BuatPerjanjian
            </h1>
          </Link>
          <p className="mt-2 text-sm text-slate-500">
            Platform Kontrak Kerja Legal Indonesia
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
