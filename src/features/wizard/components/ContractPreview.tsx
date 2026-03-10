'use client';

interface ContractPreviewProps {
  html: string | null;
}

export function ContractPreview({ html }: ContractPreviewProps) {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
        Pratinjau Kontrak
      </h3>
      <div className="flex-1 rounded-lg border bg-white shadow-sm overflow-auto">
        <div className="mx-auto max-w-[210mm] min-h-[297mm] p-8 md:p-12">
          {html ? (
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <div className="flex h-full min-h-[400px] items-center justify-center text-muted-foreground">
              <p className="text-center text-sm">
                Pratinjau kontrak akan muncul di sini setelah Anda mengisi data dan menekan Generate.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
