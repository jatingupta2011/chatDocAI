package com.chatdoc.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentIndexer {

    private final VectorStore vectorStore;

    public int index(List<String> chunks) {

        List<Document> documents = chunks.stream()
                .map(chunk -> new Document(chunk))
                .toList();

        System.out.println("Documents: " + documents.size());

        vectorStore.add(documents);
        System.out.println(vectorStore.getClass().getName());
        System.out.println("===== INDEXING COMPLETE =====");
        System.out.println("Stored " + documents.size() + " documents.");

        List<Document> result = vectorStore.similaritySearch(
                SearchRequest.builder()
                        .query("the")
                        .topK(5)
                        .build());

        System.out.println("Retrieved = " + result.size());

        result.forEach(doc ->
                System.out.println(doc.getText()));
        return documents.size();
    }
}