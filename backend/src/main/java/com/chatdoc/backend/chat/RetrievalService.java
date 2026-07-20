package com.chatdoc.backend.chat;

import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.vectorstore.filter.FilterExpressionBuilder;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.chatdoc.backend.config.ChatDocProperties;

import java.util.List;

import org.springframework.ai.document.Document;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RetrievalService {

    private final VectorStore vectorStore;

    final ChatDocProperties properties ;
    public List<Document> retrieve(@NonNull String question, String sessionId) {
        if (sessionId == null || sessionId.isBlank()) {
            return List.of();
        }

        
        return vectorStore.similaritySearch(
                SearchRequest.builder()
                    .query(question)
                    .filterExpression(new FilterExpressionBuilder().eq("sessionId", sessionId).build())
                    .topK(properties.getRetrieval().getTopK())
                    .similarityThreshold(properties.getRetrieval().getSimilarityThreshold())
                    .build());
                    
    }
}
