import Link from 'next/link';

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          BuatPerjanjian
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#fitur" className="text-sm text-muted-foreground hover:text-foreground">
            Fitur
          </a>
          <a href="#harga" className="text-sm text-muted-foreground hover:text-foreground">
            Harga
          </a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Daftar
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Buat Kontrak Kerja Profesional dalam{' '}
          <span className="text-indigo-600">Hitungan Menit</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Platform berbasis AI untuk membuat kontrak kerja yang sah secara hukum Indonesia.
          Mudah, cepat, dan terjangkau.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/register"
            className="rounded-lg bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Mulai Sekarang
          </Link>
          <a
            href="#fitur"
            className="rounded-lg border border-gray-300 px-8 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
          >
            Pelajari Lebih
          </a>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: '📝',
    title: 'Wizard Mudah',
    description: 'Buat kontrak langkah demi langkah dengan panduan interaktif yang simpel.',
  },
  {
    icon: '🤖',
    title: 'AI Assistant',
    description: 'Bantu tulis dan analisis kontrak dengan kecerdasan buatan.',
  },
  {
    icon: '📄',
    title: 'Template Siap Pakai',
    description: 'PKWT, PKWTT, Freelance, NDA — tinggal pilih dan isi data.',
  },
  {
    icon: '🔒',
    title: 'Aman & Legal',
    description: 'Kontrak sesuai hukum ketenagakerjaan Indonesia yang berlaku.',
  },
];

function Features() {
  return (
    <section id="fitur" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Semua yang Anda Butuhkan
          </h2>
          <p className="mt-3 text-muted-foreground">
            Fitur lengkap untuk membuat kontrak kerja profesional
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { number: '1', title: 'Pilih Template', description: 'Pilih jenis kontrak yang sesuai kebutuhan Anda.' },
  { number: '2', title: 'Isi Data', description: 'Lengkapi data perusahaan dan karyawan melalui wizard.' },
  { number: '3', title: 'Download Kontrak', description: 'Kontrak siap diunduh dalam format profesional.' },
];

function HowItWorks() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Cara Kerja
          </h2>
          <p className="mt-3 text-muted-foreground">Tiga langkah mudah untuk kontrak profesional</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.number} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                {s.number}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="harga" className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Harga</h2>
          <p className="mt-3 text-muted-foreground">Pilih paket yang sesuai kebutuhan Anda</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Free */}
          <div className="rounded-xl border bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold">Free Trial</h3>
            <p className="mt-1 text-sm text-muted-foreground">Coba gratis untuk memulai</p>
            <p className="mt-6 text-4xl font-bold">
              Rp 0<span className="text-base font-normal text-muted-foreground">/bulan</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> 1 kontrak per bulan
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Template dasar
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> AI Assistant terbatas
              </li>
            </ul>
            <Link
              href="/register"
              className="mt-8 block rounded-lg border border-indigo-600 py-2.5 text-center text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
            >
              Mulai Gratis
            </Link>
          </div>
          {/* Pro */}
          <div className="relative rounded-xl border-2 border-indigo-600 bg-white p-8 shadow-sm">
            <span className="absolute -top-3 left-6 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-medium text-white">
              Populer
            </span>
            <h3 className="text-lg font-semibold">Pro</h3>
            <p className="mt-1 text-sm text-muted-foreground">Untuk profesional dan perusahaan</p>
            <p className="mt-6 text-4xl font-bold">
              Rp 99rb<span className="text-base font-normal text-muted-foreground">/bulan</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Kontrak unlimited
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Semua template
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> AI Assistant penuh
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Prioritas support
              </li>
            </ul>
            <Link
              href="/register"
              className="mt-8 block rounded-lg bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Langganan Pro
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BuatPerjanjian.com. Hak cipta dilindungi.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-foreground">Kebijakan Privasi</a>
            <a href="#" className="hover:text-foreground">Kontak</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  );
}
