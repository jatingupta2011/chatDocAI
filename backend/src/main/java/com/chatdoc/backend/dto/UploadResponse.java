package com.chatdoc.backend.dto;

public record UploadResponse(
        String sessionId,
        int indexedChunks,
        String message
) {
}
