# Frontend Technology Decision

**Project:** ChatDoc AI  
**Version:** 1.0  
**Status:** Approved

---

# Purpose

This document explains the frontend technology choices for ChatDoc AI and why each technology has been selected.

The objective is to build a modern, maintainable, scalable, and production-quality frontend that provides an excellent user experience while remaining easy to understand and extend.

---

# Design Goals

The frontend should be:

- Modern
- Responsive
- Easy to maintain
- Easy to extend
- Type-safe
- Fast
- Cleanly architected
- Suitable for production
- Portfolio worthy

---

# Technology Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| shadcn/ui | Reusable UI Components |
| Lucide React | Icons |
| Axios | API Communication |
| React Markdown | Markdown Rendering |
| React Syntax Highlighter | Code Highlighting |

---

# Why Tailwind CSS?

## Traditional CSS

Normally, styling looks like:

```css
.chat-message {
    background: white;
    border-radius: 12px;
    padding: 16px;
    margin-top: 8px;
}
```

Then inside React:

```tsx
<div className="chat-message">
```

The styling is located in another file.

---

## Tailwind CSS

Using Tailwind:

```tsx
<div className="bg-white rounded-xl p-4 mt-2 shadow">
```

Everything is visible in the component itself.

The UI can be understood without opening another CSS file.

---

# Advantages of Tailwind

- Faster development
- No CSS naming conflicts
- No large CSS files
- Easier responsive design
- Consistent spacing
- Consistent typography
- Consistent colors
- Industry standard
- Excellent IDE autocomplete

---

# Is Tailwind Easy to Understand?

Yes.

Tailwind class names are descriptive.

Example:

```tsx
className="
flex
items-center
justify-between
rounded-xl
bg-white
p-4
shadow
"
```

Reading this is almost like reading English.

It literally says:

- display flex
- center items
- justify content
- rounded corners
- white background
- padding
- shadow

After a few days, most common classes become second nature.

---

# Common Tailwind Classes

| Class | Meaning |
|--------|---------|
| p-4 | Padding |
| m-4 | Margin |
| rounded-xl | Rounded corners |
| bg-white | White background |
| bg-gray-100 | Light gray background |
| text-gray-600 | Gray text |
| flex | Flexbox |
| items-center | Center vertically |
| justify-between | Space between |
| shadow | Box shadow |
| w-full | Full width |
| h-screen | Full viewport height |

---

# Why Not Plain CSS?

Plain CSS works perfectly.

However, as projects grow:

```
Component.tsx

↓

styles.css

↓

another.css

↓

media queries

↓

overrides
```

Finding styles becomes more difficult.

Tailwind keeps everything close to the component.

---

# Why shadcn/ui?

Tailwind provides styling.

shadcn/ui provides professionally built UI components.

Examples:

- Button
- Card
- Dialog
- Sheet
- Input
- Badge
- Alert
- Tooltip
- Dropdown
- Tabs
- Skeleton
- Spinner

Unlike traditional UI libraries, shadcn copies the component source code into the project.

Advantages:

- Fully customizable
- No vendor lock-in
- Easy to modify
- Production quality
- Excellent accessibility

---

# Why Not Material UI?

Material UI is an excellent library.

However, for ChatDoc AI it has some drawbacks.

- Opinionated Material Design appearance
- Larger bundle size
- Harder to create ChatGPT-like interfaces
- More difficult to customize

We want a custom AI assistant interface rather than a Material Design application.

---

# Planned UI

The application should resemble modern AI assistants.

```
---------------------------------------------------

                    ChatDoc AI

---------------------------------------------------

📄 Resume.pdf uploaded successfully

---------------------------------------------------

👤 User

What projects have you worked on?

---------------------------------------------------

🤖 Assistant

Based on the uploaded document...

• ODT Framework

• FOTA

• MQTT

(Page 2)

---------------------------------------------------

Type your question...

[ Send ]

---------------------------------------------------
```

---

# Planned Features

## Phase 1

- Upload PDF
- Chat interface
- Message bubbles
- Auto-scroll
- Loading indicator
- Disable Send while waiting
- Enter to send
- Error handling

---

## Phase 2

- Markdown rendering
- Code block highlighting
- Copy response
- Copy code blocks
- Source citations
- Timestamps

---

## Phase 3

- Dark mode
- Typing animation
- Conversation history
- Better mobile responsiveness
- Keyboard shortcuts

---

## Phase 4

- Multiple PDF support
- Document sidebar
- Delete document
- Streaming responses

---

# Recommended Folder Structure

```
src/
│
├── assets/
│
├── components/
│   ├── chat/
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatWindow.tsx
│   │   └── TypingIndicator.tsx
│   │
│   ├── upload/
│   │   ├── UploadBox.tsx
│   │   └── UploadStatus.tsx
│   │
│   └── common/
│       ├── Button.tsx
│       ├── Spinner.tsx
│       └── EmptyState.tsx
│
├── hooks/
│   └── useChat.ts
│
├── services/
│   └── api.ts
│
├── types/
│   └── chat.ts
│
├── App.tsx
│
├── main.tsx
│
└── index.css
```

---

# Benefits

- Clean architecture
- Easy to maintain
- Easy to scale
- Reusable components
- Better developer experience
- Professional UI
- Production-ready codebase

---

# Learning Curve

| Technology | Difficulty |
|------------|------------|
| React | ⭐⭐⭐☆☆ |
| TypeScript | ⭐⭐⭐☆☆ |
| Tailwind CSS | ⭐⭐☆☆☆ |
| shadcn/ui | ⭐☆☆☆☆ |
| Axios | ⭐☆☆☆☆ |
| React Markdown | ⭐☆☆☆☆ |

The learning curve is moderate and well worth the productivity gains.

---

# Final Decision

The frontend will use the following stack:

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React
- Axios
- React Markdown
- React Syntax Highlighter

This stack provides a modern developer experience, produces a clean and professional UI, and aligns with current React best practices. It also gives ChatDoc AI a scalable foundation for future features such as streaming responses, conversation history, multiple document support, and source citations.