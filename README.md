# PromptBasic IDE

A Visual Basic 3-style IDE where natural language prompts replace code in event handlers.

Powered by the Anthropic Claude API.

## Quick Start

```bash
npm install
export ANTHROPIC_API_KEY=sk-ant-your-key-here
npm run dev
```

Starts the IDE on http://localhost:3000 and the API proxy on http://localhost:3001.

## How It Works

1. **Design** — Drag controls from the toolbox onto the form
2. **Prompt** — Double-click a control, write what the event should do in plain English
3. **Run** — Click ▶ Run. The LLM interprets your prompts and manipulates controls live

## License

MIT
