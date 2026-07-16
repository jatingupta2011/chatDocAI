package com.chatdoc.backend.service;

import com.chatdoc.backend.parser.PdfParser;
import com.chatdoc.backend.util.TextChunker;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final PdfParser pdfParser;
    private final TextChunker textChunker;

    public String processDocument(MultipartFile file) {

        try {

            String text = pdfParser.extractText(file);
            
            List<String> chunks = textChunker.chunk(text);
            System.out.println("Chunks: " + chunks);
            return chunks.toString();

        } catch (Exception e) {

            throw new RuntimeException("Failed to parse PDF", e);

        }

    }

}