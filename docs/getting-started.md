---
title: Getting Started
description: Installation, setup instructions, and first run guide for PromptBasic IDE
category: Setup
version: 1.0.0
last_updated: 2026-04-10
autor: Getting Started
audience: developer, beginner
prerequisites: [Node.js 16+, npm, Git, Anthropic API key]
tags: [installation, setup, prerequisites, environment-variables]
---

# Getting Started

This guide will help you set up PromptBasic IDE on your local machine and get started with development.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js** (version 16 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`
- **Git** (for cloning the repository)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

### Optional but Recommended

- **Visual Studio Code** or another code editor
- **GitHub account** (for contributing or accessing private repositories)

### Anthropic API Access

PromptBasic IDE requires an Anthropic API key to function:

1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign up for an account (if you don't have one)
3. Create a new API key
4. Note down your API key (starts with `sk-ant-`)

**Important**: Keep your API key secure and never commit it to version control.

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/tholewis/promptbasic-ide.git
cd promptbasic-ide
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required Node.js packages. The installation may take a few minutes.

### Step 3: Set Up Environment Variables

Create a `.env` file in the project root:

```bash
touch .env
```

Edit the `.env` file and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=sk-ant-your-actual-api-key-here
```

**Security Note**: The `.env` file is already included in `.gitignore` to prevent accidental commits.

### Step 4: Verify Setup

Check that everything is configured correctly:

```bash
npm run dev
```

You should see output similar to:
```
VITE v4.3.9  ready in 300 ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.1.100:3000/
➜  press h to show help
```

The application should now be running on `http://localhost:3000`.

## First Run

1. Open your browser and navigate to `http://localhost:3000`
2. You should see the PromptBasic IDE interface
3. Try dragging a button from the toolbox onto the form
4. Double-click the button to open the event handler
5. Write a simple prompt like "Show a message saying 'Hello World'"
6. Click the ▶ Run button to see your first AI-generated interaction

## Troubleshooting Setup Issues

### Common Issues

#### "Command not found: npm"
- Ensure Node.js is installed correctly
- Try reinstalling Node.js from the official website
- On macOS, you might need to use `nvm` for Node version management

#### "ANTHROPIC_API_KEY is required"
- Check that your `.env` file exists in the project root
- Verify the API key is correctly formatted (starts with `sk-ant-`)
- Ensure there are no extra spaces or characters

#### "Port 3000 is already in use"
- Another application is using port 3000
- Change the port in `vite.config.js` or stop the other application
- Alternative: Use `npm run dev -- --port 3001`

#### "Failed to connect to Anthropic API"
- Check your internet connection
- Verify your API key is valid and has credits
- Ensure Anthropic's API is not experiencing outages

### Environment-Specific Setup

#### Windows
- Use PowerShell or Command Prompt
- Ensure Node.js is added to your PATH
- You may need to restart your terminal after installation

#### macOS
- Use Terminal or iTerm
- Consider using Homebrew for package management: `brew install node`
- For permission issues, you might need `sudo` (not recommended for npm)

#### Linux
- Use your distribution's package manager
- Ensure you have the correct Node.js version
- Check firewall settings if connection issues occur

## Next Steps

Now that you have PromptBasic IDE running:

1. Follow the [Tutorial](tutorial.md) to build your first complete application
2. Explore the [Architecture](architecture.md) to understand how it works
3. Check out the [API Reference](api.md) for advanced usage
4. Join our community for support and feedback

## Development Mode vs Production

The `npm run dev` command starts the development server with hot reloading. For production deployment:

```bash
npm run build
npm run preview
```

See the main README.md for deployment instructions.

## Updating

To update to the latest version:

```bash
git pull origin main
npm install
```

Check the changelog for any breaking changes or new features.