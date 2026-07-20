import { type ChangeEvent, type DragEvent, useState } from "react";
import { uploadDocument } from "../../services/documentApi";
import PdfViewer from "./PdfViewer";
import { CheckCircle2, CircleAlert, FileText, LoaderCircle, UploadCloud } from "lucide-react";

export default function UploadBox() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const uploadFile = async (selectedFile: File) => {
        if (uploading) return;

        if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
            setMessage("❌ Please choose a PDF file.");
            return;
        }

        setFile(selectedFile);
        setMessage("");
        try {
            setUploading(true);
            const response = await uploadDocument(selectedFile);
            setMessage(response);
        } catch {
            setMessage("❌ Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) void uploadFile(selectedFile);
        event.target.value = "";
    };

    const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setDragActive(false);
        if (!uploading) {
            const selectedFile = event.dataTransfer.files[0];
            if (selectedFile) void uploadFile(selectedFile);
        }
    };

    return (
        <div className="flex min-h-full flex-col">
            <div className="sticky top-0 z-10 shrink-0 border-b border-slate-100 bg-white/95 p-4 backdrop-blur sm:p-6">
                <div>
                    <div className="flex items-center gap-2 text-blue-600">
                        <FileText size={18} aria-hidden="true" />
                        <span className="text-xs font-semibold uppercase tracking-[0.16em]">Document workspace</span>
                    </div>
                    <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Your PDF</h2>
                </div>

                <label
                    onDragEnter={(event) => {
                        event.preventDefault();
                        if (!uploading) setDragActive(true);
                    }}
                    onDragOver={(event) => event.preventDefault()}
                    onDragLeave={(event) => {
                        event.preventDefault();
                        setDragActive(false);
                    }}
                    onDrop={handleDrop}
                    aria-disabled={uploading}
                    className={`group mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-5 text-center transition sm:py-6 ${
                        uploading
                            ? "cursor-wait border-slate-200 bg-slate-50 text-slate-400"
                            : dragActive
                                ? "cursor-copy border-blue-500 bg-blue-50 ring-4 ring-blue-100"
                                : "cursor-pointer border-slate-200 bg-slate-50/70 hover:border-blue-400 hover:bg-blue-50 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100"
                    }`}
                >
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm transition group-hover:-translate-y-0.5 group-hover:shadow-md">
                        {uploading ? <LoaderCircle size={21} className="animate-spin" aria-hidden="true" /> : <UploadCloud size={21} aria-hidden="true" />}
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{uploading ? "Indexing your PDF…" : file ? "Drop a new PDF or click to replace" : "Drop a PDF here or click to browse"}</p>
                    <p className="mt-1 text-xs text-slate-500">PDF files only</p>

                    <input
                        type="file"
                        accept=".pdf,application/pdf"
                        disabled={uploading}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>

                {file && (
                    <div className={`mt-3 flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-sm ${message.startsWith("❌") ? "border-red-200 bg-red-50 text-red-700" : "border-slate-200 bg-white text-slate-700"}`} role="status">
                        <div className="flex min-w-0 items-center gap-2">
                            {message.startsWith("❌") ? <CircleAlert size={17} className="shrink-0" aria-hidden="true" /> : uploading ? <LoaderCircle size={17} className="shrink-0 animate-spin text-blue-600" aria-hidden="true" /> : <CheckCircle2 size={17} className="shrink-0 text-emerald-600" aria-hidden="true" />}
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-slate-700">{file.name}</p>
                                {(uploading || message) && <p className={`truncate text-xs ${message.startsWith("❌") ? "text-red-600" : "text-slate-500"}`}>{uploading ? "Uploading and indexing…" : message}</p>}
                            </div>
                        </div>
                        <span className="shrink-0 text-xs text-slate-400">{uploading ? "Indexing…" : (file.size / 1024 / 1024).toFixed(1) + " MB"}</span>
                    </div>
                )}

                {!file && message && (
                    <div className="mt-3 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="status">
                        <CircleAlert size={17} className="shrink-0" aria-hidden="true" />
                        <span>{message}</span>
                    </div>
                )}
            </div>

            {file && (
                <div className="min-h-0 flex-1 animate-[fade-in_250ms_ease-out] p-4 sm:p-6">
                    <PdfViewer file={file} />
                </div>
            )}
        </div>
    );
}
