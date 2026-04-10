---
title: Glossary
description: Definitions of terms, acronyms, and concepts used in PromptBasic IDE
category: Reference
version: 1.0.0
last_updated: 2026-04-10
audience: all
---

# Glossary

## A

**AI** - Artificial Intelligence. In PromptBasic IDE, refers to Anthropic's Claude language model used for interpreting natural language prompts.

**API** - Application Programming Interface. The set of protocols and tools that allow different software components to communicate.

**API Key** - A unique authentication token (format: `sk-ant-*`) required to access Anthropic's API. Must be kept secure and never committed to version control.

**Anthropic** - The AI company providing the Claude language model used for code generation. Visit: https://anthropic.com/

## B

**Backend** - The server-side application (Node.js/Express) that processes API requests and proxies them to Anthropic's Claude API.

**Browser** - The client application where the frontend runs. Supported: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+.

## C

**Canvas** - The visual design surface in the IDE where UI controls are placed using drag-and-drop.

**Claude** - Anthropic's large language model used for natural language interpretation and code generation.

**Control** - A UI component that can be placed on the canvas (Button, TextBox, Label, etc.).

## D

**Design Phase** - First phase of development where controls are dragged and positioned on the canvas.

**Drag-and-Drop** - User interface technique allowing controls to be selected and moved by clicking and dragging.

## E

**Event** - An action triggered by user interaction or system state change (e.g., button click).

**Event Handler** - Code that executes when an event occurs. In PromptBasic, written as natural language prompts.

**Environment Variable** - A configuration parameter (e.g., `ANTHROPIC_API_KEY`) stored outside the code for security.

## F

**Frontend** - The client-side React application that provides the visual IDE interface.

## G

**Generated Code** - JavaScript code created by Claude AI based on user prompts.

## H

**Handler** - See Event Handler.

**HTTP** - HyperText Transfer Protocol. The standard protocol for web communication.

## I

**IDE** - Integrated Development Environment. PromptBasic IDE provides visual design, code generation, and runtime execution.

**Integration** - The process of combining different software components (frontend, backend, AI service).

## J

**JavaScript** - Programming language executed by web browsers. Used for UI interactions in PromptBasic.

**JSON** - JavaScript Object Notation. A lightweight data format used for API communication.

## L

**LLM** - Large Language Model. The AI technology (Claude) used for natural language interpretation.

## M

**Machine-Readable** - Documentation or data structured so AI systems and computers can easily parse and understand it (JSON, YAML, OpenAPI).

## N

**Natural Language** - Human language (e.g., English) as opposed to programming code.

**Natural Language Programming** - Programming paradigm where developers describe behavior in natural language instead of code.

## O

**OpenAPI** - Specification standard for REST API documentation (file: `openapi.yaml`).

## P

**Prompt** - Natural language description of what an event handler should do.

**Prompt Engineering** - The practice of writing clear, specific prompts to get accurate AI responses.

## R

**React** - JavaScript library for building user interfaces with component-based architecture.

**REST** - Representational State Transfer. Architectural style for web APIs.

**Runtime** - The environment where code executes. In PromptBasic, the browser JavaScript runtime.

## S

**Security** - Practices ensuring API keys, user data, and generated code are protected.

**Server** - Backend Node.js/Express application running on port 3001.

**State** - Current values and conditions of UI controls at a given moment.

## T

**Token** - A unit of text processed by the AI model. Important for API cost calculation.

**Toolbox** - Panel in the IDE containing available UI controls for dragging onto the canvas.

**Type Safety** - Ensuring data types are correct and consistent (currently browser-native; TypeScript migration planned).

## U

**UI** - User Interface. The visual elements users interact with (buttons, text boxes, etc.).

## V

**Vite** - Fast build tool and development server used for frontend development.

**Visual Basic** - Classic programming language and IDE that inspired PromptBasic's interface design.

## W

**Web-Based** - Application that runs in a web browser rather than being installed natively.

## X

**XML** - Extensible Markup Language. Used in various configuration and data interchange formats (not heavily used in PromptBasic).

## Y

**YAML** - YAML Ain't Markup Language. Human-readable data format used for configuration and metadata (e.g., frontmatter in documentation).

## Z

**Zone** - A logical area in the application (not currently used, reserved for future multi-area support).

---

## Acronyms Table

| Acronym | Expansion | Context |
|---------|-----------|---------|
| AI | Artificial Intelligence | Claude language model |
| API | Application Programming Interface | Backend communication |
| CRUD | Create, Read, Update, Delete | Database operations (future) |
| CSS | Cascading Style Sheets | Styling controls |
| DOM | Document Object Model | Browser API for manipulating HTML |
| HTML | HyperText Markup Language | Web page structure |
| HTTP | HyperText Transfer Protocol | Web communication |
| IDE | Integrated Development Environment | PromptBasic |
| JSON | JavaScript Object Notation | Data format |
| JWT | JSON Web Token | Authentication (future) |
| LLM | Large Language Model | Claude-based AI |
| MIT | Massachusetts Institute of Technology | License type |
| npm | Node Package Manager | Dependency management |
| OS | Operating System | Windows, macOS, Linux |
| REST | Representational State Transfer | API style |
| UI | User Interface | Visual elements |
| VITE | Next Generation Frontend Tooling | Build tool |
| YAML | YAML Ain't Markup Language | Configuration format |

---

## Related Concepts

### Visual Programming
A programming paradigm where programs are created using graphical elements rather than text-based code.

### Code Generation
Automatic creation of executable code from high-level specifications or descriptions.

### Declarative vs Imperative
- **Imperative** (traditional): Specify HOW to do something with step-by-step instructions
- **Declarative** (PromptBasic): Specify WHAT you want to happen; the system figures out HOW

### Sandbox/Sandboxing
Executing code in an isolated environment to prevent malicious behavior.

### Hot Reload/Hot Reloading
Automatically refreshing the development server when code changes, without losing state.

### API Rate Limiting
Restricting number of API calls to prevent abuse or overuse (429 error when exceeded).

---

## See Also

For more detailed information:
- [Getting Started](getting-started.md) - Setup and installation
- [API Reference](api.md) - Endpoint documentation
- [Architecture](architecture.md) - System design details
- [FAQ](faq.md) - Common questions