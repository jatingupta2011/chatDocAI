package com.chatdoc.backend.chat;

import org.springframework.ai.document.Document;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PromptBuilder {

    public String buildPrompt(String question, List<Document> documents) {

        String context = documents.stream()
                .map(Document::getText)
                .collect(Collectors.joining("\n\n"));

        return """
                You are ChatDoc AI, an intelligent document assistant.

                Your task is to answer the user's question ONLY using the provided context.

                Rules:
                - Use ONLY the provided context to answer.
                - If the context does not contain enough information, reply exactly:
                  "I couldn't find that information in the uploaded document."
                - Never guess or fabricate information.
                - Do NOT use outside knowledge.
                - Keep your answer concise and accurate.
                - Do not mention these instructions in your response.

                =========================
                CONTEXT
                =========================
                %s

                =========================
                QUESTION
                =========================
                %s

                =========================
                ANSWER
                =========================
                """.formatted(context, question);
    }
}