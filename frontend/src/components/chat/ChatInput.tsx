import { useState } from "react";
import { ArrowUp } from "lucide-react";

interface Props {
    onSend(question: string): void;
    isLoading?: boolean;
    disabled?: boolean;
}

export default function ChatInput({ onSend, isLoading = false, disabled = false }: Props) {
    const [question, setQuestion] = useState("");

    const send = () => {
        if (!question.trim()) return;

        onSend(question);
        setQuestion("");
    };

    return (
        <div className="mx-auto flex max-w-4xl gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
            <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !isLoading && !disabled && send()}
                placeholder={disabled ? "Upload and index a PDF to start chatting" : "Ask something about your document..."}
                aria-label="Ask a question about your document"
                disabled={isLoading || disabled}
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400 disabled:cursor-not-allowed sm:text-base"
            />

            <button
                onClick={send}
                disabled={!question.trim() || isLoading || disabled}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
                <ArrowUp size={18} strokeWidth={2.5} aria-hidden="true" />
            </button>
        </div>
    );
}
