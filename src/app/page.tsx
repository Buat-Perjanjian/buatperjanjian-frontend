import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">BuatPerjanjian.com</h1>
      <p className="text-muted-foreground text-lg mb-8 text-center max-w-md">
        Buat kontrak kerja yang sah secara hukum dalam hitungan menit
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Masuk
        </Link>
        <Link
          href="/register"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent"
        >
          Daftar
        </Link>
      </div>
    </main>
  );
}
