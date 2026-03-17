'use client';

import { motion } from 'framer-motion';

export default function KebijakanPrivasiPage() {
  return (
    <div className="pb-32">
      <section className="px-6 pt-24 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Kebijakan Privasi</h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-slate-500">Terakhir diperbarui: 1 Maret 2026</p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-3xl px-6">
        <div className="prose prose-slate prose-sm max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-slate-600 prose-li:text-slate-600">
          <h2>1. Informasi yang Kami Kumpulkan</h2>
          <p>Kami mengumpulkan informasi yang Anda berikan secara langsung saat menggunakan Platform, termasuk:</p>
          <ul>
            <li><strong>Data akun:</strong> nama lengkap, alamat email, dan kata sandi saat Anda mendaftar.</li>
            <li><strong>Data perusahaan:</strong> nama perusahaan, alamat, dan informasi terkait yang Anda masukkan untuk pembuatan kontrak.</li>
            <li><strong>Data dokumen:</strong> informasi yang Anda masukkan dalam proses pembuatan kontrak kerja.</li>
            <li><strong>Data penggunaan:</strong> informasi tentang bagaimana Anda menggunakan Platform, termasuk halaman yang dikunjungi dan fitur yang digunakan.</li>
          </ul>

          <h2>2. Penggunaan Informasi</h2>
          <p>Informasi yang kami kumpulkan digunakan untuk:</p>
          <ul>
            <li>Menyediakan dan memelihara layanan Platform.</li>
            <li>Menghasilkan dokumen kontrak sesuai permintaan Anda.</li>
            <li>Meningkatkan kualitas layanan dan pengalaman pengguna.</li>
            <li>Mengirimkan pemberitahuan terkait layanan dan pembaruan.</li>
            <li>Mencegah penipuan dan menjaga keamanan Platform.</li>
          </ul>

          <h2>3. Penyimpanan Data</h2>
          <p>Data Anda disimpan di server yang aman dengan enkripsi standar industri. Kami menyimpan data Anda selama akun Anda aktif atau selama diperlukan untuk menyediakan layanan. Anda dapat meminta penghapusan data kapan saja.</p>

          <h2>4. Berbagi Informasi</h2>
          <p>Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami hanya membagikan informasi dalam situasi berikut:</p>
          <ul>
            <li>Dengan persetujuan eksplisit dari Anda.</li>
            <li>Untuk memenuhi kewajiban hukum atau perintah pengadilan.</li>
            <li>Dengan penyedia layanan pihak ketiga yang membantu operasi Platform (misalnya hosting, AI processing), yang terikat perjanjian kerahasiaan.</li>
          </ul>

          <h2>5. Keamanan Data</h2>
          <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data Anda, termasuk:</p>
          <ul>
            <li>Enkripsi data saat transit (HTTPS/TLS) dan saat disimpan.</li>
            <li>Akses terbatas ke data pribadi hanya untuk personel yang berwenang.</li>
            <li>Pemantauan keamanan secara berkala.</li>
          </ul>

          <h2>6. Hak Anda</h2>
          <p>Anda memiliki hak untuk:</p>
          <ul>
            <li>Mengakses data pribadi yang kami simpan tentang Anda.</li>
            <li>Memperbarui atau memperbaiki data yang tidak akurat.</li>
            <li>Meminta penghapusan data pribadi Anda.</li>
            <li>Menarik persetujuan atas pemrosesan data.</li>
            <li>Mengunduh salinan data Anda.</li>
          </ul>

          <h2>7. Cookie</h2>
          <p>Platform kami menggunakan cookie untuk meningkatkan pengalaman pengguna. Cookie digunakan untuk menyimpan preferensi, sesi login, dan data analitik. Anda dapat mengatur browser untuk menolak cookie, namun beberapa fitur Platform mungkin tidak berfungsi dengan baik.</p>

          <h2>8. Perubahan Kebijakan</h2>
          <p>Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan signifikan akan diberitahukan melalui email atau pemberitahuan di Platform. Kami menyarankan Anda untuk meninjau kebijakan ini secara berkala.</p>

          <h2>9. Kontak</h2>
          <p>Untuk pertanyaan atau permintaan terkait privasi data Anda, silakan hubungi kami di <strong>deska@buatperjanjian.com</strong>.</p>
        </div>
      </section>
    </div>
  );
}
