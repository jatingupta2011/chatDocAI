package com.chatdoc.backend.chat;

import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.ai.document.Document;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RetrievalService {

    private final VectorStore vectorStore;

    public List<Document> retrieve(@NonNull String question) {

        return vectorStore.similaritySearch(
                SearchRequest.builder()
                        .query(question)
                        .topK(4)
                        .build());
    }
}