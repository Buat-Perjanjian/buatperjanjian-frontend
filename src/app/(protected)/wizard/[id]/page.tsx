export default function WizardPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Wizard Kontrak</h1>
      <p className="text-muted-foreground">Contract wizard placeholder for document ID: {params.id}</p>
    </div>
  );
}
