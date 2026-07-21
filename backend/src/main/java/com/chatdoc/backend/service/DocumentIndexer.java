package com.chatdoc.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import com.chatdoc.backend.model.DocumentChunk;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DocumentIndexer {

    private final VectorStore vectorStore;

    public int index(List<DocumentChunk> chunks) {

        List<Document> docs = chunks.stream()
        .map(chunk -> {

            Document document = new Document(chunk.getText());

            document.getMetadata().put("sessionId", chunk.getSessionId());
            document.getMetadata().put("fileName", chunk.getFileName());
            document.getMetadata().put("page", chunk.getPageNumber());
            document.getMetadata().put("chunk", chunk.getChunkNumber());

            return document;
        })
        .toList();
        

        vectorStore.add(docs);

        return docs.size();
    }
}