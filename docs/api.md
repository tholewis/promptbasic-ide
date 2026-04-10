---
title: API Reference
description: Complete REST API documentation including endpoints, request/response formats, authentication, error codes, SDK examples, and best practices
category: Technical Reference
version: 1.0.0
last_updated: 2026-04-10
autor: API
audience: backend-developer, integration-specialist
base_url: http://localhost:3001/api
endpoints: ["/api/messages", "/api/health"]
tags: [api, rest, integration, sdk, authentication, error-handling]
---

# API Reference

This document provides detailed information about PromptBasic IDE's backend API endpoints, request/response formats, and integration guidelines.

## Base URL

```
http://localhost:3001/api
```

In production, replace `localhost:3001` with your deployed server URL.

## Authentication

All API requests require authentication via the Anthropic API key. The key must be provided as an environment variable on the server side.

## Endpoints

### POST /api/messages

Processes natural language prompts and generates executable JavaScript code using Anthropic's Claude AI.

#### Request

```http
POST /api/messages
Content-Type: application/json
```

**Request Body:**

```json
{
  "messages": [
    {
      "role": "user",
      "content": "When the button is clicked, show a message saying 'Hello World'"
    }
  ],
  "system": "You are a JavaScript code generator for a Visual Basic-style IDE. Generate clean, executable JavaScript code based on natural language descriptions of UI interactions.",
  "max_tokens": 1000,
  "temperature": 0.7
}
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| messages | Array | Yes | Array of message objects with role and content |
| system | String | No | System prompt to set AI behavior |
| max_tokens | Number | No | Maximum tokens in response (default: 1000) |
| temperature | Number | No | AI creativity level 0.0-1.0 (default: 0.7) |

#### Response

**Success Response (200):**

```json
{
  "id": "msg_1234567890",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "document.getElementById('button1').addEventListener('click', function() {\n  alert('Hello World');\n});"
    }
  ],
  "model": "claude-3-5-sonnet-20241022",
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "usage": {
    "input_tokens": 45,
    "output_tokens": 23
  }
}
```

**Error Response (400/500):**

```json
{
  "error": {
    "type": "invalid_request_error",
    "message": "ANTHROPIC_API_KEY is required"
  }
}
```

#### Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Missing or invalid API key |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server or AI service error |
| 502 | Bad Gateway - Anthropic API unavailable |

### GET /api/health

Health check endpoint to verify server status.

#### Request

```http
GET /api/health
```

#### Response

**Success Response (200):**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "uptime": 3600
}
```

**Parameters:**

| Field | Type | Description |
|-------|------|-------------|
| status | String | Server health status |
| timestamp | String | ISO 8601 timestamp |
| version | String | Application version |
| uptime | Number | Server uptime in seconds |

## SDK Integration

### JavaScript/Node.js

```javascript
const axios = require('axios');

async function generateCode(prompt) {
  try {
    const response = await axios.post('http://localhost:3001/api/messages', {
      messages: [{ role: 'user', content: prompt }],
      system: 'Generate JavaScript code for UI interactions',
      max_tokens: 500
    });

    return response.data.content[0].text;
  } catch (error) {
    console.error('API Error:', error.response.data);
    throw error;
  }
}
```

### Python

```python
import requests
import json

def generate_code(prompt):
    url = 'http://localhost:3001/api/messages'
    payload = {
        'messages': [{'role': 'user', 'content': prompt}],
        'system': 'Generate JavaScript code for UI interactions',
        'max_tokens': 500
    }

    response = requests.post(url, json=payload)

    if response.status_code == 200:
        return response.json()['content'][0]['text']
    else:
        raise Exception(f'API Error: {response.json()}')
```

### cURL

```bash
curl -X POST http://localhost:3001/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "When clicked, change button color to blue"
      }
    ],
    "max_tokens": 200
  }'
```

## Rate Limiting

- **Requests per minute**: 50 (configurable)
- **Requests per hour**: 1000 (configurable)
- **Burst limit**: 10 concurrent requests

Rate limits are enforced per IP address. Exceeding limits returns HTTP 429.

## Best Practices

### Prompt Engineering

1. **Be Specific**: Use clear, unambiguous language
   ```javascript
   // Good
   "When btnSubmit is clicked, validate that txtEmail contains a valid email address"

   // Bad
   "Check the email and do something if it's wrong"
   ```

2. **Include Context**: Reference control IDs and properties
   ```javascript
   // Good
   "Set the text of lblStatus to 'Processing...' when btnStart is clicked"

   // Bad
   "Show processing message"
   ```

3. **Break Down Complex Logic**: Use multiple simple prompts instead of one complex one
   ```javascript
   // Instead of one complex prompt, use multiple:
   "When form is submitted, first validate all fields"
   "If validation passes, show success message"
   "If validation fails, highlight invalid fields in red"
   ```

### Error Handling

Always implement proper error handling:

```javascript
try {
  const code = await generateCode(userPrompt);
  // Execute the generated code safely
  executeGeneratedCode(code);
} catch (error) {
  if (error.response?.status === 429) {
    // Handle rate limiting
    showRetryMessage();
  } else if (error.response?.status === 401) {
    // Handle authentication error
    promptForApiKey();
  } else {
    // Handle other errors
    showGenericError();
  }
}
```

### Security Considerations

1. **Validate Generated Code**: Always review AI-generated code before execution
2. **Sanitize Inputs**: Clean user prompts to prevent injection attacks
3. **Limit Code Execution**: Run generated code in sandboxed environments
4. **Monitor Usage**: Track API usage and costs

## Troubleshooting

### Common Issues

#### "ANTHROPIC_API_KEY is required"
- Ensure the environment variable is set on the server
- Check that the `.env` file exists and is properly formatted
- Restart the server after adding the API key

#### "Invalid API key"
- Verify the API key format (should start with `sk-ant-`)
- Check for typos or extra characters
- Ensure the key is active and has credits

#### "Rate limit exceeded"
- Implement exponential backoff retry logic
- Reduce request frequency
- Consider upgrading your Anthropic plan

#### "AI generated incorrect code"
- Refine your prompts to be more specific
- Provide more context about controls and their properties
- Test with simpler prompts first

### Debug Mode

Enable debug logging by setting the environment variable:

```bash
DEBUG=promptbasic:* npm run dev
```

This will log detailed information about API requests and responses.

## Version History

### v1.0.0
- Initial API release
- Basic message processing
- Health check endpoint
- Rate limiting implementation

### Future Versions
- Streaming responses
- Batch processing
- Custom model selection
- Advanced prompt templates

## Support

For API-related issues:
1. Check this documentation
2. Review the [Troubleshooting](troubleshooting.md) guide
3. Create an issue on GitHub with API logs
4. Contact support with request IDs