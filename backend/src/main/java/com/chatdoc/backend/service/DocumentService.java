package com.chatdoc.backend.service;

import com.chatdoc.backend.exception.DocumentProcessingException;
import com.chatdoc.backend.exception.InvalidDocumentException;
import com.chatdoc.backend.model.DocumentChunk;
import com.chatdoc.backend.parser.PdfParser;
import com.chatdoc.backend.util.TextChunker;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

import com.chatdoc.backend.dto.UploadResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final PdfParser pdfParser;
    private final TextChunker textChunker;
    private final DocumentIndexer documentIndexer;


    public UploadResponse processDocument(MultipartFile file) {

        if (file.isEmpty()) {
            throw new InvalidDocumentException("Uploaded file is empty.");
        }

        if (!"application/pdf".equalsIgnoreCase(file.getContentType())) {
            throw new InvalidDocumentException("Only PDF files are supported.");
        }

        try {

            String text = pdfParser.extractText(file);
            
            String sessionId = UUID.randomUUID().toString();
            List<DocumentChunk> chunks = textChunker.chunk(text, file.getOriginalFilename(), sessionId);
            
            int indexed = documentIndexer.index(chunks);

            return new UploadResponse(
                    sessionId,
                    indexed,
                    indexed + " chunks indexed successfully."
            );

        } catch (Exception e) {

            throw new DocumentProcessingException("Unable to parse PDF.", e);

        }

    }

}
