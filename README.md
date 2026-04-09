# PromptBasic IDE

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, web-based IDE inspired by Visual Basic 3, where natural language prompts replace traditional code in event handlers. Build interactive user interfaces using drag-and-drop controls and describe their behavior in plain English.

Powered by the Anthropic Claude API for intelligent prompt interpretation.

📚 **[Full Documentation](docs/)** - Tutorials, API reference, troubleshooting, and more

## Features

- **Drag-and-Drop UI Design**: Visual form designer with toolbox controls
- **Natural Language Programming**: Write event handlers in plain English instead of code
- **Live Execution**: Real-time interpretation and execution of prompts via AI
- **Web-Based**: Runs entirely in the browser with a Node.js backend proxy
- **Modern Tech Stack**: Built with React, Vite, and Express

## Screenshots

### Main Interface
<img src="./PromptBasic Screenshot 01.png" width="600" alt="PromptBasic IDE Main Interface">

### Example Usage
<img src="./PromptBasic Screenshot 02.png" width="600" alt="PromptBasic IDE Example Usage">

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Anthropic API key (get one from [Anthropic](https://console.anthropic.com/))

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tholewis/promptbasic-ide.git
   cd promptbasic-ide
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Anthropic API key:
   ```bash
   export ANTHROPIC_API_KEY=your-actual-api-key-here
   ```

## Usage

Start the development server:
```bash
npm run dev
```

This will start:
- Frontend IDE at http://localhost:3000
- Backend API proxy at http://localhost:3001

Open http://localhost:3000 in your browser to start building!

## How It Works

PromptBasic IDE revolutionizes UI development by combining visual design with AI-powered programming:

1. **Design Phase**: Drag controls (buttons, textboxes, labels, etc.) from the toolbox onto the form canvas
2. **Prompt Phase**: Double-click any control to open its event handler. Instead of writing code, describe what should happen in natural language (e.g., "When clicked, show a message saying 'Hello World'")
3. **Run Phase**: Click the ▶ Run button. The system sends your prompts to Anthropic's Claude API, which interprets them and generates the appropriate JavaScript code to manipulate the controls in real-time

The AI understands context, handles state management, and can create complex interactions without traditional programming syntax.

## Architecture

- **Frontend**: React application built with Vite, featuring a Visual Basic-inspired interface
- **Backend**: Node.js Express server that proxies requests to the Anthropic API
- **AI Integration**: Secure API key handling with environment variables (never exposed in frontend)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This project uses Anthropic's Claude API. Make sure to comply with Anthropic's terms of service and usage policies. API costs may apply based on your usage.
