# ChatDoc AI - Architecture Decision Record (ADR)

Version: 1.0  
Status: Active  
Last Updated: July 2026

---

# Purpose

This document records all major architectural and technical decisions made during the development of ChatDoc AI.

The goal is to preserve the reasoning behind each decision so future development remains consistent and avoids revisiting solved problems.

---

# Project Goal

Build an AI-powered document assistant that allows users to:

- Upload PDF documents
- Ask natural language questions
- Retrieve relevant document context
- Generate accurate answers using Retrieval Augmented Generation (RAG)

Primary focus:

- Clean architecture
- Production-ready code
- Provider-independent AI layer
- Easy future migration to cloud providers

---

# ADR-001
## Framework

Decision

Use Spring Boot + Spring AI.

Reason

Spring AI provides provider-independent abstractions for:

- Chat Models
- Embedding Models
- Vector Stores

This prevents vendor lock-in.

Status

Accepted

---

# ADR-002
## Java Version

Decision

Java 21

Reason

- Latest LTS
- Better performance
- Modern language features
- Compatible with Spring Boot 3.5.x

Status

Accepted

---

# ADR-003
## Spring Boot Version

Decision

Spring Boot 3.5.4

Reason

Latest stable version with Spring AI support.

Status

Accepted

---

# ADR-004
## Spring AI Version

Decision

Spring AI 1.1.8

Reason

Originally started with:

1.0.1

Problems encountered

- Chroma initialization issues
- Auto configuration bugs
- Collection creation issues

Upgrading to Spring AI 1.1.8 resolved these issues.

Status

Accepted

---

# ADR-005
## Chat Model Provider

Decision

OpenRouter

Current Model

openai/gpt-oss-20b:free

Reason

- Free during development
- Multiple model support
- Easy provider switching
- No local GPU required

Future

Cloud models can be swapped without changing application code.

Status

Accepted

---

# ADR-006
## Embedding Model

Decision

Ollama

Current Model

nomic-embed-text

Reason

- Local
- Free
- Private
- Fast enough for development
- Good embedding quality

Decision rationale

Chat generation requires powerful cloud models.

Embedding generation does not.

Therefore:

Cloud Chat

+

Local Embeddings

provides the best cost/performance balance.

Status

Accepted

---

# ADR-007
## Vector Database

Decision

ChromaDB

Reason

- Open source
- Spring AI support
- Docker deployment
- Lightweight
- Perfect for RAG

Current Version

1.0.0

Status

Accepted

---

# ADR-008
## PDF Parsing

Decision

Apache PDFBox

Reason

Reliable Java PDF parser with strong community support.

Status

Accepted

---

# ADR-009
## Chunking Strategy

Current

Custom TextChunker

Future

Evaluate Spring AI TokenTextSplitter.

Reason

Custom implementation is sufficient for initial MVP.

Future improvements can replace the implementation without changing the service layer.

Status

Accepted

---

# ADR-010
## Embedding Generation

Decision

Never manually generate embeddings.

Instead

Use

VectorStore.add(documents)

Reason

Spring AI automatically performs:

Document

↓

Embedding Model

↓

Vector Store

↓

Persistence

Benefits

- Less code
- Cleaner architecture
- Provider independent
- Easier upgrades

Status

Accepted

---

# ADR-011
## Service Responsibilities

Decision

Single Responsibility Principle.

Current

DocumentService

Responsibilities

- Parse PDF
- Chunk text

Planned

DocumentIndexer

Responsibilities

- Convert chunks to Documents
- Store in VectorStore

Reason

Avoid large service classes.

Status

Accepted

---

# ADR-012
## Controller Design

Decision

Controllers remain thin.

Controllers should:

- Validate request
- Call service
- Return response

Business logic belongs inside services.

Status

Accepted

---

# ADR-013
## AI Provider Independence

Decision

Never use provider-specific APIs.

Always use Spring AI abstractions.

Reason

Allows migration from:

OpenRouter

↓

OpenAI

↓

Azure OpenAI

↓

Claude

↓

Gemini

without changing application logic.

Status

Accepted

---

# ADR-014
## Document Representation

Decision

Convert chunks into Spring AI Documents.

Instead of

List<String>

Prefer

List<Document>

Reason

Allows metadata support.

Future metadata

- filename
- upload id
- page number
- user id
- timestamps

Status

Accepted

---

# ADR-015
## Metadata Strategy

Decision

Every indexed document should eventually contain metadata.

Example

{
    "fileName": "...",
    "page": 4,
    "documentId": "...",
    "uploadedAt": "...",
    "userId": "..."
}

Reason

Enables

- Multi-document search
- Filtering
- Delete by document
- Source attribution

Status

Planned

---

# ADR-016
## RAG Flow

Approved Architecture

Upload

PDF

↓

PDF Parser

↓

Chunker

↓

Document

↓

VectorStore.add()

↓

Embeddings

↓

ChromaDB

Question

↓

Embed Question

↓

Similarity Search

↓

Top K Documents

↓

Prompt Builder

↓

OpenRouter

↓

Answer

Status

Accepted

---

# ADR-017
## Conversation Memory

Decision

Not included in MVP.

Reason

Complete RAG first.

Memory will be implemented afterwards.

Status

Deferred

---

# ADR-018
## Multi-document Support

Decision

Not included in MVP.

Reason

Requires metadata and filtering.

Implement after chat works correctly.

Status

Deferred

---

# ADR-019
## Streaming Responses

Decision

Deferred.

Reason

Functional correctness first.

Streaming is purely a UX enhancement.

Status

Deferred

---

# ADR-020
## Current Backend Flow

Current

DocumentController

↓

DocumentService

↓

PdfParser

↓

TextChunker

↓

(return chunks)

Next Step

DocumentController

↓

DocumentService

↓

PdfParser

↓

TextChunker

↓

DocumentIndexer

↓

VectorStore

↓

ChromaDB

Status

In Progress

---

# ADR-021
## Dependency Injection

Decision

Use constructor injection exclusively.

Implementation

@RequiredArgsConstructor

Reason

- Immutable dependencies
- Easier testing
- Spring best practice

Status

Accepted

---

# ADR-022
## Error Handling

Current

RuntimeException

Future

Introduce

- GlobalExceptionHandler
- Custom Exceptions
- ErrorResponse DTO

Status

Planned

---

# ADR-023
## Future Authentication

Decision

JWT

Reason

Support:

- Multiple users
- Private document collections
- User-specific search

Status

Planned

---

# ADR-024
## Development Philosophy

Principles

- Keep controllers thin.
- Services own business logic.
- Avoid framework-specific code.
- Use Spring AI abstractions.
- Build incrementally.
- Optimize after correctness.
- Prefer maintainability over cleverness.

Status

Guiding Principle

---

# Current Milestone

Completed

✓ Backend running

✓ OpenRouter configured

✓ Ollama configured

✓ ChromaDB configured

✓ PDF parsing

✓ Chunking

✓ Upload endpoint

Current Task

Implement document indexing.

Next Milestone

Similarity Search

↓

Prompt Builder

↓

Chat Endpoint

↓

Full RAG Pipeline