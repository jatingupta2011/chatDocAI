import { API } from "./api";

export interface ChatRequest {
    question: string;
}

export async function sendMessage(question: string): Promise<string> {
    const response = await fetch(`${API.baseUrl}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            question,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to get AI response");
    }
    const data = await response.json();
    return data.answer;
}