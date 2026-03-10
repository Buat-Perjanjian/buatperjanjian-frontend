export default function DocumentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detail Dokumen</h1>
      <p className="text-muted-foreground">Document detail placeholder for ID: {params.id}</p>
    </div>
  );
}
