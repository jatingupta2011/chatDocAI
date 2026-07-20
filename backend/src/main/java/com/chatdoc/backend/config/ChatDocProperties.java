package com.chatdoc.backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "chatdoc")
public class ChatDocProperties {

    private Retrieval retrieval = new Retrieval();
    private Chunking chunking = new Chunking();

    @Data
    public static class Retrieval {
        private int topK;
        private double similarityThreshold;
    }

    @Data
    public static class Chunking {
        private int chunkSize;
        private int overlap;
    }
}