'use client';

import { motion } from 'framer-motion';

export default function SyaratKetentuanPage() {
  return (
    <div className="pb-32">
      <section className="px-6 pt-24 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Syarat & Ketentuan</h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-slate-500">Terakhir diperbarui: 1 Maret 2026</p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-3xl px-6">
        <div className="prose prose-slate prose-sm max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-slate-600 prose-li:text-slate-600">
          <h2>1. Ketentuan Umum</h2>
          <p>Dengan mengakses dan menggunakan layanan BuatPerjanjian.com (&ldquo;Platform&rdquo;), Anda menyetujui untuk terikat dengan syarat dan ketentuan ini. Jika Anda tidak menyetujui syarat ini, mohon untuk tidak menggunakan Platform kami.</p>

          <h2>2. Deskripsi Layanan</h2>
          <p>BuatPerjanjian.com adalah platform berbasis AI yang membantu pengguna membuat dokumen kontrak kerja. Platform ini menyediakan template kontrak, AI assistant, dan editor dokumen untuk menghasilkan kontrak kerja yang sesuai dengan hukum ketenagakerjaan Indonesia.</p>

          <h2>3. Akun Pengguna</h2>
          <p>Untuk menggunakan layanan kami, Anda harus membuat akun dengan memberikan informasi yang akurat dan lengkap. Anda bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi Anda.</p>
          <ul>
            <li>Anda harus berusia minimal 18 tahun untuk membuat akun.</li>
            <li>Satu orang hanya boleh memiliki satu akun.</li>
            <li>Anda bertanggung jawab atas semua aktivitas yang terjadi di akun Anda.</li>
          </ul>

          <h2>4. Penggunaan Layanan</h2>
          <p>Anda setuju untuk menggunakan Platform hanya untuk tujuan yang sah dan sesuai dengan hukum yang berlaku. Anda tidak diperkenankan untuk:</p>
          <ul>
            <li>Menggunakan Platform untuk tujuan ilegal atau tidak sah.</li>
            <li>Menyalin, mendistribusikan, atau memodifikasi konten Platform tanpa izin.</li>
            <li>Mencoba mengakses sistem atau data yang tidak diperuntukkan bagi Anda.</li>
            <li>Mengganggu atau merusak operasi Platform.</li>
          </ul>

          <h2>5. Disclaimer Hukum</h2>
          <p>Dokumen yang dihasilkan oleh Platform ini bersifat informatif dan merupakan panduan umum. BuatPerjanjian.com bukan firma hukum dan tidak memberikan nasihat hukum. Kami menyarankan Anda untuk berkonsultasi dengan ahli hukum yang berkualifikasi untuk kebutuhan hukum spesifik Anda.</p>

          <h2>6. Hak Kekayaan Intelektual</h2>
          <p>Seluruh konten, desain, logo, dan teknologi yang terdapat di Platform merupakan milik BuatPerjanjian.com dan dilindungi oleh hukum hak kekayaan intelektual Indonesia. Dokumen yang Anda buat menggunakan Platform menjadi milik Anda sepenuhnya.</p>

          <h2>7. Pembatasan Tanggung Jawab</h2>
          <p>BuatPerjanjian.com tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan Platform. Kami tidak menjamin bahwa dokumen yang dihasilkan akan memenuhi semua persyaratan hukum untuk situasi spesifik Anda.</p>

          <h2>8. Perubahan Syarat</h2>
          <p>Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan berlaku segera setelah dipublikasikan di Platform. Penggunaan berkelanjutan atas Platform setelah perubahan dianggap sebagai persetujuan Anda terhadap syarat yang diperbarui.</p>

          <h2>9. Hukum yang Berlaku</h2>
          <p>Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Negara Republik Indonesia. Segala sengketa yang timbul akan diselesaikan melalui pengadilan yang berwenang di Indonesia.</p>

          <h2>10. Kontak</h2>
          <p>Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami di <strong>deska@buatperjanjian.com</strong>.</p>
        </div>
      </section>
    </div>
  );
}
