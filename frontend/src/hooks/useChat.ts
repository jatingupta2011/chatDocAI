import { useState } from "react";
import { sendMessage } from "../services/chatApi";
import type { Message } from "../types/chat";

export function useChat() {
    const [messages, setMessages] =useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    async function ask(question: string, sessionId: string | null) {
        if (!question.trim() || !sessionId) return;

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: "user",
            content: question,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const answer = await sendMessage(question, sessionId);

            const aiMessage: Message = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: answer,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
        } finally {
            setLoading(false);
        }
    }

    return {
        messages,
        loading,
        ask,
    };
}
