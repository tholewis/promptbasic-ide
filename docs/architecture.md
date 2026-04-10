---
title: Architecture
description: Technical system design, component hierarchy, backend structure, AI integration, security, performance, and deployment architecture
category: Technical Reference
version: 1.0.0
last_updated: 2026-04-10
autor: Architecture
audience: developer, architect, contributor
tags: [architecture, frontend, backend, ai-integration, security, performance, deployment]
---

# Architecture

This document provides a detailed technical overview of PromptBasic IDE's architecture, design decisions, and implementation details.

## System Overview

PromptBasic IDE is a client-server web application that combines visual programming with AI-powered code generation. The system consists of three main components:

1. **Frontend Client**: React-based visual IDE
2. **Backend Server**: Node.js API proxy and orchestration layer
3. **AI Service**: Anthropic Claude API for natural language processing

## Frontend Architecture

### Technology Stack

- **Framework**: React 18 with hooks
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: Custom component library inspired by Visual Basic 6
- **State Management**: React useState and useContext for component state
- **Styling**: CSS modules with custom properties
- **Routing**: React Router (if needed for future multi-page support)

### Component Hierarchy

```
App
├── Toolbar
│   ├── RunButton
│   ├── SaveButton
│   └── Toolbox
├── Canvas
│   ├── Control (multiple instances)
│   │   ├── VisualRepresentation
│   │   ├── EventHandler
│   │   └── PropertiesPanel
│   └── SelectionHandles
└── StatusBar
```

### Key Components

#### Canvas Component
- **Purpose**: Main design surface for drag-and-drop UI creation
- **Features**:
  - Absolute positioning system
  - Snap-to-grid functionality
  - Multi-selection support
  - Zoom and pan capabilities
- **Implementation**: HTML5 Canvas API with React overlays

#### Control Components
- **Base Class**: Abstract Control class with common properties
- **Specialized Controls**:
  - Button: Click events, text content
  - TextBox: Text input, validation
  - Label: Display-only text
  - CheckBox: Boolean state
  - RadioButton: Grouped selection
  - ComboBox: Dropdown selection
  - ListBox: Multi-selection list
  - PictureBox: Image display
  - Timer: Time-based events

#### Event Handler System
- **Prompt Storage**: Plain text storage of natural language descriptions
- **AI Integration**: Asynchronous communication with backend
- **Code Generation**: Dynamic JavaScript execution
- **Error Handling**: Graceful degradation on AI failures

### State Management

The application uses a hierarchical state structure:

```javascript
{
  controls: [
    {
      id: "btn1",
      type: "Button",
      position: { x: 100, y: 50 },
      properties: {
        text: "Click Me",
        enabled: true
      },
      events: {
        onClick: "When clicked, show message 'Hello World'"
      }
    }
  ],
  selectedControl: "btn1",
  isRunning: false,
  generatedCode: ""
}
```

## Backend Architecture

### Technology Stack

- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **API Client**: Axios for HTTP requests
- **Environment**: dotenv for configuration
- **Logging**: Winston (future enhancement)
- **Security**: Helmet for security headers

### API Endpoints

#### POST /api/messages
- **Purpose**: Proxy requests to Anthropic Claude API
- **Input**: Natural language prompts and context
- **Output**: AI-generated JavaScript code
- **Security**: API key validation, rate limiting

#### GET /api/health
- **Purpose**: Health check endpoint
- **Output**: System status and version information

### Request Flow

1. **Client Request**: Frontend sends prompts to `/api/messages`
2. **Authentication**: Server validates Anthropic API key
3. **AI Processing**: Forward request to Claude API
4. **Response Processing**: Parse and validate AI response
5. **Code Generation**: Transform AI output into executable JavaScript
6. **Client Delivery**: Return generated code to frontend

## AI Integration

### Anthropic Claude Integration

- **Model**: Claude 3.5 Sonnet (recommended)
- **API Version**: Latest available
- **Prompt Engineering**:
  - System prompts for context
  - Few-shot examples for consistency
  - Error handling and retry logic

### Prompt Processing Pipeline

