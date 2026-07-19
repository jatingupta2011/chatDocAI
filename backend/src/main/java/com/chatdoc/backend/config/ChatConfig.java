package com.chatdoc.backend.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;

@Configuration
public class ChatConfig {

    @Bean
    public ChatClient chatClient(
            @Qualifier("openAiChatModel") @NonNull ChatModel chatModel) {

        return ChatClient.builder(chatModel).build();
    }
}