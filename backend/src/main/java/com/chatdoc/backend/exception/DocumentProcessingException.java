package com.chatdoc.backend.exception;

public class DocumentProcessingException extends RuntimeException {

    public DocumentProcessingException(String message, Throwable cause) {
        super(message, cause);
    }

}