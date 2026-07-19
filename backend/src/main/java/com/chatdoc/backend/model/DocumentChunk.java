package com.chatdoc.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentChunk {

    private String text;

    private String fileName;

    private Integer pageNumber;

    private Integer chunkNumber;
}