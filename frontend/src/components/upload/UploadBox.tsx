import { useState } from "react";
import { uploadDocument } from "../../services/documentApi";
import PdfViewer from "./PdfViewer";
import { CheckCircle2, FileText, LoaderCircle, UploadCloud } from "lucide-react";

export default function UploadBox() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;

        try {
            setUploading(true);
            const response = await uploadDocument(file);
            setMessage(response);
        } catch {
            setMessage("❌ Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex h-full flex-col gap-5 p-4 sm:p-6">
            <div>
                <div className="flex items-center gap-2 text-blue-600">
                    <FileText size={18} aria-hidden="true" />
                    <span className="text-xs font-semibold uppercase tracking-[0.16em]">Document workspace</span>
                </div>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Your PDF</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">Upload a PDF to preview it here and ask AI about its contents.</p>
            </div>

            <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-5 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 sm:py-10">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm transition group-hover:-translate-y-0.5 group-hover:shadow-md">
                    <UploadCloud size={24} aria-hidden="true" />
                </div>
                <p className="font-semibold text-slate-700">Choose a PDF to upload</p>
                <p className="mt-1 text-xs text-slate-500">PDF files only</p>

                <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files?.length) {
                            setFile(e.target.files[0]);
                            setMessage("");
                        }
                    }}
                />
            </label>

            {file && (
                <div className="min-h-0 flex-1 animate-[fade-in_250ms_ease-out]">
                    <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                        <div className="flex min-w-0 items-center gap-2">
                            <FileText size={17} className="shrink-0 text-red-500" aria-hidden="true" />
                            <span className="truncate text-sm font-medium text-slate-700">{file.name}</span>
                        </div>
                        <span className="shrink-0 text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                    </div>
                    <PdfViewer file={file} />
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
            >
                {uploading ? <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> : <UploadCloud size={18} aria-hidden="true" />}
                {uploading ? "Indexing document…" : "Upload and index PDF"}
            </button>

            {message && (
                <div className={`flex items-start gap-2 rounded-xl border p-3 text-sm ${message.startsWith("❌") ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`} role="status">
                    {!message.startsWith("❌") && <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />}
                    <span>{message}</span>
                </div>
            )}
        </div>
    );
}
