export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar placeholder */}
      <aside className="hidden w-64 border-r bg-muted/30 p-4 md:block">
        <h2 className="text-lg font-semibold mb-4">BuatPerjanjian</h2>
        <nav className="space-y-2 text-sm">
          <a href="/dashboard" className="block rounded-md px-3 py-2 hover:bg-accent">Dashboard</a>
          <a href="/documents" className="block rounded-md px-3 py-2 hover:bg-accent">Dokumen</a>
          <a href="/settings" className="block rounded-md px-3 py-2 hover:bg-accent">Pengaturan</a>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
