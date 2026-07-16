package com.chatdoc.backend.chat;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatClient chatClient;

    public ChatService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String chat(@NonNull String message) {
        return chatClient
                .prompt()
                .user(message)
                .call()
                .content();
    }
}