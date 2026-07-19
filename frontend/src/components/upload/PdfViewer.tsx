import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import { FileWarning, LoaderCircle } from "lucide-react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

interface PdfViewerProps {
    file: File;
}

export default function PdfViewer({ file }: PdfViewerProps) {
    const [numPages, setNumPages] = useState(0);
    const [loadError, setLoadError] = useState(false);

    return (
        <div className="max-h-[52vh] overflow-auto rounded-2xl border border-slate-200 bg-slate-100 p-3 shadow-inner sm:p-4">
            <Document
                file={file}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                onLoadError={() => setLoadError(true)}
                loading={
                    <div className="flex min-h-64 items-center justify-center gap-2 text-sm text-slate-500">
                        <LoaderCircle size={18} className="animate-spin text-blue-600" aria-hidden="true" />
                        Loading PDF preview…
                    </div>
                }
                error={
                    <div className="flex min-h-64 flex-col items-center justify-center gap-2 text-center text-sm text-slate-600">
                        <FileWarning size={24} className="text-amber-500" aria-hidden="true" />
                        <p>We couldn’t display this PDF preview.</p>
                    </div>
                }
            >
                {!loadError && Array.from(new Array(numPages), (_, index) => (
                    <div key={index} className="mb-4 flex min-w-[500px] justify-center last:mb-0">
                        <Page pageNumber={index + 1} width={500} />
                    </div>
                ))}
            </Document>
        </div>
    );
}
