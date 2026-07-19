# ChatDoc AI - Architecture

## Goal

ChatDoc AI is a Retrieval Augmented Generation (RAG) application built using Spring AI.

Current Architecture

React
        │
        ▼
Spring Boot REST API
        │
        ├───────────────┐
        ▼               ▼
 OpenRouter        Ollama
(Chat Model)   (Embedding Model)
        │               │
        └───────┬───────┘
                ▼
          Chroma Vector DB

---

## Current Tech Stack

Backend
- Java 21
- Spring Boot 3.5.4
- Spring AI 1.1.8

AI
- Chat Model
    - OpenRouter
    - Model: openai/gpt-oss-20b:free

Embedding Model
- Ollama
- nomic-embed-text

Vector Database
- ChromaDB 1.0.0

PDF Parsing
- Apache PDFBox 3.0.5

---

## Current Flow

Document Upload

Client
    │
    ▼
POST /api/documents/upload
    │
    ▼
DocumentController
    │
    ▼
DocumentService
    │
    ├── PdfParser
    │
    ├── TextChunker
    │
    └── (Next)
        DocumentIndexer
            │
            ▼
        VectorStore
            │
            ▼
        ChromaDB

---

## Completed

✓ Spring Boot backend

✓ OpenRouter integration

✓ Ollama integration

✓ Chroma integration

✓ PDF Parsing

✓ Text Chunking

✓ Upload endpoint

✓ Backend startup

---

## In Progress

Document indexing

chunks

↓

Spring AI Document

↓

VectorStore.add()

↓

Ollama Embeddings

↓

Chroma

---

## Pending

Similarity Search

Chat endpoint

Prompt Builder

Conversation Memory

Multiple PDF Support

Metadata filtering

Streaming responses

Authentication

---

## Current Package Structure

controller
    DocumentController

service
    DocumentService

parser
    PdfParser

util
    TextChunker

config

dto

model

---

## Planned Package Structure

controller

service
    DocumentService
    DocumentIndexer
    ChatService

parser
    PdfParser

config

dto

model

util

prompt

rag

---

## Design Principles

- Thin Controllers
- Single Responsibility Services
- Spring AI abstractions
- Provider independent
- Easy cloud migration
- No manual embedding generation