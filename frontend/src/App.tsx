import UploadBox from "./components/upload/UploadBox";
import ChatWindow from "./components/chat/ChatWindow";
import ChatInput from "./components/chat/ChatInput";
import { useChat } from "./hooks/useChat";
import { FileText, Sparkles } from "lucide-react";

function App() {
    const { messages, loading, ask } = useChat();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
                <div className="mx-auto flex max-w-[1800px] items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                            <FileText size={20} aria-hidden="true" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight sm:text-xl">ChatDoc AI</h1>
                            <p className="text-xs text-slate-500 sm:text-sm">Your document, ready to discuss</p>
                        </div>
                    </div>
                    <div className="hidden items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 sm:flex">
                        <Sparkles size={14} aria-hidden="true" />
                        AI document assistant
                    </div>
                </div>
            </header>

            <main className="mx-auto flex min-h-[calc(100vh-65px)] max-w-[1800px] flex-col lg:h-[calc(100vh-65px)] lg:flex-row lg:p-4">
                <aside className="border-b border-slate-200 bg-white lg:h-full lg:w-[42%] lg:overflow-y-auto lg:rounded-l-2xl lg:border-b-0 lg:border-r lg:shadow-sm xl:w-[38%]">
                    <UploadBox />
                </aside>

                <section className="flex min-h-[58vh] flex-1 flex-col bg-slate-50 lg:min-h-0 lg:rounded-r-2xl lg:border lg:border-l-0 lg:border-slate-200 lg:shadow-sm">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
                        <ChatWindow
                            messages={messages}
                            loading={loading}
                        />
                    </div>

                    <div className="border-t border-slate-200 bg-white/90 p-3 backdrop-blur sm:p-4">
                        <ChatInput 
                            onSend={ask}
                            isLoading={loading}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
