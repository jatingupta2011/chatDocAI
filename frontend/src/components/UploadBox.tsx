import { useState } from "react";
import { uploadDocument } from "../services/api";

export default function UploadBox() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        if (!file) return;

        try {
            const response = await uploadDocument(file);
            setMessage(response);
        } catch (err) {
            setMessage("Upload Failed");
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

            <h1 className="text-3xl font-bold mb-6">
                ChatDoc 🚀
            </h1>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                    if (e.target.files)
                        setFile(e.target.files[0]);
                }}
            />

            <button
                onClick={handleUpload}
                className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg"
            >
                Upload PDF
            </button>

            <p className="mt-5">{message}</p>

        </div>
    );
}