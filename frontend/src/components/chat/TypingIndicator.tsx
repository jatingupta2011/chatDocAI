import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex animate-[fade-in_250ms_ease-out] items-start gap-2.5 sm:gap-3">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm sm:h-9 sm:w-9">
        <Bot size={18} aria-hidden="true" />
      </div>
      <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5" aria-label="Assistant is thinking" role="status">
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]"></span>
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]"></span>
          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></span>
        </div>
      </div>
    </div>
  );
}
