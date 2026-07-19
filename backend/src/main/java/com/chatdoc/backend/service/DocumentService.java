package com.chatdoc.backend.service;

import com.chatdoc.backend.parser.PdfParser;
import com.chatdoc.backend.util.TextChunker;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final PdfParser pdfParser;
    private final TextChunker textChunker;
    private final DocumentIndexer documentIndexer;


    public String processDocument(MultipartFile file) {

        try {

            String text = pdfParser.extractText(file);
            
            List<String> chunks = textChunker.chunk(text);
            
            int indexed = documentIndexer.index(chunks);

            return indexed + " chunks indexed successfully.";

            // documentIndexer.index(chunks);
            // System.out.println("Chunks : " + chunks);
            // return "Successfully indexed " + chunks.size() + " chunks.";

        } catch (Exception e) {

            throw new RuntimeException("Failed to parse PDF", e);

        }

    }

}