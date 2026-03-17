'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Rina Susanti',
    role: 'HR Manager, PT Teknologi Maju',
    text: 'Sebelumnya kami butuh 2-3 hari untuk buat kontrak kerja. Sekarang cukup 5 menit. Sangat membantu tim HR kami.',
    avatar: 'RS',
    bgColor: 'bg-blue-600',
  },
  {
    name: 'Budi Hartono',
    role: 'Founder, Startup Digital',
    text: 'Sebagai startup kecil, kami tidak punya budget untuk konsultan hukum. BuatPerjanjian jadi solusi yang tepat dan terjangkau.',
    avatar: 'BH',
    bgColor: 'bg-orange-500',
  },
  {
    name: 'Dewi Anggraini',
    role: 'CEO, Agensi Kreatif',
    text: 'Template NDA dan kontrak freelance-nya sangat lengkap. Klien kami jadi lebih percaya karena kontraknya profesional.',
    avatar: 'DA',
    bgColor: 'bg-blue-600',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Testimonials() {
  return (
    <section id="testimoni" className="relative py-32 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-4 py-1.5 text-xs font-semibold text-orange-500 ring-1 ring-orange-100">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
            Testimoni
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Dipercaya oleh{' '}
            <span className="text-blue-600">
              ratusan bisnis
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-slate-500">
            Lihat apa kata mereka yang sudah menggunakan BuatPerjanjian.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={item}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-100/50"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate-600">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${t.bgColor} text-xs font-bold text-white shadow-md`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
