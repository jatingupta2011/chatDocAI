package com.chatdoc.backend.util;

import com.chatdoc.backend.model.DocumentChunk;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TextChunker {

    private static final int CHUNK_SIZE = 800;
    private static final int OVERLAP = 150;

    public List<DocumentChunk> chunk(String text, String fileName) {

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