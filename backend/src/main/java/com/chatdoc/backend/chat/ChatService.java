package com.chatdoc.backend.chat;

import java.util.List;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.document.Document;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatClient chatClient;
    private final RetrievalService retrievalService;
    private final PromptBuilder promptBuilder;

    @SuppressWarnings("null")
    public String chat(String question) {

        List<Document> documents = retrievalService.retrieve(question);

        System.out.println("Question: " + question);
        System.out.println("Documents: " + documents);

        String prompt = promptBuilder.buildPrompt(question, documents);

        System.out.println("Prompt: " + prompt);
        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }
}