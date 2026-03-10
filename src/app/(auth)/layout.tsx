export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">BuatPerjanjian</h1>
          <p className="text-sm text-muted-foreground">
            Platform Kontrak Kerja Legal
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