1. **Input Sanitization**: Clean and validate user prompts
2. **Context Building**: Include control states and relationships
3. **AI Request Formation**: Structure prompt with examples
4. **Response Parsing**: Extract JavaScript from AI response
5. **Code Validation**: Basic syntax checking
6. **Execution Preparation**: Wrap in try-catch blocks

### Example AI Interaction

**User Prompt**: "When button is clicked, show message 'Hello World'"

**System Context**: Button control at position (100, 50) with ID "btn1"

**AI Response Processing**:
```javascript
// Generated code
document.getElementById('btn1').addEventListener('click', function() {
  alert('Hello World');
});
```

## Security Considerations

### API Key Management
- **Storage**: Environment variables only
- **Transmission**: HTTPS required
- **Validation**: Server-side key verification
- **Logging**: Never log full API keys

### Code Execution Security
- **Sandboxing**: Client-side execution in browser context
- **Input Validation**: Sanitize all user inputs
- **Error Boundaries**: Prevent malicious code execution
- **Rate Limiting**: Prevent API abuse

### Data Protection
- **No Data Storage**: Stateless architecture
- **Client-Side Only**: No server-side data persistence
- **Privacy**: No user data collection

## Performance Optimization

### Frontend Optimizations
- **Code Splitting**: Lazy load control components
- **Memoization**: React.memo for expensive renders
- **Virtual Scrolling**: For large numbers of controls
- **Debounced Updates**: Prevent excessive re-renders

### Backend Optimizations
- **Connection Pooling**: Reuse HTTP connections
- **Caching**: Cache AI responses for identical prompts
- **Compression**: Gzip response compression
- **Async Processing**: Non-blocking I/O operations

### AI-Specific Optimizations
- **Prompt Caching**: Avoid duplicate API calls
- **Batch Processing**: Group related prompts
- **Model Selection**: Use appropriate model size for task
- **Token Optimization**: Minimize prompt length

## Deployment Architecture

### Development Environment
- **Local Setup**: npm run dev
- **Hot Reloading**: Vite dev server
- **Debug Tools**: React DevTools integration

### Production Deployment
- **Build Process**: npm run build
- **Static Assets**: Optimized bundles
- **Server Configuration**: Environment-specific settings
- **CDN Integration**: For global distribution

### Hosting Options
- **Static Hosting**: GitHub Pages, Netlify, Vercel
- **Server Hosting**: Heroku, Railway, DigitalOcean
- **Containerization**: Docker support (planned)

## Scalability Considerations

### Current Limitations
- **Single User**: No multi-user collaboration
- **Browser-Based**: Limited by browser capabilities
- **AI Dependency**: Requires external API availability

### Future Enhancements
- **Multi-User Support**: Real-time collaboration
- **Offline Mode**: Local AI model integration
- **Plugin System**: Extensible control library
- **Cloud Deployment**: Managed hosting options

## Monitoring and Observability

### Logging Strategy
- **Client Logs**: Browser console output
- **Server Logs**: Structured logging with Winston
- **Error Tracking**: Sentry integration (planned)
- **Performance Metrics**: Core Web Vitals monitoring

### Debugging Tools
- **React DevTools**: Component inspection
- **Network Tab**: API request monitoring
- **AI Response Inspector**: Debug AI-generated code
- **Prompt History**: Track prompt evolution

## Testing Strategy

### Unit Testing
- **Component Tests**: Jest + React Testing Library
- **Utility Functions**: Pure function testing
- **API Integration**: Mocked external services

### Integration Testing
- **End-to-End**: Playwright for UI workflows
- **API Testing**: Supertest for backend endpoints
- **AI Integration**: Mocked AI responses

### Performance Testing
- **Load Testing**: Simulate multiple users
- **AI Response Times**: Monitor API latency
- **Bundle Size**: Track JavaScript payload

## Development Workflow

### Version Control
- **Git Flow**: Feature branches and pull requests
- **Semantic Versioning**: Major.minor.patch releases
- **Changelog**: Automated release notes

### Code Quality
- **Linting**: ESLint configuration
- **Formatting**: Prettier integration
- **Type Checking**: TypeScript migration planned
- **Pre-commit Hooks**: Automated quality checks

This architecture provides a solid foundation for PromptBasic IDE while allowing for future enhancements and scaling.