import { API } from "./api";

export async function uploadDocument(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API.baseUrl}/documents/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.text();
}