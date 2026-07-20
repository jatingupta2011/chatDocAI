package com.chatdoc.backend.chat;

import com.chatdoc.backend.dto.ChatRequest;
import com.chatdoc.backend.dto.ChatResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {

        return new ChatResponse(chatService.chat(request.getQuestion(), request.getSessionId()));

    }

}
