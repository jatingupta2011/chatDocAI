import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Message } from "../../types/chat";
import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";

interface Props {
    message: Message;
}

export default function MessageBubble({ message }: Props) {
    const isUser = message.role === "user";
    const [copied, setCopied] = useState(false);

    const copyMessage = async () => {
        await navigator.clipboard.writeText(message.content);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
    };

    return (
        <div className={`flex gap-2.5 animate-[fade-in_250ms_ease-out] sm:gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
            {!isUser && (
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm sm:h-9 sm:w-9">
                    <Bot size={18} aria-hidden="true" />
                </div>
            )}

            <div
                className={`group relative max-w-[calc(100%-3rem)] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[80%] sm:px-5 sm:py-4 sm:text-[15px] ${
                    isUser
                        ? "rounded-br-md bg-blue-600 text-white shadow-blue-500/15"
                        : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                }`}
            >
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>,
                    a: ({ children, ...props }) => <a {...props} className="underline underline-offset-2">{children}</a>,
                    code: ({ children }) => <code className="rounded bg-slate-900/10 px-1 py-0.5 text-[0.85em]">{children}</code>,
                }}>
                    {message.content}
                </ReactMarkdown>

                {!isUser && (
                    <button
                        onClick={copyMessage}
                        aria-label={copied ? "Copied" : "Copy response"}
                        className="absolute right-2 top-2 rounded-md p-1.5 text-slate-400 opacity-0 transition hover:bg-slate-100 hover:text-slate-700 focus:opacity-100 group-hover:opacity-100"
                    >
                        {copied ? <Check size={15} className="text-emerald-600" aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                    </button>
                )}
            </div>

            {isUser && (
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-white shadow-sm sm:h-9 sm:w-9">
                    <User size={18} aria-hidden="true" />
                </div>
            )}
        </div>
    );
}
