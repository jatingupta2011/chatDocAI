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
    private final EmbeddingModel embeddingModel;

    public int index(List<DocumentChunk> chunks) {

        for (DocumentChunk chunk : chunks) {

            float[] embedding = embeddingModel.embed(chunk.getText());

            System.out.println("Chunk:");
            System.out.println(chunk);

            System.out.println("\nVector length = " + embedding.length);

            for (int i = 0; i < 10; i++) {
                System.out.println(i + " -> " + embedding[i]);
            }

            System.out.println("--------------------------------");
        }

        List<Document> docs = chunks.stream()
        .map(chunk -> {

            Document document = new Document(chunk.getText());

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