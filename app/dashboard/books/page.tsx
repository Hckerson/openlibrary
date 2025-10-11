import { mockPDFs } from "@/lib/placeholder_data";
import { PDFCard } from "@/components/ui/pdf-card";

export default function UploadedBooks() {
  return (
    <div className=" flex h-full flex-col overflow-y-auto pr-3 styled-scrollbar">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {mockPDFs.map((pdf) => (
          <PDFCard key={pdf.id} pdf={pdf} />
        ))}
      </div>
    </div>
  );
}
