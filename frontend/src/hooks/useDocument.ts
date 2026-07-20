import { useState } from "react";

export function useDocument() {
    const [sessionId, setSessionId] = useState<string | null>(null);

    return { sessionId, setSessionId };
}
