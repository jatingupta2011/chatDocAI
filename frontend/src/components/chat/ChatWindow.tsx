import type { Message } from "../../types/chat";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { MessageSquareText, Sparkles } from "lucide-react";

interface Props {
    messages: Message[];
    loading: boolean;
}



export default function ChatWindow({ messages, loading }: Props) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    if (messages.length === 0) {
        return (
            <div className="flex h-full min-h-[42vh] items-center justify-center">
                <div className="max-w-md text-center animate-[fade-in_400ms_ease-out]">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-sm">
                        <MessageSquareText size={30} aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Chat with your PDF</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">Upload a document, then ask for summaries, explanations, or specific answers.</p>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
                        <Sparkles size={14} className="text-blue-600" aria-hidden="true" />
                        Answers are grounded in your document
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6 pb-2">
            {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
            ))}

            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
        </div>
    );
    
}
