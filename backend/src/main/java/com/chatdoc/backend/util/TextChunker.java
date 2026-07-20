package com.chatdoc.backend.util;

import com.chatdoc.backend.config.ChatDocProperties;
import com.chatdoc.backend.model.DocumentChunk;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Component
public class TextChunker {
    private final ChatDocProperties properties ;

    
    public List<DocumentChunk> chunk(String text, String fileName, String sessionId) {
        final int CHUNK_SIZE = properties.getChunking().getChunkSize();
        final int OVERLAP = properties.getChunking().getOverlap();

        System.out.println("Chunking text with CHUNK_SIZE = " + CHUNK_SIZE + " and OVERLAP = " + OVERLAP);
        List<DocumentChunk> chunks = new ArrayList<>();

        int start = 0;
        int chunkNo = 1;

        while (start < text.length()) {

            int end = Math.min(start + CHUNK_SIZE, text.length());

            // Don't cut a word in half
            if (end < text.length()) {
                while (end > start && !Character.isWhitespace(text.charAt(end))) {
                    end--;
                }
            }

            // Fallback if no whitespace found
            if (end == start) {
                end = Math.min(start + CHUNK_SIZE, text.length());
            }

            chunks.add(
                    DocumentChunk.builder()
                            .sessionId(sessionId)
                            .text(text.substring(start, end).trim())
                            .fileName(fileName)
                            .pageNumber(1) // temporary
                            .chunkNumber(chunkNo++)
                            .build()
            );

            // Last chunk reached
            if (end >= text.length()) {
                break;
            }

            int nextStart = Math.max(0, end - OVERLAP);

            // Move start back to previous whitespace
            while (nextStart > 0 && !Character.isWhitespace(text.charAt(nextStart))) {
                nextStart--;
            }

            start = nextStart;
        }

        return chunks;
    }
}
